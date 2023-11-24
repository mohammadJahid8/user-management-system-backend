import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

routes.forEach(route => router.use(route.path, route?.route));

export default router;
