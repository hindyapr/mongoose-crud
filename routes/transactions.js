const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions');


router.get('/', transactionController.read);
router.post('/', transactionController.create);
router.patch('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router;