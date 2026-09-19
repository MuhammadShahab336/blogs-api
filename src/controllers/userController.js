const User = require("../models/User")
const bcrypt = require("bcrypt")

const get = async (req, res, next) => {

    const users = await User.find()


    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users
    })

}

const show = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })

}

const add = async (req, res, next) => {

    const { name, email, password, role } = req.body

    // 1. Check required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);


    const user = await User.create({ name, email, password: hashedPassword, role })
    delete user['password']

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    })

}

const edit = async (req, res, next) => {

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user
    })

}

const remove = async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: user
    })

}

module.exports = {
    get,
    show,
    add,
    edit,
    remove
}