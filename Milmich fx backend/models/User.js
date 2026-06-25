const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
fullname: {
type: String
},
email: {
type: String,
unique: true
},

phone: {
type: String
},
password: {
type: String
},
googleId: {
type: String
},

emailVerified: {
type: Boolean,
default: false
},
otp: {
type: String
},

otpExpires: {
type: Date
}
},
{timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);