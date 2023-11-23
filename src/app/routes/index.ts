import express from 'express';

const router = express.Router();

const routes = [
  {
    path: '/user',
    route: UserRoutes,
  },
];

routes.forEach(route => router.use(route.path, route?.route));

export default router;
