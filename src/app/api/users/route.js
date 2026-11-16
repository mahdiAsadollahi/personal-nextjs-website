import connectToDB from "@mainRoute/configs/db";
import UserModel from "@mainRoute/models/User";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/auth";

export async function GET(req) {
  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Not access !!" }, { status: 401 });
  }

  const payload = verifyAccessToken(token);
  if (!payload?.userId) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const me = await UserModel.findById(payload.userId, "role").lean();
  if (!me || me.role !== "ADMIN") {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") || "10", 10), 1),
    100
  );
  const search = (searchParams.get("search") || "").trim();
  const role = searchParams.get("role") || "";

  const filter = {};
  if (search) {
    filter.$or = [
      { nickname: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ];
  }
  if (role === "USER" || role === "ADMIN") {
    filter.role = role;
  }

  const [users, total] = await Promise.all([
    UserModel.find(filter, "-password -refreshToken -__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    UserModel.countDocuments(filter),
  ]);

  return Response.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
