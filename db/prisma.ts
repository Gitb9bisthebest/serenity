import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// ✅ WebSocket setup
neonConfig.webSocketConstructor = ws;

// ✅ Adapter expects { connectionString }
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

// ✅ Prisma client
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    room: {
      price: {
        compute(room) {
          return room.price.toString();
        },
      },
    },
    booking: {
      totalAmount: {
        needs: { totalAmount: true },
        compute(booking) {
          return booking.totalAmount.toString();
        },
      },
    },
    payment: {
      amount: {
        needs: { amount: true },
        compute(payment) {
          return payment.amount.toString();
        },
      },
      refundAmount: {
        needs: { refundAmount: true },
        compute(payment) {
          return payment.refundAmount?.toString();
        },
      },
    },
  },
});
