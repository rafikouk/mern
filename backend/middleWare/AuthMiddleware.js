const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");


const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw Error("Not authorized , please login")
        }
        // Verify token
        const Verified = jwt.verify(token, process.env.JWT_SECRET)
        //    Get User id from token
        const user = await User.findById(Verified.id).select("-password")

        if (!user) {
            res.status(401)
            throw Error("User not found")
        }
        req.user = user
        next()

    } catch (error) {
        res.status(401)
        throw Error("Not authorized , please login");
    }
});

module.exports = protect