// url routes
// /api/urls

const {Router} = require("express");
const { check } = require("express-validator");
const { getUrls, createUrl, updateUrl, deleteUrl } = require("../controllers/urls");
// const { isDate } = require("../helpers/isDate");
const { validateFills } = require("../middlewares/validate-fills");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
//all petitions use the middleware validat jwt
// router.use(validateJWT);
//obtener urlos
router.get('/', getUrls);

// create new wvent
router.post('/',
[
    check('title', ' Title is required').not().isEmpty(),
    validateFills
],
createUrl);

//update Url
router.put('/:id',
[
    check('title', ' Title is required').not().isEmpty(),
    validateFills
], updateUrl );
//delete Url
router.delete('/:id', validateJWT,deleteUrl );

module.exports= router;