import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function findFirst() {
  const cacheKey = 'event';
  const cachedEvent = JSON.parse(await redis.get(cacheKey));
  if (cachedEvent.id) {
    const event = cachedEvent;
    return event;
  }

  const event = await prisma.event.findFirst();
  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
