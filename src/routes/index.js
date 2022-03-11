const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const ModulesController = require('../controllers/ModulesController');


router.post('/users', UsersController.createUser);
router.post('/users/authorization', UsersController.authenticateUser);

router.post('/modules', ModulesController.createModule);
router.get('/modules', ModulesController.listAllModules);
router.put('/modules/:id', ModulesController.updateModule);
router.delete('/modules/:id', ModulesController.deleteModule);

module.exports = router;