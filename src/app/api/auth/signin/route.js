import { generateAccessToken, verifyPassword } from "@/utils/auth";
import connectToDB from "@mainRoute/configs/db";
import UserModel from "@mainRoute/models/User";

export async function POST(req) {
  await connectToDB();

  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return Response.json(
      { message: "نام کاربری و پسوورد الزامی هستند !" },
      { status: 400 }
    );
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return Response.json(
      { message: "نام کاربری یا پسوورد اشتباه است" },
      { status: 401 }
    );
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return Response.json(
      { message: "نام کاربری یا پسوورد اشتباه است" },
      { status: 401 }
    );
  }

  const accessToken = generateAccessToken({ userId: user._id.toString() });

  return Response.json(
    {
      message: "ورود با موفقیت انجام شد :))",
    },
    {
      status: 200,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
