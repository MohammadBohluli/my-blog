/*
  Warnings:

  - You are about to drop the `password_reset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "password_reset" DROP CONSTRAINT "password_reset_userId_fkey";

-- DropTable
DROP TABLE "password_reset";

-- CreateTable
CREATE TABLE "reset_password" (
    "id" SERIAL NOT NULL,
    "resetToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_userId_key" ON "reset_password"("userId");

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
