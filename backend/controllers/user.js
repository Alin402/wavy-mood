const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const axios = require("axios");
const { generateVerificationCode } = require("../utils/generateVerificationCode");
const VerificationCode = require("../models/verificationCode");
const sgMail = require('@sendgrid/mail');

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password, isArtist } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isArtist
        })

        if (!user) {
            res.status(400);
            throw new Error("Invalid user data");
        }

        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const googleRegisterUser = asyncHandler(async (req, res) => {
    const { code } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let decoded = await jwt.decode(code);

        res.status(200).json({
            cred: {
                email: decoded.email,
                name: decoded.name
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        const userPassword = user.password;
        
        const passwordsMatch = await bcryptjs.compare(password, userPassword);

        if (!passwordsMatch) {
            return res.status(400).json({ 
                errors: [
                    {
                        type: "field",
                        value: userPassword,
                        msg: "The provided password is not correct or is empty",
                        path: 'password',
                        location: 'body'
                    }
                ]
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            isArtist: user.isArtist
        }, process.env.JWT_SECRET);

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getMe = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" }); 
    }
})

const sendVerificationCode = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let code = await VerificationCode.findOne({ email });
        if (code) {
            return res.status(404).json({ errors: [ { msg: "A code was already sent" } ] });
        }

        code = generateVerificationCode();

        const verificationCode = new VerificationCode({ email, code });
        await verificationCode.save();

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: email,
            from: "balanescu.alin03@gmail.com",
            subject: "Wavy Mood Verification Code",
            html: `
                <h2>Wavy Mood verification code</h2>
                <p>Your verification code is:</p>
                <h2>${code}</h2>
            `
        };

        await sgMail.send(msg);

        return res.status(200).json({ msg: "sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" }); 
    }
})

const verifyVerificationCode = asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const verificationCode = await VerificationCode.findOne({ email });

        if (!verificationCode) {
            return res.status(404).json({ errors: [ { msg: "Code expired" } ] });
        }

        if (verificationCode.code !== code) {
            return res.status(404).json({ errors: [ { msg: "Code invalid. Try again" } ] });
        } 

        await VerificationCode.deleteOne({ _id: verificationCode._id });

        return res.status(200).json({ msg: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" }); 
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: [ { msg: "User not found" } ] });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ msg: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" }); 
    }
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    googleRegisterUser,
    sendVerificationCode,
    verifyVerificationCode,
    changePassword
}
