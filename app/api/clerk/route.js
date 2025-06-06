import { Webhook } from "svix";
import connectDB from "../../../config/db";
import User from "../../../models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("✅ Webhook triggered!");

  const wh = new Webhook(process.env.SIGNING_SECRET);

  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let data, type;
  try {
    ({ data, type } = wh.verify(body, svixHeaders));
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const userData = {
    _id: data.id,
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };

  console.log("🔔 Webhook type:", type);
  console.log("📦 User data to save:", userData);

  await connectDB();

  try {
    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("✅ User created");
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("🔄 User updated");
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("❌ User deleted");
        break;
    }
  } catch (dbError) {
    console.error("❌ MongoDB operation failed:", dbError);
  }

  return NextResponse.json({ message: "Event received" });
}
