-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."otps" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(6) NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'REGISTRATION',
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "otps_email_idx" ON "public"."otps"("email");

-- CreateIndex
CREATE INDEX "otps_code_idx" ON "public"."otps"("code");

-- CreateIndex
CREATE INDEX "otps_expiresAt_idx" ON "public"."otps"("expiresAt");

-- CreateIndex
CREATE INDEX "otps_used_idx" ON "public"."otps"("used");

-- CreateIndex
CREATE INDEX "otps_userId_idx" ON "public"."otps"("userId");

-- AddForeignKey
ALTER TABLE "public"."otps" ADD CONSTRAINT "otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
