import {
  generateAccessToken,
  hashPassword,
  validatePassword,
} from "@/utils/auth";
import connectToDB from "@mainRoute/configs/db";
import UserModel from "@mainRoute/models/User";

export async function POST(req) {
  await connectToDB();

  const body = await req.json();
  const { nickname, username, password } = body;

  if (!nickname || !username || !password) {
    return Response.json(
      { message: "نام نمایشی، نام کاربری و پسوورد الزامی هستند !" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return Response.json(
      {
        message: "طول پسوورد حداقل باید 8 کاراکتر باشد !",
      },
      {
        status: 400,
      }
    );
  }

  if (!validatePassword(password)) {
    return Response.json(
      {
        message:
          "پسوورد باید حداقل شامل یک حرف بزرگ،یک حرف کوچک،یک عدد و یک کاراکتر خاص باشد",
      },
      {
        status: 400,
      }
    );
  }

  const isUserExist = await UserModel.findOne({ username });
  if (isUserExist) {
    return Response.json(
      { message: "این نام کاربری قبلاً ثبت نام شده است" },
      { status: 409 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const users = await UserModel.find({});

  const user = await UserModel.create({
    nickname,
    username,
    password: hashedPassword,
    role: users.length > 0 ? "USER" : "ADMIN",
  });

  const accessToken = generateAccessToken({ userId: user._id.toString() });

  return Response.json(
    {
      message: "ثبت نام با موفقیت انجام شد :))",
    },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
    }
  );
}
