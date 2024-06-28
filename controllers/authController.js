const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');
const {hashPassword, comparePassword} = require('../helpers/authHelper');


const registerController = async (req, res) => {
    try {
        const {name, email, phone, userName, password} = req.body;
        if(!name){
            return res.json({message: 'name is required'});
        }
        if(!email){
            return res.json({message: 'email is required'})
        }
        if(!phone){
            return res.json({
                message: 'phone no is required'
            })
        }
        if(!userName){
            return res.json({
                message: 'username is required'
            })
        }
        if(!password){
            return res.json({message: 'password is required'})
        }
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(400).json({message: 'User already exists | Please Login', success: false});
        }
        
        const hashedPassword = await hashPassword(password);

        const userModel = new UserModel({
            name, email, phone, userName, password: hashedPassword
        });
        await userModel.save();

        return res.status(201).json({
            message: 'User registered successfully',
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Internal Server Error',
            success: false,
            error
        })
    }
}

const loginController = async(req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await UserModel.findOne({userName});

        if(!user){
            return res.status(400).json({
                message: 'User not registered',
                success: false
            })
        }

        const checkPassword = await comparePassword(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                message: "Password doesn't match",
                success: false
            })
        }

        const token = jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        return res.status(201).json({
            message: 'Login Successfully',
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userName: user.userName,
                password: user.password
            },
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error in Login',
            success: false
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try {
       const {email, userName,  newPassword} = req.body;
       
       if(!email){
        res.status(400).json({message: 'email is required'})
       }
       if(!userName){
        res.status(400).json({message: 'username is required'})
       }
       if(!newPassword){
        res.status(400).json({message: 'New Password is required'})
       }

       const user = await UserModel.findOne({email, userName});

       if(!user){
        return res.status(404).json({
            success: false,
            message: 'Wrong Email or Username'
        })
       }

       const hashed = await hashPassword(newPassword);
       await UserModel.findByIdAndUpdate(user._id, {password: hashed});

       res.status(200).json({
        success: true,
        message: 'Password has been reset successfully'
       })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

module.exports = {
    registerController,
    loginController,
    forgotPasswordController
}