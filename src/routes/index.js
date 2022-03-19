const express = require('express');
const router = express.Router();

const AuthenticationController = require('../controllers/authenticationController');
const UsersController = require('../controllers/UsersController');
const ModulesController = require('../controllers/ModulesController');
const ClassesController = require('../controllers/ClassesController');

const auth = require('../middlewares/authenticateToken');

router.post('/auth', AuthenticationController.checkToken);

router.post('/users', UsersController.createUser);
router.post('/users/authorization', UsersController.authenticateUser);

router.post('/modules', auth, ModulesController.createModule);
router.get('/modules', ModulesController.listAllModules);
router.put('/modules/:id', auth, ModulesController.updateModule);
router.delete('/modules/:id', auth, ModulesController.deleteModule);

router.post('/classes', auth, ClassesController.createClass);
router.get('/classes/:idModule', ClassesController.listClassesForModule);
router.put('/classes/:id', auth, ClassesController.updateClass);
router.delete('/classes/:id', auth, ClassesController.deleteClass);

module.exports = router;
