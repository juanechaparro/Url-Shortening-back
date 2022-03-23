// event routes
// /api/events

const {Router} = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFills } = require("../middlewares/validate-fills");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
//all petitions use the middleware validat jwt
router.use(validateJWT);
//obtener eventos
router.get('/', getEvents);

// create new wvent
router.post('/',
[
    check('title', ' Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFills
],
 createEvent);

//update event
router.put('/:id',
[
    check('title', ' Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFills
], updateEvent );
//delete event
router.delete('/:id', deleteEvent );

module.exports= router;