import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activity-service';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getActivities();

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivitiesDate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activitiesDate = await activitiesService.getActivitiesDate();

    return res.status(httpStatus.OK).send(activitiesDate);
  } catch (error) {
    next(error);
  }
}

export async function usersSlots(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId }: { userId: number } = req;
  const { activityId, slots }: { activityId: number; slots: number } = req.body;
  try {
    const userSlot = await activitiesService.usersSlots(userId, activityId, slots);

    return res.status(httpStatus.OK).send(userSlot);
  } catch (error) {
    next(error);
  }
}
