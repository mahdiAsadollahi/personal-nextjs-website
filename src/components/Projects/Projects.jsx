"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

export default function Projects({ projects }) {
  const allTech = [
    "همه",
    ...Array.from(new Set(projects.flatMap((p) => p.tech))),
  ];
  const [filter, setFilter] = useState("همه");

  const filtered =
    filter === "همه"
      ? projects
      : projects.filter((p) => p.tech.includes(filter));

  return (
    <section className="relative z-1 py-16 pt-37.5">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="mb-12 flex max-w-160 flex-col gap-3">
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
            نمونه‌کارها
          </span>
          <h1 className="text-[clamp(1.6rem,3.2vw,2.3rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
            چیزهایی که ساختم
          </h1>
          <p className="text-base leading-loose text-ink-2">
            یه گزیده از پروژه‌هایی که روشون کار کردم — از وب‌سایت‌های کوچک تا
            اپلیکیشن‌های کامل. هر کدوم یه داستان و یه سری درس داره.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-1.5">
          {allTech.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              className={`rounded-full border px-3.5 py-1.75 text-[0.82rem] font-medium transition-colors ${
                filter === tech
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[20px] border border-border bg-surface px-5 py-16 text-center text-ink-3">
            <p className="text-base font-bold text-ink-2">پروژه‌ای پیدا نشد</p>
            <p className="max-w-80 text-[0.85rem] leading-[1.9]">
              با این تکنولوژی، پروژه‌ای نیست. یه فیلتر دیگه امتحان کن.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
