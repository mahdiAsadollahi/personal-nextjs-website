import connectToDB from "@mainRoute/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@mainRoute/models/User";

export async function GET() {
  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token?.value) {
    return Response.json(
      { data: null, message: "Not access !!" },
      { status: 401 }
    );
  }

  const tokenPayload = verifyAccessToken(token.value);

  if (!tokenPayload || !tokenPayload.userId) {
    return Response.json(
      { data: null, message: "Invalid token" },
      { status: 401 }
    );
  }

  const user = await UserModel.findById(
    tokenPayload.userId,
    "-password -refreshToken -__v"
  ).lean();

  if (!user) {
    return Response.json(
      { data: null, message: "User not found" },
      { status: 401 }
    );
  }

  return Response.json({
    data: {
      _id: user._id,
      nickname: user.nickname,
      username: user.username,
      role: user.role,
    },
  });
}
