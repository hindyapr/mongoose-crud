const express = require('express');
const router = express.Router();
const memberController = require('../controllers/members');

router.get('/', memberController.read);
router.post('/', memberController.create);
router.put('/:id', memberController.update);
router.delete('/:id', memberController.delete);



module.exports = router;