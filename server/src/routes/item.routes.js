const express = require('express');
const {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/item.controller');

const router = express.Router();

router.route('/').get(listItems).post(createItem);
router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;

