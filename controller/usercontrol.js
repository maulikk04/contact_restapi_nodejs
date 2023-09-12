const usermodel = require('../model/userschema');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const errorhandeler = (err) => {
    const errors = err.message;
    return errors
}
const maxAge = 3 * 24 * 60 * 60 //3 days
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("All fields are mandatory")
        }

        const user = await usermodel.findOne({email});
        if (!user) {
            throw new Error("User does not exist")
        }
        const checkpassword = await bcrypt.compare(password, user.password)
        if (!checkpassword) {
            throw new Error("Incorrect password")
        }
        const token = jwt.sign({
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            }, 'my-secret', {
                expiresIn: maxAge
            })

            res.status(200).json({token});
        

    } catch (err) {
        const error = errorhandeler(err);
        res.json(error);
    }
}

const registeruser = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new Error("All fields are mandatory");
        }

        const availableuser = await usermodel.findOne({ email });
        if (availableuser) {
            res.status(404);
            throw new Error("That user is already registered");
        }

        const user = await usermodel.create({ username, email, password });
        if (user) {
            res.status(200).json({ _id: user._id, email: user.email })
        }
        else {
            res.status(404);
            throw new Error("User not created");
        }

    } catch (err) {
        const error = errorhandeler(err);
        res.json({ error })
    }
}

const currentuser = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        const err = errorhandeler(error);
        res.json({err})
    }
    
}


module.exports = { loginuser, registeruser, currentuser}