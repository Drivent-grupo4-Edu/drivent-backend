import { ActivityLocation, Hotel, Month, Prisma, PrismaClient, Room, User, WeekDays } from '@prisma/client';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { HOTEL_IMAGES_URLS_TEMPLATE } from './urls/hotelImages';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let user = await prisma.user.findFirst();
  let users = [
    {
      email: 'mateus@gmail.com',
      password: bcrypt.hashSync('mateus', 12),
    },
    {
      email: 'hudson@gmail.com',
      password: bcrypt.hashSync('hudson', 12),
    },
    {
      email: 'leonardo@gmail.com',
      password: bcrypt.hashSync('leonardo', 12),
    },
    {
      email: 'lorena@gmail.com',
      password: bcrypt.hashSync('lorena', 12),
    },
  ];
  if (!user) {
    await prisma.user.createMany({
      data: users,
    });
  }

  const typesData = [
    {
      name: 'Presencial whith Hotel',
      includesHotel: true,
      isRemote: false,
      price: 600,
    },
    {
      name: 'Presencial no Hotel',
      includesHotel: false,
      isRemote: false,
      price: 250,
    },
    {
      name: 'Online',
      includesHotel: false,
      isRemote: true,
      price: 100,
    },
  ];
  let typesCount = await prisma.ticketType.count({});
  if (typesCount != 3) {
    typesCount = (
      await prisma.ticketType.createMany({
        data: typesData,
      })
    ).count;
  }

  const hotels = await prisma.hotel.findMany();
  if (!hotels[0])
    for (let i = 0; i < 10; i++) {
      const hotel = await prisma.hotel.create({
        data: {
          name: `Hotel ${i}`,
          image: HOTEL_IMAGES_URLS_TEMPLATE[Math.floor(Math.random() * 10)],
        },
      });
      hotels.push(hotel);
    }

    const rooms = await prisma.room.findMany();
  if (!rooms[0]) {
    const hotels = await prisma.hotel.findMany();
    for (let h = 0; h < hotels.length; h++) {
      for (let i = 1; i <= 10; i++) {
        const room = await prisma.room.create({
          data: {
            name: `Room ${i}`,
            capacity: h % 2 === 0 ? Math.ceil((Math.random() * 10) / 4) : 1,
            hotelId: hotels[h].id,
          },
        });
        rooms.push(room);
      }
    }
  }

  const activityDates = await prisma.activityDate.findMany();
  if (!activityDates[0]) {    
    
    const weekDays = [
      WeekDays.MONDAY,
      WeekDays.TUESDAY,
      WeekDays.WEDNESDAY,
      WeekDays.THURSDAY,
      WeekDays.FRIDAY,
      WeekDays.SATURDAY,
      WeekDays.SUNDAY
    ]

    const months = [
      Month.JANUARY,
      Month.FEBRUARY,
      Month.MARCH,
      Month.APRIL,
      Month.MAY,
      Month.JUNE,
      Month.JULY
    ]

    for (let i = 0; i < 7; i++) {
      const date = await prisma.activityDate.create({
        data: {
          weekDay: weekDays[i],
          monthDay: 2,
          month: months[i]
        },
      });
      activityDates.push(date);
    }
  }


  const activities = await prisma.activity.findMany();

  if (!activities[0]) {
    
    const activityLocations = [
      ActivityLocation.MAIN,
      ActivityLocation.LATERAL,
      ActivityLocation.WORKSHOP
    ]

    const activityNames = [
      "Hudson comendo feijoada",
      "Leo fazendo a janta",
      "Lorena fugindo do estagio",
      "Amigo estou aqui",
      "Prisão Domiciliar",
      "Vendo coca-lata semi usada"
    ]

    const dates = await prisma.activityDate.findMany();

    for (let i = 0; i < 6; i++) {
      const startTime = Math.floor((Math.random() * 10))
      const slotsSelector = Math.floor((Math.random() * 20))
      const oneToThreeSelector = (Math.floor((Math.random() * 10)/3))
      const date = await prisma.activity.create({
        data: {
          name: activityNames[i],
          location: activityLocations[oneToThreeSelector],
          startsAt: startTime,
          endsAt: startTime + oneToThreeSelector,
          slots: i != 4 ? slotsSelector : 1,
          dateId: dates[oneToThreeSelector * 2].id,
        },
      });
      activities.push(date);
    }
  }

  const userActivities = await prisma.userActivity.findMany();
  if (!userActivities[0]) {

    let freeSlotsActivity = await prisma.activity.findMany();
    let [user] = await prisma.user.findMany();

    const [activity] = freeSlotsActivity?.filter(a => a.slots < 1)

    if(activity && user) {
      const date = await prisma.userActivity.create({
        data: {
          userId: user.id,
          activityId: activity.id
        },
      });
      userActivities.push(date);
    }
  }
  
  console.log({ event, typesCount, hotels, rooms });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
