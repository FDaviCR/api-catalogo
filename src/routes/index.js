const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const ModulesController = require('../controllers/ModulesController');
const ClassesController = require('../controllers/ClassesController');

const auth = require('../middlewares/authenticateToken');

router.post('/users', UsersController.createUser);
router.post('/users/authorization', UsersController.authenticateUser);

router.post('/modules', auth, ModulesController.createModule);
router.get('/modules', ModulesController.listAllModules);
router.put('/modules/:id', ModulesController.updateModule);
router.delete('/modules/:id', ModulesController.deleteModule);

router.post('/classes', ClassesController.createClass);
router.get('/classes/:idModule', ClassesController.listClassesForModule);
router.put('/classes/:id', ClassesController.updateClass);
router.delete('/classes/:id', ClassesController.deleteClass)

module.exports = router;