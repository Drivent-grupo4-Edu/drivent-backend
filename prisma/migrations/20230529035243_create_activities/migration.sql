-- CreateTable
CREATE TABLE "Activites" (
    "id" SERIAL NOT NULL,
    "activity_name" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "soldOff" BOOLEAN NOT NULL,
    "inicialHour" INTEGER NOT NULL,
    "finalHour" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localID" INTEGER NOT NULL,

    CONSTRAINT "Activites_pkey" PRIMARY KEY ("id")
);
