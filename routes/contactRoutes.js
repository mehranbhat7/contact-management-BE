const express = require('express');
const app = express();
const router = express.Router();
const {
  getcontacts,
  getcontactsbyId,
  postContact,
  updateContact,
  deleteContact,
} = require('../controller/contactControlls');
const authToken = require('../middleware/validateToken');

router.get('/all', authToken, getcontacts);
router.get('/all/:id', authToken, getcontactsbyId);
router.post('/post', authToken, postContact);
router.put('/post/:id', authToken, updateContact);
router.delete('/der/:id', authToken, deleteContact);
module.exports = router;
