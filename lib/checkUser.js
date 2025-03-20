import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    // Check if user exists in the database
    let loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) return loggedInUser;

    // Safely construct name and email
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
    const email =
      user.emailAddresses?.[0]?.emailAddress || "no-email@example.com";

    // Create a new user if not found
    loggedInUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    return loggedInUser;
  } catch (error) {
    console.error("Error checking or creating user:", error.message);
    return null; // Prevents crashes due to unhandled errors
  }
};
