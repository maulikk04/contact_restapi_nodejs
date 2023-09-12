const express = require('express');
const control = require('../controller/control');
const router = express.Router();

const validatetoken = require('../middleware/validatetoken');

router.use(validatetoken)  //make all routes private

router.get('/' , control.getcontacts);
router.post('/' , control.createcontacts);
router.get('/:id' , control.getcontact);
router.put('/:id' , control.putcontacts);
router.delete('/:id' , control.deletecontact);

module.exports = router;