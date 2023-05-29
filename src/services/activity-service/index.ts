import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activity-repository';
import bookingRepository from '@/repositories/booking-repository';

async function getActivities() {
  const activities = await activitiesRepository.getActivities();

  if (!activities) throw notFoundError();

  for (let i = 0; i < activities.length; i++) {
    delete activities[i].createdAt;
    delete activities[i].updatedAt;
  }

  return activities;
}

async function getActivitiesDate() {
  const activitiesDate = await activitiesRepository.getActivitiesDate();

  if (!activitiesDate) throw notFoundError();
  return activitiesDate;
}

async function usersSlots(userId: number, activityId: number, slots: number) {
  const userExist = await bookingRepository.findByUserId(userId);

  if (!userExist) throw notFoundError();

  const activityIDExist = await activitiesRepository.findByActivityId(activityId);

  if (!activityIDExist) throw notFoundError();

  await activitiesRepository.updateSlotActivity(activityId, slots);

  return activitiesRepository.postUserActivity(userId, activityId);
}

const activitiesService = {
  getActivities,
  getActivitiesDate,
  usersSlots,
};

export default activitiesService;
