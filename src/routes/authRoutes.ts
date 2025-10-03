import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.post(
  '/register',
  body('name')
  .notEmpty()
  .withMessage('El campo name es obligatorio')
  .isLength({ min: 3 })
  .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo debe ser un email valido'),
  body('password')
    .notEmpty()
    .withMessage('El campo password es obligatorio')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  handleInputErrors,
  AuthController.register
);

router.post(
  '/login',
  body('email')
    .notEmpty()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo debe ser un email valido'),
  body('password')
    .notEmpty()
    .withMessage('El campo password es obligatorio'),
  handleInputErrors,
  AuthController.login
);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

export default router;
