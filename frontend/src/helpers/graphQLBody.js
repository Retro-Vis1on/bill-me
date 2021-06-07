const signUp = (data) => {
    const body = {
        query: `
                mutation{
                    createUser(email:"${data.email}",password:"${data.password}",username:"${data.username}"){
                        token
                        userId
                        expirationTime
                    }
                }
                `
    }
    return JSON.stringify(body)
}
const login = (data) => {
    const body = {
        query: `
                query{
                    login(email:"${data.email}",password:"${data.password}")
                    {
                        token
                        userId
                        expirationTime
                    }
                }
                `
    }
    return JSON.stringify(body)
}
const getProfilePic = () => {
    const body = {
        query: `
                query{
                    getProfile
                    {
                        profilePic
                    }
                }
                `
    }
    return JSON.stringify(body)
}
const getProfile = () => {
    const body = {
        query: `
                query{
                    getProfile
                    {
                        profilePic
                        username
                        email
                        state
                        {
                            Pending
                            Paid
                            Draft
                        }
                    }
                }
                `
    }
    return JSON.stringify(body)
}
const billList = (props) => {
    const body = {
        query: `
        query{
            getBillList(firstIndex:${props.firstIndex}){
                isLast
               bills {
                  _id
                    total
                    dueDate
                    recieverName
                    state
                }
            }
        }
        `}
    return JSON.stringify(body)
}
const indivisualBill = (id) => {
    const body = {
        query: `
                query
                {
                    singleBill(billId:"${id}")
                    {
                        _id
                        billFor
                        senderAddress{
                            street
                            city
                            postCode
                            country
                        }
                        recieverAddress{
                            street
                            city
                            postCode
                            country
                        }
                        email
                        recieverName
                        invoiceDate
                        terms
                        total
                        dueDate
                        items{
                            _id
                            name
                            price
                            qty
                        }
                        state
                    }
                }`
    }
    return JSON.stringify(body)
}
const deleteBill = (id) => {
    const body = {
        query: `
        mutation{
            deleteBill(billId:"${id}")
        }
        `}
    return JSON.stringify(body)
}
const payBill = (id) => {
    const body = {
        query: `
        mutation{
            markAsPaid(billId:"${id}")
        }
        `}
    return JSON.stringify(body)
}

const itemsListGen = (items) => {
    let itemList = "";
    for (let item of items) {
        const itemString = `
        {
            name:"${item.itemName}"
            price:${item.price}
            qty:${item.qty}
        }
        `
        itemList = itemList.concat(itemString)
    }
    return itemList
}

const createBill = (sender, reciever, project, items, isDraft) => {
    const itemsList = itemsListGen(items)
    const body = {
        query: `
        mutation{
            createBill(inputBill:{
                 billFor:"${project.desc.value}"
        senderAddress:{
            street:"${sender.street.value}"
            city:"${sender.city.value}"
            postCode:"${sender.postCode.value}"
            country:"${sender.country.value}"
        }
        recieverAddress:{
            street:"${reciever.street.value}"
            city:"${reciever.city.value}"
            postCode:"${reciever.postCode.value}"
            country:"${reciever.country.value}"
        }
        email:"${reciever.email.value}"
        recieverName:"${reciever.name.value}"
        invoiceDate:"${project.date.value}"
        terms:${+project.terms.value}
        items:[${itemsList}]
    state: "${isDraft ? "Draft" : "Pending"}"
})
    {
        _id
    }
        }`
    }
    return JSON.stringify(body)

}
const updateBill = (sender, reciever, project, items, id) => {
    const itemsList = itemsListGen(items)
    const body = {
        query: `
        mutation{
            updateBill(updateBill:{
                billId:"${id}"
                 billFor:"${project.desc.value}"
        senderAddress:{
            street:"${sender.street.value}"
            city:"${sender.city.value}"
            postCode:"${sender.postCode.value}"
            country:"${sender.country.value}"
        }
        recieverAddress:{
            street:"${reciever.street.value}"
            city:"${reciever.city.value}"
            postCode:"${reciever.postCode.value}"
            country:"${reciever.country.value}"
        }
        email:"${reciever.email.value}"
        recieverName:"${reciever.name.value}"
        terms:${+project.terms.value}
        items:[${itemsList}]
})
    {
        _id
    }
        }`
    }
    return JSON.stringify(body)

}

const _payBill = payBill
export { _payBill as payBill }
const _deleteBill = deleteBill
export { _deleteBill as deleteBill }
const _signUp = signUp
export { _signUp as signUp }
const _login = login
export { _login as login }
const _indivisualBill = indivisualBill
export { _indivisualBill as indivisualBill }
export const billsList = billList
const _createBill = createBill
export { _createBill as createBill }
const _updateBill = updateBill
export { _updateBill as updateBill }
const _getProfilePic = getProfilePic
export { _getProfilePic as getProfilePic }
const _getProfile = getProfile
export { _getProfile as getProfile }