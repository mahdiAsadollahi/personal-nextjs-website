import { valiadtePassword } from "@/utils/auth";
import connectToDB from "@mainRoute/configs/db";

export async function POST(req) {
  connectToDB();

  const body = await req.json();
  const { nickname, username, password } = body;

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

  if (!valiadtePassword(password)) {
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
}
