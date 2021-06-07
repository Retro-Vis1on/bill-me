const errorNames = {
    unAuth: 'unAuth',
    notFound: 'notFound',
    userExists: 'userExists',
    invalidCred: 'invaildCred',
    badReq: 'badReq'
}
const errorTypes = {
    unAuth: {
        message: 'You are not authorized to make changes.',
        statusCode: 401
    },
    notFound: {
        message: 'Cannot find requested item.',
        statusCode: 404
    },
    userExists: {
        message: 'This user already exists.',
        statusCode: 409
    },
    invalidCred: {
        message: 'Invalid Credentails',
        statusCode: 403
    },
    badReq: {
        message: 'Bad Request',
        statusCode: 400
    }

}
exports.errorTypes = errorTypes
exports.errorNames = errorNames