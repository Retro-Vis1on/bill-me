// const keyGen = require("../../../helpers/itemKeyGen").default
import keyGen from '../../../helpers/itemKeyGen'
const EditFormHandler = (data, senderDisptacher, recieverDispatcher, projectDispatcher, itemsStateUpdater) => {
    for (let field in data.senderAddress) {
        const val = data.senderAddress[field]
        senderDisptacher({ value: val, field: field, type: "update" })
    }
    for (let field in data.recieverAddress) {
        const val = data.recieverAddress[field]
        recieverDispatcher({ value: val, field: field, type: "update" })
    }
    recieverDispatcher({ value: data.email, field: "email", type: "update" })
    recieverDispatcher({ value: data.recieverName, field: "name", type: "update" })
    projectDispatcher({ value: data.billFor, field: "desc", type: "update" })
    projectDispatcher({ value: data.terms, field: "terms", type: "update" })
    projectDispatcher({ value: (new Date(data.invoiceDate)).toISOString().split('T')[0], field: "date", type: "update" })
    const itemsList = []
    for (let item of data.items) {
        let obj = {}
        for (let field in item) {
            if (field === "name")
                obj.itemName = item[field]
            else
                obj[field] = item[field]
        }
        obj.total = `$${obj.qty * obj.price}`
        obj.isValid = { itemName: true, price: true, qty: true }
        obj = { ...obj, key: keyGen() }
        itemsList.push(obj);
    }
    itemsStateUpdater(itemsList);
}
export default EditFormHandler