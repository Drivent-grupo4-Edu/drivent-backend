import { Router } from 'express';
import { getActivities, getActivitiesDate } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivities).get('/date', getActivitiesDate);
export { activitiesRouter };
