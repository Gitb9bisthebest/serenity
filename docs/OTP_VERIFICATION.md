# OTP Verification System

This document describes the implementation of the OTP (One-Time Password) verification system for user registration in Serenity Hotel.

## Overview

The OTP verification system adds an extra layer of security by requiring users to verify their email address before they can sign in to their account.

## User Flow

1. **User Registration**: User fills out registration form
2. **Account Creation**: Unverified account is created in database
3. **OTP Generation**: 6-digit OTP code is generated and sent via email
4. **OTP Modal**: Modal appears for user to enter verification code
5. **Verification**: User enters 6-digit code
6. **Account Activation**: Account is marked as verified
7. **Redirect**: User is redirected to login page

## Database Changes

### User Model Updates

- Added `verified: Boolean @default(false)` field
- Added relation to OTP model

### New OTP Model

```prisma
model Otp {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  code      String   @db.VarChar(6)
  email     String
  type      String   @default("REGISTRATION")
  expiresAt DateTime @db.Timestamp(6)
  used      Boolean  @default(false)
  userId    String?  @db.Uuid
  createdAt DateTime @default(now()) @db.Timestamp(6)

  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([email])
  @@index([code])
  @@index([expiresAt])
  @@index([used])
  @@index([userId])
  @@map("otps")
}
```

## Backend Implementation

### OTP Utilities (`src/lib/otp.ts`)

- `generateOTP()`: Creates random 6-digit codes
- `createOTP()`: Stores OTP in database with 10-minute expiration
- `validateOTP()`: Validates and marks OTP as used
- `canRequestOTP()`: Rate limiting (60-second cooldown)
- `cleanupExpiredOTPs()`: Cleanup expired codes

### Email Service (`src/lib/services/email.service.ts`)

- Uses Resend API for email delivery
- Professional HTML email template
- Includes user's name and OTP code
- 10-minute expiration notice

### User Actions (`src/lib/actions/user.action.ts`)

- `registerUser()`: Creates unverified user + sends OTP
- `verifyRegistrationOTP()`: Validates OTP and marks user verified
- `resendOTP()`: Sends new OTP with rate limiting
- `signInWithCredentials()`: Only allows verified users to sign in

## Frontend Implementation

### Registration Form (`src/components/auth/register-form.tsx`)

- Modified to show OTP modal after successful registration
- No longer auto-signs in users
- Integrates with OTP modal component

### OTP Modal (`src/components/auth/otp-modal.tsx`)

- 6 separate input fields for OTP code
- Auto-focus next input on digit entry
- Backspace navigation between fields
- Resend functionality with 60-second cooldown
- Escape key support for accessibility
- Loading states and error handling

## Security Features

- **Password Hashing**: bcryptjs with salt rounds of 10
- **OTP Expiration**: Codes expire after 10 minutes
- **Rate Limiting**: 60-second cooldown between resend requests
- **One-time Use**: OTPs are marked as used after verification
- **Server-side Validation**: All OTP validation happens server-side
- **Cleanup**: Expired and used OTPs are automatically cleaned up

## Environment Variables Required

```bash
# Email Service
RESEND_API_KEY=re_xxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com

# Database
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## Dependencies Added

- `resend`: Email delivery service
- `bcryptjs`: Password hashing (already present)

## File Structure

```
src/
├── lib/
│   ├── otp.ts                    # OTP utility functions
│   ├── services/
│   │   └── email.service.ts      # Email service with Resend
│   └── actions/
│       └── user.action.ts        # Updated user actions
├── components/
│   └── auth/
│       ├── register-form.tsx     # Updated registration form
│       └── otp-modal.tsx         # New OTP verification modal
└── prisma/
    └── schema.prisma             # Updated database schema
```

## Testing the System

1. **Registration**: Fill out registration form
2. **Email Check**: Verify OTP email is received
3. **OTP Entry**: Enter 6-digit code in modal
4. **Verification**: Account should be marked as verified
5. **Login**: User should be able to sign in
6. **Resend**: Test resend functionality with cooldown

## Error Handling

- **Email Failure**: User account is deleted if email fails to send
- **Invalid OTP**: Clear error messages for invalid/expired codes
- **Rate Limiting**: User-friendly messages for resend cooldown
- **Network Issues**: Graceful fallbacks for unexpected errors

## Future Enhancements

- **SMS OTP**: Add phone number verification option
- **Backup Codes**: Generate backup verification codes
- **Admin Panel**: View and manage OTP requests
- **Analytics**: Track verification success rates
- **Customization**: Allow admins to customize email templates

## Troubleshooting

### Common Issues

1. **OTP Not Received**: Check Resend API key and email configuration
2. **Database Errors**: Ensure Prisma client is regenerated after schema changes
3. **TypeScript Errors**: Verify all imports and type definitions
4. **Email Template**: Test email template rendering in different email clients

### Debug Mode

Enable debug logging by setting environment variables:

```bash
DEBUG=prisma:*
DEBUG=resend:*
```

## Performance Considerations

- **Database Indexes**: Optimized indexes on OTP table
- **Cleanup Jobs**: Regular cleanup of expired OTPs
- **Rate Limiting**: Prevents abuse and reduces email costs
- **Caching**: Consider Redis for high-traffic scenarios
