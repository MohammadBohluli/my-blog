-- DropForeignKey
ALTER TABLE "account_verification" DROP CONSTRAINT "account_verification_userId_fkey";

-- DropForeignKey
ALTER TABLE "reset_password" DROP CONSTRAINT "reset_password_userId_fkey";

-- AddForeignKey
ALTER TABLE "account_verification" ADD CONSTRAINT "account_verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
