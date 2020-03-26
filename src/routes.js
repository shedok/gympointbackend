import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import PlanController from './app/controllers/PlanController';

import StudentController from './app/controllers/StudentController';

import EnrollmentsController from './app/controllers/EnrollmentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.get('/plans', PlanController.index);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.get('/students', StudentController.index);

routes.post('/enrollments', EnrollmentsController.store);
routes.get('/enrollments', EnrollmentsController.index);

export default routes;
