const mongoose = require('mongoose');
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const auth = require('./middleware/isAuth')
require('dotenv').config()
const schema = require('./graphql/schema/index')
const resolver = require('./graphql/resolvers/Index')
const port = process.env.PORT ? process.env.PORT : 8000
const { errorTypes } = require('./helpers/Error')
const cors = require('./middleware/corsPolicy')
const mongoSanitize = require('express-mongo-sanitize');
app.listen(port, () => {
    console.log(`Server up at ${port}`)
})
app.use(cors)
app.use(auth)
app.use(
    mongoSanitize({
        replaceWith: '_',
    }),
);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    customFormatErrorFn: (err) => {
        const error = errorTypes[err.message]
        if (error)
            return error
        return { message: err.message, statusCode: 500 }
    }
}))
const dbURL = process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/BillMe'
// const dbURL = 'mongodb://localhost:27017/BillMe'

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('We are connected to DB!');
    })
    .catch(err => {
        console.log('Connection Failed!')
        console.log(err);
    })