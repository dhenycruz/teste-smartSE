/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('Diesel', 'Gasolina', 'Alcool');

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_userId_fkey";

-- DropTable
DROP TABLE "Car";

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "cor" TEXT NOT NULL,
    "potencia" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anoModelo" INTEGER NOT NULL,
    "anoFabricacao" INTEGER NOT NULL,
    "renavan" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelingData" (
    "id" SERIAL NOT NULL,
    "type_fuel" "Fuel" NOT NULL DEFAULT 'Gasolina',
    "value" DECIMAL(9,2) NOT NULL,
    "quantity_fueled" DECIMAL(9,2) NOT NULL,
    "carId" INTEGER NOT NULL,
    "dateFueled" datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    CONSTRAINT "FuelingData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_renavan_key" ON "Vehicle"("renavan");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chassi_key" ON "Vehicle"("chassi");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuelingData" ADD CONSTRAINT "FuelingData_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
