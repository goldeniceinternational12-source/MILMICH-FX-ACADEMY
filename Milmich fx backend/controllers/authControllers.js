const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("../config/sendgrid");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
    try {
       const {
            fullname,
            email,
            phone,
            password
            } = req.body;
              const existingUser =
            await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                    });
                    }
                    const salt =
                    await bcrypt.genSalt(10);
                    const hashedPassword =
                    await bcrypt.hash(
                        password,
                        salt
                        );
const verificationToken =
jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
    );
    const user =
    await User.create({
        fullname,
        email,
        phone,
        password: hashedPassword,
        emailVerified: false
        });                        
        const verifyUrl =
        `${process.env.CLIENT_URL}/verify.html?token=${verificationToken}`;
        await sgMail.send({
            to: email,
            from: "noreply@yourdomain.com",
            subject:
            "Verify Your Account",
            html: `
            <h2>Welcome ${fullname}</h2>
            <p>
            Click below to verify
            your email.
            </p>
            <a href="${verifyUrl}">
            Verify Account
            </a>
            });
            res.status(201).json({
            message:
            "Registration successful. Check email."
            });
            } catch (error) {
             res.status(500).json({
             message: error.message
             });

             }
             };
             const verifyEmail =
             async (req, res) => {
                try {
                const { token } =
                req.query;
                const decoded =
                jwt.verify(
                token,
                process.env.JWT_SECRET
                );
                const user =
                await User.findOne({
                email:
                decoded.email
                });
                if (!user) {
                return res.status(404)
                .json({
                message:
                "User not found"
                });
                }
                user.emailVerified =
                true;
                await user.save();
                res.json({
                message:
                "Email verified"
                });
                } catch {
                 res.status(400).json({
                 message:
                 "Invalid token"
                 });
                 }
                 };
                 const login =
                 async (req, res) => {
                    try {
                    const {
                    email,
                    password
                    } = req.body;
                     const user =
                     await User.findOne({
                     email
                     });
                     if (!user) {
                     return res.status(404)
                     .json({
                     message:
                     "User not found"
                     });
                     }
                     const match =
                     await bcrypt.compare(
                     password,
                     user.password
                     );
                     if (!match) {
                     return res.status(401)
                     .json({
                     message:
                     "Invalid credentials"
                     });
                     }
                     if (
                     !user.emailVerified
                     ) {
                     return res.status(401)
                     .json({
                     message:
                     "Verify email first"
                     });
                     }
                     const token =
                     generateToken(
                     user._id
                     );

                     res.json({
                     token,
                     user: {
                     id: user._id,
                     fullname: 
                     user.fullname, 
                     email:
                      user.email
                      }
                      });

                      } catch (error) {

                      res.status(500).json({
                      message:
                       error.message
                       });
                       }
                       };

                       module.exports = {
                       register,
                       verifyEmail,
                       login
                       }
};                 
