import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  console.log("🔐 [USER-LOGIN] Login request");
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      console.log("⚠️  [USER-LOGIN] Missing phone number");
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      console.log("⚠️  [USER-LOGIN] Invalid phone number format");
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Find or create user
    console.log(`🔍 [USER-LOGIN] Looking up user: ${cleanedPhone}`);
    let user = await prisma.user.findUnique({
      where: { phoneNumber: cleanedPhone },
    });

    if (!user) {
      console.log(`✨ [USER-LOGIN] Creating new user: ${cleanedPhone}`);
      user = await prisma.user.create({
        data: {
          phoneNumber: cleanedPhone,
          name: `User ${cleanedPhone}`,
        },
      });
      console.log(`✅ [USER-LOGIN] User created: ${user.id}`);
    } else {
      console.log(`✅ [USER-LOGIN] User found: ${user.id}`);
    }

    // Generate random 6-character token
    const token = crypto.randomBytes(3).toString('hex').toUpperCase();
    const tokenExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save token to user record
    console.log(`🎫 [USER-LOGIN] Generating login token for user: ${user.id}`);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginToken: token,
        loginTokenExpires: tokenExpires,
      },
    });

    // Generate WhatsApp link
    const systemPhoneNumber = process.env.WA_SYSTEM_PHONE_NUMBER || process.env.WA_PHONE_NUMBER_ID;
    const waLink = `https://wa.me/${systemPhoneNumber}?text=login+${token}`;

    console.log(`✅ [USER-LOGIN] Login token generated: ${token}`);
    return NextResponse.json(
      {
        success: true,
        token,
        waLink,
        expiresIn: 300, // 5 minutes in seconds
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [USER-LOGIN] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate login token" },
      { status: 500 }
    );
  }
}
