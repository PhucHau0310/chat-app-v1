const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const authControllers = {
    // [POST] /v1/auth/register

    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            const user = await newUser.save();

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                admin: user.admin,
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '365d' }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                admin: user.admin,
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: '365d' }
        );
    },

    // [POST] /v1/auth/login
    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json('Wrong username !!!');
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.status(404).json('Wrong password !!!');
            }

            if (user && validPassword) {
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefreshToken(user);

                refreshTokens.push(refreshToken);

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false, // when completed app to convert true
                    path: '/',
                    sameSite: 'None',
                });

                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // [POST] /v1/auth/refreshToken
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken)
            return res.status(401).json('You are not authenticated');

        if (!refreshTokens.includes(refreshToken))
            return res.status(403).json('Refresh token is not valid');

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    console.log(err);
                }

                refreshTokens = refreshTokens.filter(
                    (token) => token !== refreshToken
                );

                const newAccessToken =
                    authControllers.generateAccessToken(user);
                const newRefreshToken =
                    authControllers.generateRefreshToken(user);

                refreshTokens.push(newRefreshToken);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });

                res.status(200).json({ accessToken: newAccessToken });
            }
        );
    },

    // [POST] /v1/auth/logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken');
            refreshTokens = refreshTokens.filter(
                (token) => token !== req.cookies.refreshToken
            );
            res.status(200).json('Logged out successfully!');
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = authControllers;
