import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { IssuesController } from '../controllers/IssuesController';
import { IssueExists } from '../middleware/Issue';
import { authenticateAccessToken } from '../middleware/auth';

const router = Router();

router.use(authenticateAccessToken);

router.post(
  '/',
  body('title')
    .notEmpty()
    .withMessage('El campo title es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El campo title debe tener entre 3 y 100 caracteres'),
  body('description')
    .notEmpty()
    .withMessage('El campo description es obligatorio'),
  handleInputErrors,
  IssuesController.createIssue
);

// GET /issues?state=&priority=&search=&page=&limit=
router.get('/', IssuesController.getIssues);

router.param('issueId', IssueExists);

router.get(
  '/:issueId',
  param('issueId').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  IssuesController.getIssueById
);

router.put(
  '/:issueId',
  param('issueId').isMongoId().withMessage('Id no valido'),
  body('title')
    .notEmpty()
    .withMessage('El campo nombre es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El campo title debe tener entre 3 y 100 caracteres'),
  body('description')
    .notEmpty()
    .withMessage('El campo descripcion es obligatorio'),
  handleInputErrors,
  IssuesController.updateIssue
);

router.delete(
  '/:issueId',
  param('issueId').isMongoId().withMessage('Id no valido'),
  handleInputErrors,
  IssuesController.deleteIssue
);

router.put(
  '/:issueId/state',
  param('issueId').isMongoId().withMessage('Id no valido'),
  body('state').notEmpty().withMessage('El campo status es obligatorio'),
  handleInputErrors,
  IssuesController.updateState
);

export default router;
