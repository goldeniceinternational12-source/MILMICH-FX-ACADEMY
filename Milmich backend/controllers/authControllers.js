const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");

// Register User
const register = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    // Check required fields
    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill in all fields"
      });
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Check duplicate phone
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires in 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create user
    const user = await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpires,
      emailVerified: false
    });

    // TODO:
    // Send verification email
    // Send owner notification email
    // Send SMS OTP
    // Send WhatsApp OTP

    res.status(201).json({
      success: true,
      message: "Registration successful. Verify your account with the OTP sent to your email.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register
};