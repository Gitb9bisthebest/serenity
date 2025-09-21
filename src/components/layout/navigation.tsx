import NavClient from "./nav-client";
import { auth } from "@/lib/auth";

export default async function Navigation() {
  try {
    const session = await auth();
    return <NavClient user={session?.user} />;
  } catch (error) {
    console.error("Authentication error:", error);
    return <NavClient />; // Graceful fallback
  }
}
