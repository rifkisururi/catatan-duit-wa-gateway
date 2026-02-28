-- AlterTable
ALTER TABLE "users" ADD COLUMN     "callbackUrl" TEXT,
ADD COLUMN     "loginToken" TEXT,
ADD COLUMN     "loginTokenExpires" TIMESTAMP(3);
