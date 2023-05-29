import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activity-repository';

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

const activitiesService = {
  getActivities,
  getActivitiesDate,
};

export default activitiesService;
