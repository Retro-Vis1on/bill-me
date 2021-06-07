const { buildSchema } = require('graphql')
module.exports = buildSchema(`
    type Bill{
        _id:ID!
        billFor:String!
        senderAddress:Address!
        recieverAddress:Address!
        email:String!
        recieverName:String!
        invoiceDate:String!
        terms:Int!
        total:Float!
        dueDate:String
        items:[Item!]!
        state:String
        creator:User
    }
    type BillList
    {
        isLast:Boolean!
        bills:[Bill!]!
    }
    type Address{
        street:String!
        city:String!
        postCode:String!
        country:String!
    }
    input InputAddress{
        street:String!
        city:String!
        postCode:String!
        country:String!
    }
    input InputItem
    {
        name:String!
        price:Float!
        qty:Int!
    }
    type Item
    {
        _id:ID!
        name:String!
        price:Float!
        qty:Int!
    }
    type User{
        userId:ID
        email:String
        profilePic:String
        username:String
        state:StateCount
    }
    type StateCount
    {
        Pending:Int!
        Paid:Int!
        Draft:Int!
    }
    type AuthData
    {
        userId:ID!
        token:String!
        username:String!
        expirationTime:Int!
        profilePic:String!
    }
    input InputBill
    {
        billFor:String!
        senderAddress:InputAddress!
        recieverAddress:InputAddress!
        email:String!
        recieverName:String!
        invoiceDate:String!
        terms:Int!
        items:[InputItem!]!
        state:String
    }
    input InputUpdatedBill
    {
        billId:ID!
        billFor:String!
        senderAddress:InputAddress!
        recieverAddress:InputAddress!
        email:String!
        recieverName:String!
        terms:Int!
        items:[InputItem!]!
    }
    type RootMutation
    {
        createBill(inputBill:InputBill): Bill!
        updateBill(updateBill:InputUpdatedBill!): Bill!
        deleteBill(billId:ID!): Boolean
        markAsPaid(billId:ID!): Boolean
        createUser(email:String!,password:String!,username:String!): AuthData!
    }
    type RootQuery
    {
        getBillList(firstIndex:Int!):BillList!
        singleBill(billId:ID!):Bill!
        login(email:String!,password:String!):AuthData!
        getProfile:User!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
    `)