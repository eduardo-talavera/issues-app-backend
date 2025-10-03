"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const IssuesController_1 = require("../controllers/IssuesController");
const Issue_1 = require("../middleware/Issue");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateAccessToken);
router.post('/', (0, express_validator_1.body)('title')
    .notEmpty()
    .withMessage('El campo title es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El campo title debe tener entre 3 y 100 caracteres'), (0, express_validator_1.body)('description')
    .notEmpty()
    .withMessage('El campo description es obligatorio'), validation_1.handleInputErrors, IssuesController_1.IssuesController.createIssue);
router.param('issueId', Issue_1.IssueExists);
router.get('/:issueId', (0, express_validator_1.param)('issueId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, IssuesController_1.IssuesController.getIssueById);
router.put('/:issueId', (0, express_validator_1.param)('issueId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('title')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El campo title debe tener entre 3 y 100 caracteres'), (0, express_validator_1.body)('description')
    .notEmpty()
    .withMessage('El campo descripcion es obligatorio'), validation_1.handleInputErrors, IssuesController_1.IssuesController.updateIssue);
router.delete('/:issueId', (0, express_validator_1.param)('issueId').isMongoId().withMessage('Id no valido'), validation_1.handleInputErrors, IssuesController_1.IssuesController.deleteIssue);
router.put('/:issueId/state', (0, express_validator_1.param)('issueId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('state').notEmpty().withMessage('El campo status es obligatorio'), validation_1.handleInputErrors, IssuesController_1.IssuesController.updateState);
exports.default = router;
//# sourceMappingURL=IssuesRoutes.js.map