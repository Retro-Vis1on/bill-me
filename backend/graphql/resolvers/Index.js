const billResolver = require('./Bills')
const userResolver = require('./User')
const resolvers = {
    ...billResolver,
    ...userResolver
}
module.exports = resolvers