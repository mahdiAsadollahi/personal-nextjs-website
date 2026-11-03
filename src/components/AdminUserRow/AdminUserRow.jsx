import {
  RiEditLine,
  RiDeleteBinLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

const avatarColors = {
  violet: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  pink: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  cyan: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  amber: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  emerald: "bg-[linear-gradient(135deg,#10b981,#047857)]",
};

const roleBadge = {
  admin: "bg-violet/10 text-violet",
  writer: "bg-ink/6 text-ink-2",
  user: "bg-ink/6 text-ink-2",
};

const statusBadge = {
  active: "bg-emerald/10 text-emerald",
  pending: "bg-amber/12 text-[#b45309]",
  blocked: "bg-rose/10 text-[#b91c1c]",
};

const statusLabel = {
  active: "فعال",
  pending: "در انتظار تایید",
  blocked: "مسدود",
};

const roleLabel = {
  admin: "مدیر",
  writer: "نویسنده",
  user: "کاربر",
};

export default function AdminUserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="transition-colors hover:bg-violet/2.5">
      <td className="px-4.5 py-4 align-middle">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-9.5 w-9.5 shrink-0 place-items-center rounded-full text-[0.82rem] font-bold text-white ${
              avatarColors[user.color] || avatarColors.violet
            }`}
          >
            {user.initial}
          </span>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-[0.9rem] font-bold leading-tight text-ink">
              {user.name}
            </span>
            <span
              dir="ltr"
              className="block truncate text-right text-[0.78rem] text-ink-3"
            >
              {user.email}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4.5 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.74rem] font-bold ${
            roleBadge[user.role]
          }`}
        >
          {roleLabel[user.role]}
        </span>
      </td>
      <td className="px-4.5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.74rem] font-bold ${
            statusBadge[user.status]
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel[user.status]}
        </span>
      </td>
      <td className="px-4.5 py-4 whitespace-nowrap">{user.joined}</td>
      <td className="px-4.5 py-4 whitespace-nowrap">{user.lastLogin}</td>
      <td className="px-4.5 py-4">
        <div className="flex gap-1.5">
          {user.status === "pending" ? (
            <>
              <button
                type="button"
                title="تایید"
                onClick={() => onEdit?.(user)}
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-emerald hover:bg-emerald/6 hover:text-emerald"
              >
                <RiCheckLine />
              </button>
              <button
                type="button"
                title="رد"
                onClick={() => onDelete?.(user)}
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-rose hover:bg-rose/6 hover:text-rose"
              >
                <RiCloseLine />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                title="ویرایش"
                onClick={() => onEdit?.(user)}
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
              >
                <RiEditLine />
              </button>
              {user.role !== "admin" && (
                <button
                  type="button"
                  title="حذف"
                  onClick={() => onDelete?.(user)}
                  className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-rose hover:bg-rose/6 hover:text-rose"
                >
                  <RiDeleteBinLine />
                </button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
