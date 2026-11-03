import AdminUsersTable from "@/components/AdminUsersTable/AdminUsersTable";

const users = [
  {
    id: 1,
    username: "testUser",
    initial: "م",
    color: "violet",
    name: "مهدی اسداللهی",
    email: "mahdi@asdollahi.ir",
    role: "admin",
    status: "active",
    joined: "۱ فروردین ۱۴۰۴",
    lastLogin: "همین حالا",
  },
  {
    id: 2,
    username: "testUser",
    initial: "س",
    color: "pink",
    name: "سارا محمدی",
    email: "sara.m@example.com",
    role: "writer",
    status: "active",
    joined: "۱۵ اردیبهشت ۱۴۰۴",
    lastLogin: "۲ ساعت پیش",
  },
  {
    id: 3,
    username: "testUser",
    initial: "ع",
    color: "cyan",
    name: "علی رضایی",
    email: "ali.r@example.com",
    role: "user",
    status: "active",
    joined: "۳ خرداد ۱۴۰۴",
    lastLogin: "دیروز",
  },
  {
    id: 4,
    username: "testUser",
    initial: "م",
    color: "amber",
    name: "مریم حسینی",
    email: "maryam.h@example.com",
    role: "user",
    status: "pending",
    joined: "۲۰ شهریور ۱۴۰۴",
    lastLogin: "هرگز",
  },
  {
    id: 5,
    username: "testUser",
    initial: "ر",
    color: "emerald",
    name: "رضا کریمی",
    email: "reza.k@example.com",
    role: "user",
    status: "blocked",
    joined: "۵ مهر ۱۴۰۴",
    lastLogin: "۱۰ روز پیش",
  },
];

export const metadata = {
  title: "کاربران — پنل مدیریت",
};

export default function AdminUsersPage() {
  return <AdminUsersTable users={users} />;
}
