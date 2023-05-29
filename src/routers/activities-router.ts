import { Router } from 'express';
import { getActivities, getActivitiesDate, usersSlots } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .get('/date', getActivitiesDate)
  .post('/', usersSlots);
export { activitiesRouter };
