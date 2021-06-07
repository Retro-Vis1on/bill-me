const UserModel = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config()
const { errorNames } = require('../../helpers/Error');
const BillModel = require('../../models/bills');

const userResolvers = {
    createUser: async (args) => {
        try {
            let isPresent = await UserModel.findOne({ email: args.email })
            if (isPresent)
                throw new Error(errorNames.userExists)
            const password = await bcrypt.hash(args.password, 12)
            const profilePic = `https://ui-avatars.com/api/?name=${args.username}&background=random`
            const newUser = new UserModel({
                email: args.email,
                password: password,
                username: args.username,
                profilePic
            })
            const savedUser = await newUser.save()
            const token = await jwt.sign({ userId: savedUser._id, email: args.email }, process.env.KEY, {
                expiresIn: '1h'
            })
            return {
                userId: savedUser._id,
                token: token,
                expirationTime: 1,
                username: args.username
            }

        }
        catch (err) {
            throw err
        }
    },
    login: async (args) => {
        try {
            const { email, password } = args;
            const user = await UserModel.findOne({ email: email })
            if (!user)
                throw new Error(errorNames.notFound)
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid)
                throw new Error(errorNames.invalidCred)
            const expirationTime = (new Date()).getTime() + 3600000;
            const token = await jwt.sign({ userId: user.id, expirationTime }, process.env.KEY, {
                expiresIn: '1h'
            })
            return {
                userId: user._id,
                token: token,
                expirationTime: 1,
                username: user._doc.username,
                profilePic: user._doc.profilePic
            }
        }
        catch (err) {
            throw err
        }
    },
    getProfile: async (args, req) => {
        try {
            if (!req.isAuth)
                throw new Error(errorNames.unAuth)
            const user = await UserModel.findById(req.userId)
            if (!user)
                throw new Error(errorNames.notFound)
            const bills = await BillModel.find({ creator: req.userId }, { state: 1 })
            const stateCount = { Pending: 0, Draft: 0, Paid: 0 }
            for (let bill of bills)
                stateCount[bill._doc.state]++
            return {
                userId: user._doc._id,
                username: user._doc.username,
                profilePic: user._doc.profilePic,
                email: user._doc.email,
                state: stateCount
            }
        }
        catch (err) {
            if (err.name === 'CastError')
                err.message = errorNames.notFound
            throw err
        }
    }


}
module.exports = userResolvers