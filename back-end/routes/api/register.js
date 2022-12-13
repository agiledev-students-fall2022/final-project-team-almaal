const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../db/models/UsersModal');
const { JsonWebTokenError } = require('jsonwebtoken');

// @route   POST api/users
// @desc    register user
// @access  Public

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'please enter a  password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        console.log("HERE!")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        console.log(typeof(name), typeof(email), typeof(password));
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }
            // see if suer exists

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });
            // get users gravatar
            user = new User({
                name,
                email,
                picture: {
                    medium: "https:" + avatar
                },
            });
            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.investment = []
            user.login.username = email
            user.login.password = await bcrypt.hash(password, salt);

            console.log(user)
            await user.save();
            const payload = {
                user: {
                    id: user.id,
                },
            };
            
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            // res.send('user registered');
            // return jsonwebtoken;
            console.log(req.body);
        } catch (err) {
            console.error('-->', err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
