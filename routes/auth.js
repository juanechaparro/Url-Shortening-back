// rutas de usuarios / AUth
// host +/api/auth

const express = require('express');
const router = express.Router();
const{check}= require('express-validator');
const{createUser, loginUser, revalidateToken} = require('../controllers/auth');
const { validateFills } = require('../middlewares/validate-fills');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/new',
    [ //[] midelwares collection
        check('name', 'Name required').not().isEmpty(),
        check('email', 'Email required').isEmail(),
        check('password', 'Required password, more than 6 characters').isLength({min: 6}),
        validateFills
    ],
     createUser);
router.post(
    '/',
    [ //[] midelwares collection
        check('email', 'Email required').isEmail(),
        check('password', 'Required password, more than 6 characters').isLength({min: 6}),
        validateFills
    ],
     loginUser);

router.get('/renew',validateJWT, revalidateToken);

 module.exports = router;