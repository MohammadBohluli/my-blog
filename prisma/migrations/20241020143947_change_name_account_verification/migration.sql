/*
  Warnings:

  - You are about to drop the `AccountVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountVerification" DROP CONSTRAINT "AccountVerification_usersId_fkey";

-- DropTable
DROP TABLE "AccountVerification";

-- CreateTable
CREATE TABLE "account_verification" (
    "id" SERIAL NOT NULL,
    "verificationCode" TEXT,
    "expiresAt" TIMESTAMP(3),
    "isVerifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "account_verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_verification_usersId_key" ON "account_verification"("usersId");

-- AddForeignKey
ALTER TABLE "account_verification" ADD CONSTRAINT "account_verification_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
