import expresas from 'express';
import { login, logout, signUp } from '../controller/authController.js';


const authRouter = expresas.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export default authRouter;