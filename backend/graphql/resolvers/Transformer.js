const UserModel = require('../../models/user')
const BillModel = require('../../models/bills')
const dataLoader = require('dataloader')

const userLoader = new dataLoader((userIds) => {
    return UserModel.find({ _id: { $in: userIds } })
})
const billTransformer = async (bill) => {
    return {
        ...bill._doc,
        creator: userHandler(bill._doc.creator),
        invoiceDate: new Date(bill._doc.invoiceDate).toISOString(),
        dueDate: new Date(bill._doc.dueDate).toISOString()
    }
}

const userHandler = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString());
        return { ...user._doc }
    }
    catch (err) {
        throw err
    }
}


const billsHandler = async (billIds) => {
    try {
        const bills = await BillModel.find({ id: { $in: billIds } });
        bills.sort((a, b) => {
            return billIds.indexOf(a._id.toString()) - billIds.indexOf(b._id.toString())
        })
        return bills.map(bill => billTransformer(bill))
    }
    catch (err) {
        throw err
    }
}

exports.billTransformer = billTransformer
