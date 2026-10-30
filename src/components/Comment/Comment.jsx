"use client";

import { useState } from "react";
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiReplyLine,
  RiVerifiedBadgeFill,
} from "react-icons/ri";

const avatarPalette = {
  violet: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  pink: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  cyan: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  amber: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  emerald: "bg-[linear-gradient(135deg,#10b981,#047857)]",
};

export default function Comment({ comment, depth = 0 }) {
  const [liked, setLiked] = useState(Boolean(comment.liked));
  const [likes, setLikes] = useState(comment.likes || 0);

  const isReply = depth > 0;
  const avatarClass = avatarPalette[comment.color] || avatarPalette.violet;

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <article className={`flex items-start ${isReply ? "gap-3" : "gap-4"}`}>
      <span
        className={`grid shrink-0 place-items-center rounded-full font-bold text-white ${avatarClass} ${
          isReply
            ? "h-9 w-9 text-[0.75rem] max-[640px]:h-8 max-[640px]:w-8 max-[640px]:text-[0.68rem]"
            : "h-11 w-11 text-[0.85rem] max-[640px]:h-9.5 max-[640px]:w-9.5 max-[640px]:text-[0.78rem]"
        }`}
      >
        {comment.initial}
      </span>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <span className="text-[0.9rem] font-bold text-ink">
            {comment.author}
          </span>
          <span className="text-[0.76rem] text-ink-3">{comment.time}</span>
          {comment.isAuthor && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet/10 px-2 py-0.75 text-[0.68rem] font-bold text-violet">
              <RiVerifiedBadgeFill />
              نویسنده
            </span>
          )}
        </div>

        <p className="mb-2 text-[0.92rem] leading-loose text-ink-2">
          {comment.text}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLike}
            className={`inline-flex items-center gap-1.25 rounded-lg border-0 bg-transparent px-2.5 py-1.25 text-[0.78rem] font-medium transition-colors hover:bg-ink/5 ${
              liked ? "text-pink hover:text-pink" : "text-ink-3 hover:text-ink"
            }`}
          >
            {liked ? (
              <RiHeart3Fill className="text-[0.95rem]" />
            ) : (
              <RiHeart3Line className="text-[0.95rem]" />
            )}
            {likes}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.25 rounded-lg border-0 bg-transparent px-2.5 py-1.25 text-[0.78rem] font-medium text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <RiReplyLine className="text-[0.95rem]" />
            پاسخ
          </button>
        </div>

        {comment.replies?.length > 0 && (
          <div className="mt-4 flex flex-col gap-4 border-s-2 border-border ps-5 max-[640px]:ps-3">
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
