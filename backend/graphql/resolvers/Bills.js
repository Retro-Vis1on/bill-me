const BillModel = require('../../models/bills')
const UserModel = require('../../models/user')
const { billTransformer } = require('./Transformer')
const { errorNames } = require('../../helpers/Error')
const createPDF = require('../../helpers/CreatePDF')
const sendEmail = require('../../helpers/SendEmail')
const mongoose = require('mongoose')
const validStates = ['Paid', 'Draft', 'Pending']
const ObjId = mongoose.Types.ObjectId
const pageSize = 15
const billFieldsHandler = (bill) => {
    bill.total = bill.items.reduce((cur, item) => cur + (item.qty * item.price), 0);
    bill.invoiceDate = new Date(bill.invoiceDate);
    bill.dueDate = new Date((bill.invoiceDate).getTime() + (bill.terms * 24 * 3600000));
    if (bill.state && bill.state.length && !validStates.includes(bill.state))
        throw new Error(errorNames.badReq)
    return bill
}
const billResolvers = {
    createBill: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const data = billFieldsHandler(args.inputBill);
            data.creator = req.userId;
            if (data.state === "Pending") {
                const fileName = `${req.userId}_${(new Date((data.invoiceDate))).getTime()}`
                const email = data.email;
                const subject = `Invoice for ${data.billFor}`
                createPDF(data, fileName)
                await sendEmail(email, subject, fileName)

            }

            const bill = new BillModel(data);
            const savedBill = await bill.save();
            await UserModel.findByIdAndUpdate(req.userId, { $push: { bills: savedBill._doc._id } })
            return billTransformer(savedBill)
        }
        catch (err) {
            throw err
        }
    },
    updateBill: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const filter = { _id: args.updateBill.billId, creator: req.userId }
            const oldBill = await BillModel.findOne(filter)
            if (!oldBill)
                throw new Error(errorNames.notFound)
            args.updateBill.invoiceDate = oldBill._doc.invoiceDate
            const data = billFieldsHandler(args.updateBill)
            if (oldBill.state === "Pending") {
                const fileName = `${req.userId}_${(new Date((data.invoiceDate))).getTime()}`
                const email = data.email;
                const subject = `[UPDATE]Invoice for ${data.billFor}`
                createPDF(data, fileName)
                await sendEmail(email, subject, fileName)
            }
            const updatedBill = await BillModel.findOneAndUpdate(filter, data)
            if (!updatedBill)
                throw new Error(errorNames.notFound)
            return billTransformer(updatedBill)
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }
    },
    deleteBill: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const filter = { _id: args.billId, creator: req.userId }
            const deletedBill = await BillModel.findOneAndDelete(filter)
            await UserModel.findByIdAndUpdate(req.userId, { $pull: { bills: args.billId } })
            if (!deletedBill)
                throw new Error(errorNames.notFound)
            return true;
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }
    },
    markAsPaid: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const filter = { _id: args.billId, creator: req.userId }
            const updatedBill = await BillModel.findOneAndUpdate(filter, { state: "Paid" })
            if (!updatedBill)
                throw new Error(errorNames.notFound)
            return true
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }
    },
    singleBill: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const filter = { _id: args.billId, creator: req.userId }
            const bill = await BillModel.findOne(filter)
            if (!bill)
                throw new Error(errorNames.notFound)
            return billTransformer(bill)
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }

    },
    getBillList: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)

            const user = await UserModel.findById(req.userId)
            let lastIndex;
            if (user._doc.bills.length && (args.firstIndex >= user._doc.bills.length))
                throw new Error(errorNames.badReq)
            if (user._doc.bills.length <= args.firstIndex + pageSize - 1)
                lastIndex = user._doc.bills.length - 1
            else
                lastIndex = args.firstIndex + pageSize - 1
            const isLast = lastIndex === user._doc.bills.length - 1
            let billIndi = []
            for (let i = user._doc.bills.length - 1 - args.firstIndex; i >= user._doc.bills.length - 1 - lastIndex; i--)
                billIndi.push(ObjId(user._doc.bills[i]))
            const bills = await BillModel.find({ _id: { $in: billIndi } })
            const data = {
                bills: bills.map(bill => billTransformer(bill)),
                isLast,
                lastIndex
            }
            return data;
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }
    }
}
module.exports = billResolvers