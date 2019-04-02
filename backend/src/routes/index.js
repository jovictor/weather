const express = require(`express`);
const router = express.Router();
const controller = require('../controllers/weatherController')


router.get('/weather/', controller.get);
router.get('/weather/list', controller.list);
router.post('/weather/save',controller.post);
router.delete('/weather/delete/:id',controller.delete);

module.exports = router;