const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../db/models/UsersModal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const { JsonWebTokenError } = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  Public

router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            const id = user.id

            user = user.toObject()

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            // make sure the password is correct

            // 
            const isMatch = await bcrypt.compare(password, user.login.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const payload = {
                user: {
                    id,
                },
            };

            
            
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
