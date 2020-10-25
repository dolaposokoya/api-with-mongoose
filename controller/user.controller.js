"use strict";
const { encryptPassword, verifyPassword } = require('../utilities/universalFunctions');
const { generateToken } = require('../config/jwtAuthorization')
const userSchema = require("../model/user.model");
const nodemailer = require("nodemailer");
const random = require('crypto')
const statusMessages = require('../config/appConstants')


const findUser = async(req, res, next) => {
    try {
        const response = await userSchema.findOne({ email: req.body.email });
        if (response) {
            res.json(statusMessages.ERROR_MSG.EMAIL_EXIST)
        } else {
            next();
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const registerUser = async(req, res) => {
    try {
        const id = random.randomBytes(4).toString('hex')
        console.log('req.body', req.body)
        const user = new userSchema(req.body);
        const hash = await encryptPassword(user.password);
        if (hash) {
            user.password = hash
            user.email = user.email.toLowerCase()
            user.profile_id = id
            const response = await user.save();
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_REGISTER)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userSchema.findOne({ email: email })
        if (!response) {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        } else {
            if (response) {
                const { email, _id, username, profile_id, user_type } = response
                const hashedPassword = response.password
                const decrypt = await verifyPassword(password, hashedPassword)
                if (decrypt) {
                    const token = await generateToken(email, username, _id, user_type)
                    statusMessages.SUCCESS_MSG.SUCCESS.data = { token, profile_id }
                    res.json(statusMessages.SUCCESS_MSG.SUCCESS)
                } else {
                    res.json(statusMessages.ERROR_MSG.EMAIL_OR_PASSWORD)
                }
            } else {
                res.json(statusMessages.ERROR_MSG.EMAIL_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const getOneUser = async(req, res) => {
    try {
        const { id } = req.query
        const response = await userSchema.findById({ _id: id })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

// Previous get all user  getAllUser
const getAllUser = async(req, res) => {
    try {
        const { limit, page } = req.query
        const options = {
            page: page || 1,
            limit: limit || 5,
            sort: { createdAt: -1 }
        };
        // const response = await userSchema.find().limit(parseInt(limit || 2)).sort({ createdAt: -1 })
        const response = await userSchema.paginate({}, options)
        console.log('response', response)
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

// Previous filter user
const filterUser = async(req, res) => {
    try {
        const { search } = req.query
        if (search) {
            const query = {
                $or: [{ first_name: { $regex: new RegExp(`'${search}'`, 'gi', '+') } }, { gender: { $regex: new RegExp(`^'${search}'`, 'gi', '+-*/@.') } }, { blood_group: { $regex: new RegExp(`^${search}`, 'gi', '+-*/@.') } }, { city: { $regex: new RegExp(`^'${search}'`, 'gi', '@+-*/') } }]
            }
            filterusers(query)
        } else {
            const query = {}
            filterusers(query)
        }
        async function filterusers(filter) {
            const response = await userSchema.paginate(filter)
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}
const allGroup = async(req, res) => {
    try {
        const { bloodGroup } = req.body
        const response = await userSchema.find({ blood_group: bloodGroup })
        if (response) {
            statusMessages.SUCCESS_MSG.SUCCESS.data = response
            res.json(statusMessages.SUCCESS_MSG.SUCCESS)
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const updateUser = async(req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.query;
        const hash = await encryptPassword(password);
        if (hash) {
            const response = await userSchema.findByIdAndUpdate({ _id: id }, req.body, { returnOriginal: false })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const forgotPassword = async(req, res) => {
    try {
        const { email, password } = req.body;
        const newEmail = email.toLowerCase()
        const hash = await encryptPassword(password)
        if (hash) {
            const response = await userSchema.findOneAndUpdate({ email: newEmail }, { password: hash })
            if (response) {
                statusMessages.SUCCESS_MSG.SUCCESS.data = response
                res.json(statusMessages.SUCCESS_MSG.SUCCESS)
            } else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_UPDATE)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


const deleteUser = async(req, res, next) => {
    try {
        const { id } = req.query
        const response = await userSchema.findByIdAndDelete({ _id: id })
        if (response) {
            req.file = response.profile_image.fileName
            next();
        } else {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}


module.exports = {
    findUser,
    registerUser,
    loginUser,
    getOneUser,
    getAllUser,
    filterUser,
    allGroup,
    updateUser,
    forgotPassword,
    deleteUser
}