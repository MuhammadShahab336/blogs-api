const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const login = async (req, res) => {
    const { email, password } = req.body

    // 1. Check required fields
    if (!email || !password) {
        return res.status(400).json({
            message: "email and password are required"
        });
    }

    const checkEmail = await User.findOne({ email }).select("+password")

    if (!checkEmail) {
        return res.status(400).json({
            message: "Invalid Email"
        });
    }



    const checkPassword = await bcrypt.compare(password, checkEmail?.password)

    if (!checkPassword) {
        return res.status(400).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign({ userId: checkEmail._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    const user = checkEmail.toObject();
    delete user.password;

    return res.status(200).json({
        success: true,
        message: "login successfully",
        data: { token, user }
    })

}

const profile = async (req, res) => {
    const user = await User.findById(req.user.userId)

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

module.exports = {
    login,
    profile
}