-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_profile_owner_fkey";

-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "profile_owner" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_profile_owner_fkey" FOREIGN KEY ("profile_owner") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
