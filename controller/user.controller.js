"use strict";
const { SESSION_ID, ENV } = process.env
const { encryptPassword, verifyPassword } = require('../utilities/universalFunctions');
const { generateCookies } = require('../middleware/generateCookies');
const { generateToken } = require('../config/jwtAuthorization')
const userSchema = require("../model/user.model");
const random = require('crypto')
const statusMessages = require('../config/appConstants')


const findUser = async (req, res, next) => {
    try {
        const email = req.body.email.toLowerCase()
        const response = await userSchema.findOne({ email: email });
        if (response && response.email === email) {
            res.json(statusMessages.ERROR_MSG.EMAIL_EXIST)
        } else {
            next();
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const registerUser = async (req, res) => {
    try {
        const id = random.randomBytes(4).toString('hex')
        const user = new userSchema(req.body);
        user.first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
        user.last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)
        user.city = user.city.charAt(0).toUpperCase() + user.city.slice(1)
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

const loginUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        const email = req.body.email.toLowerCase();
        const response = await userSchema.findOne({ email: email.toLowerCase() })
        if (!response) {
            res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
        } else {
            if (response) {
                const userEmail = response.email.toLowerCase()
                if (email != userEmail) {
                    res.json(statusMessages.ERROR_MSG.EMAIL_NOT_FOUND)
                }
                else if (email === userEmail) {
                    const hashedPassword = response.password
                    const decrypt = await verifyPassword(password, hashedPassword)
                    if (decrypt) {
                        const { _id, username, first_name, last_name, profile_id, user_type, profile_image } = response
                        const token = await generateToken(userEmail, username, _id, user_type)
                        if (token) {
                            req.token = token
                            req._id = _id
                            req.profile_image = profile_image
                            req.first_name = first_name
                            req.last_name = last_name
                            next();
                        }
                        else {
                            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
                        }
                    } else {
                        res.json(statusMessages.ERROR_MSG.EMAIL_OR_PASSWORD)
                    }
                }
            } else {
                res.json(statusMessages.ERROR_MSG.DATA_NOT_FOUND)
            }
        }
    } catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const getOneUser = async (req, res) => {
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
// 1 is ascending  while -1 is descending
const getAllUser = async (req, res) => {
    try {
        console.log('Session', req.session)
        const response = await userSchema.find().sort({ createdAt: -1 })
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

// 1 is ascending  while -1 is descending
const sortAllUser = async (req, res) => {
    try {
        const { fieldName, orderBy } = req.query
        if (fieldName === 'first_name') {
            abc({ first_name: parseInt(orderBy) })
        }
        else if (fieldName === 'gender') {
            abc({ gender: parseInt(orderBy) })
        }
        else if (fieldName === 'blood_group') {
            abc({ blood_group: parseInt(orderBy) })
        }
        else if (fieldName === 'city') {
            abc({ city: parseInt(orderBy) })
        }
        async function abc(data) {
            const response = await userSchema.find().sort(data)
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

// Previous filter user
const filterUser = async (req, res) => {
    try {
        const { search } = req.query
        if (search) {
            const query = {
                $or: [{ first_name: { $regex: new RegExp(`${search}`, 'gi', '+') } }, { gender: { $regex: new RegExp(`^${search}`, 'gi', '+') } }, { blood_group: { $regex: new RegExp(`^${search}`, 'gi', '+') } }, { city: { $regex: new RegExp(`^${search}`, 'gi', '+') } }]
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

const allGroup = async (req, res) => {
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


const updateUser = async (req, res) => {
    try {
        const { password } = req.body;
        // const { id } = req.query;
        const { _id } = req.user
        const hash = await encryptPassword(password);
        if (hash) {
            const response = await userSchema.findByIdAndUpdate({ _id: _id }, req.body, { returnOriginal: false })
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


const forgotPassword = async (req, res) => {
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


const deleteUser = async (req, res, next) => {
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


const contactUser = async (req, res, next) => {
    try {
        const { donor_id } = req.query
        if (donor_id) {
            const { email, first_name } = await userSchema.findById({ _id: donor_id })
            if (email && first_name) {
                req.request = { email, first_name }
                next();
            }
            else {
                res.json(statusMessages.ERROR_MSG.UNABLE_TO_MAKE_REQUEST)
            }
        } else {
            res.json(statusMessages.ERROR_MSG.SOMETHING_WENT_WRONG)
        }
    }
    catch (error) {
        statusMessages.ERROR_MSG.IMP_ERROR.message = error.message
        res.status(500).json(statusMessages.ERROR_MSG.IMP_ERROR)
    }
}

const logOut = async (req, res) => {
    try {
        req.session.destory()
        res.json(statusMessages.SUCCESS_MSG.LOG_OUT)
    }
    catch (error) {
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
    sortAllUser,
    allGroup,
    updateUser,
    forgotPassword,
    deleteUser,
    contactUser,
    logOut
}