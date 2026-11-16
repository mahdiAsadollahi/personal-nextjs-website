"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import MessageModal from "@/components/MessageModal/MessageModal";

export default function RegisterPage() {
  const mainRef = useRef(null);
  const router = useRouter();

  const [form, setForm] = useState({
    nickname: "",
    username: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const main = mainRef.current;
    if (!main) return;

    const blobs = main.querySelectorAll("[data-blob]");
    let rafBlobs;
    const startTime = performance.now();

    const animateBlobs = (now) => {
      const t = (now - startTime) / 1000;
      blobs.forEach((blob, index) => {
        const speed = parseFloat(blob.dataset.speed) || 1;
        const range = parseFloat(blob.dataset.range) || 40;
        const phase = parseFloat(blob.dataset.phase) || index * 1.7;

        const x = Math.sin(t * 0.22 * speed + phase) * range;
        const y = Math.cos(t * 0.17 * speed + phase * 1.3) * range * 0.8;
        const stretch = 0.22;
        const sx = 1 + Math.sin(t * 0.13 * speed + phase * 0.9) * stretch;
        const sy = 1 + Math.cos(t * 0.13 * speed + phase * 0.9) * stretch;
        const rot = Math.sin(t * 0.05 * speed + phase * 0.6) * 22;
        const r1 = 55 + Math.sin(t * 0.11 * speed + phase) * 20;
        const r2 = 45 + Math.cos(t * 0.14 * speed + phase * 1.1) * 20;
        const r3 = 50 + Math.sin(t * 0.12 * speed + phase * 1.4) * 18;
        const r4 = 50 + Math.cos(t * 0.09 * speed + phase * 0.9) * 18;

        blob.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(
          2
        )}px,0) rotate(${rot.toFixed(2)}deg) scale(${sx.toFixed(
          3
        )},${sy.toFixed(3)})`;
        blob.style.borderRadius = `${r1.toFixed(1)}% ${(100 - r1).toFixed(
          1
        )}% ${r3.toFixed(1)}% ${(100 - r3).toFixed(1)}% / ${r2.toFixed(1)}% ${(
          100 - r2
        ).toFixed(1)}% ${r4.toFixed(1)}% ${(100 - r4).toFixed(1)}%`;
      });
      rafBlobs = requestAnimationFrame(animateBlobs);
    };
    rafBlobs = requestAnimationFrame(animateBlobs);

    return () => {
      cancelAnimationFrame(rafBlobs);
    };
  }, []);

  const showMessage = (type, title, message) => {
    setModal({ open: true, type, title, message });
  };

  const closeMessage = () => setModal((m) => ({ ...m, open: false }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    const nickname = form.nickname.trim();
    const username = form.username.trim();

    if (!nickname) next.nickname = "نام نمایشی الزامی است";
    else if (nickname.length < 2) next.nickname = "حداقل ۲ کاراکتر";
    else if (nickname.length > 30) next.nickname = "حداکثر ۳۰ کاراکتر";

    if (!username) next.username = "نام کاربری الزامی است";
    else if (username.length < 3) next.username = "حداقل ۳ کاراکتر";
    else if (username.length > 30) next.username = "حداکثر ۳۰ کاراکتر";
    else if (!/^[a-zA-Z0-9_.-]+$/.test(username))
      next.username = "فقط حروف، اعداد، _، - و . مجاز است";

    const password = form.password;
    if (!password) next.password = "رمز عبور الزامی است";
    else if (password.length < 8) next.password = "حداقل ۸ کاراکتر";
    else if (!/[A-Z]/.test(password))
      next.password = "حداقل یک حرف بزرگ لازم است";
    else if (!/[a-z]/.test(password))
      next.password = "حداقل یک حرف کوچک لازم است";
    else if (!/[0-9]/.test(password)) next.password = "حداقل یک عدد لازم است";
    else if (!/[#?!@$%^&*-]/.test(password))
      next.password = "حداقل یک کاراکتر خاص لازم است";

    if (!form.confirmPassword) next.confirmPassword = "تکرار رمز الزامی است";
    else if (form.confirmPassword !== password)
      next.confirmPassword = "رمزها یکسان نیستند";

    if (!form.agree) next.agree = "پذیرش قوانین الزامی است";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) {
      showMessage(
        "error",
        "خطای اعتبارسنجی",
        "لطفاً فیلدهای مشخص‌شده را اصلاح کن."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: form.nickname.trim(),
          username: form.username.trim(),
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showMessage(
          "error",
          "ثبت‌نام ناموفق",
          data.message || "خطایی رخ داد، لطفاً دوباره تلاش کن."
        );
        setLoading(false);
        return;
      }

      showMessage(
        "success",
        "ثبت‌نام موفق",
        data.message || "حسابت ساخته شد، خوش اومدی :)"
      );
      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1200);
    } catch (err) {
      showMessage("error", "خطای شبکه", "اتصال به سرور برقرار نشد.");
      setLoading(false);
    }
  };

  return (
    <main
      ref={mainRef}
      className="relative z-1 flex min-h-screen items-center justify-center overflow-hidden pt-32.5 pb-16 max-[480px]:pt-27.5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <span
          data-blob
          data-speed="1.5"
          data-range="30"
          data-phase="0"
          className="pointer-events-none absolute h-85 w-85 top-[8%] right-[6%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.55] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="2.2"
          data-range="40"
          data-phase="2.1"
          className="pointer-events-none absolute h-75 w-75 bottom-[4%] left-[8%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.50] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.8"
          data-range="34"
          data-phase="4.3"
          className="pointer-events-none absolute h-55 w-55 top-[40%] left-[20%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.42] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.2"
          data-range="38"
          data-phase="1.2"
          className="pointer-events-none absolute h-50 w-50 bottom-[20%] right-[22%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--amber-soft),var(--amber)_70%)] opacity-[0.38] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
      </div>

      <div className="relative z-2 mx-6 w-full max-w-120 rounded-[28px] border border-border bg-surface px-8 py-12 shadow-[0_1px_3px_rgba(20,20,26,0.04),0_24px_48px_rgba(20,20,26,0.08)] max-[480px]:mx-4 max-[480px]:px-6 max-[480px]:py-8">
        <span className="mb-3 inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
          ثبت‌نام
        </span>
        <h1 className="mb-2 text-[clamp(1.5rem,3.4vw,1.9rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
          بساز و بیا تو
        </h1>
        <p className="mb-8 text-[0.92rem] leading-[1.95] text-ink-2">
          یه حساب بساز تا مقالات تازه رو قبل از همه بخونی، نظر بدی و نوشته‌های
          موردعلاقه‌ت رو ذخیره کنی. کمتر از یه دقیقه طول می‌کشه.
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-1.75">
            <label
              htmlFor="nickname"
              className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
            >
              نیک‌نیم <span className="text-rose">*</span>
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              dir="ltr"
              autoComplete="nickname"
              placeholder="مثلاً: mahdi_dev"
              value={form.nickname}
              onChange={handleChange}
              aria-invalid={!!errors.nickname}
              className={`w-full rounded-[10px] border bg-surface px-4 py-3.25 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none ${
                errors.nickname
                  ? "border-rose focus:border-rose"
                  : "border-border-strong focus:border-violet"
              }`}
            />
            {errors.nickname && (
              <span className="ps-0.5 text-[0.76rem] text-rose">
                {errors.nickname}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.75">
            <label
              htmlFor="username"
              className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
            >
              نام کاربری <span className="text-rose">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              dir="ltr"
              autoComplete="username"
              placeholder="نام کاربری خودت رو انتخاب کن"
              value={form.username}
              onChange={handleChange}
              aria-invalid={!!errors.username}
              className={`w-full rounded-[10px] border bg-surface px-4 py-3.25 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none ${
                errors.username
                  ? "border-rose focus:border-rose"
                  : "border-border-strong focus:border-violet"
              }`}
            />
            {errors.username && (
              <span className="ps-0.5 text-[0.76rem] text-rose">
                {errors.username}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.75">
            <label
              htmlFor="password"
              className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
            >
              رمز عبور <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                minLength={8}
                placeholder="حداقل ۸ کاراکتر"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                className={`w-full rounded-[10px] border bg-surface px-4 py-3.25 pe-11.5 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none ${
                  errors.password
                    ? "border-rose focus:border-rose"
                    : "border-border-strong focus:border-violet"
                }`}
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                }
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 inset-e-1.5 grid h-8.5 w-8.5 -translate-y-1/2 place-items-center rounded-lg border-0 bg-transparent text-base text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {errors.password && (
              <span className="ps-0.5 text-[0.76rem] text-rose">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.75">
            <label
              htmlFor="confirmPassword"
              className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
            >
              تکرار رمز عبور <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="رمز عبور را دوباره وارد کن"
                value={form.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
                className={`w-full rounded-[10px] border bg-surface px-4 py-3.25 pe-11.5 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none ${
                  errors.confirmPassword
                    ? "border-rose focus:border-rose"
                    : "border-border-strong focus:border-violet"
                }`}
              />
              <button
                type="button"
                aria-label={
                  showConfirm ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
                }
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute top-1/2 inset-e-1.5 grid h-8.5 w-8.5 -translate-y-1/2 place-items-center rounded-lg border-0 bg-transparent text-base text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {showConfirm ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="ps-0.5 text-[0.76rem] text-rose">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <label className="mt-1 flex items-start gap-2.5 ps-0.5 text-[0.82rem] leading-[1.85] text-ink-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-violet"
            />
            <span>
              با{" "}
              <a
                href="#"
                className="font-medium text-violet no-underline hover:underline"
              >
                قوانین و حریم خصوصی
              </a>{" "}
              موافقم. <span className="text-rose">*</span>
            </span>
          </label>
          {errors.agree && (
            <span className="-mt-2 ps-0.5 text-[0.76rem] text-rose">
              {errors.agree}
            </span>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-transparent bg-violet px-5.5 py-3.5 text-[0.98rem] font-medium text-white shadow-[0_6px_18px_rgba(124,58,237,0.24)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:shadow-[0_12px_28px_rgba(124,58,237,0.30)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            <span>{loading ? "در حال ثبت‌نام..." : "ساخت حساب"}</span>
            {!loading && <RiArrowLeftLine />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[0.76rem] tracking-wider text-ink-3 before:h-px before:flex-1 before:bg-border before:content-[''] after:h-px after:flex-1 after:bg-border after:content-['']">
          حساب داری؟
        </div>

        <div className="text-center text-[0.9rem] text-ink-2">
          <a
            href="/login"
            className="font-medium text-violet no-underline hover:underline"
          >
            وارد شو
          </a>
        </div>
      </div>

      <MessageModal
        open={modal.open}
        onClose={closeMessage}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </main>
  );
}
