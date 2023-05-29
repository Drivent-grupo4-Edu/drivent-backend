import { prisma } from '@/config';

async function getActivities() {
  return prisma.activity.findMany();
}

async function getActivitiesDate() {
  return prisma.activityDate.findMany();
}

async function findByActivityId(activityId: number) {
  return prisma.activity.findFirst({ where: { id: activityId } });
}

async function updateSlotActivity(activityId: number, slots: number) {
  return prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      slots,
    },
  });
}

async function postUserActivity(userId: number, activityId: number) {
  return prisma.userActivity.create({
    data: {
      userId,
      activityId,
    },
  });
}

const activitiesRepository = {
  getActivities,
  getActivitiesDate,
  findByActivityId,
  updateSlotActivity,
  postUserActivity,
};

export default activitiesRepository;
