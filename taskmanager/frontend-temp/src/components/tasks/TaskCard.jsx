import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const TaskCard = ({ task, onEdit, onDelete, theme }) => {
  const navigate = useNavigate();
  const dark = theme === "dark";

  const formattedDate = new Date(task.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200
        ${dark
          ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#c8b89a]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white/85 border border-black/10 hover:bg-white hover:border-[#c8b89a]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        }
        hover:-translate-y-1
      `}
    >
     
      <div
        className={`
          absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-200
          ${task.status === "completed" ? "bg-green-500" : "bg-[#c8b89a]"}
          group-hover:opacity-100
        `}
      />

      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-3">
        <h3
          onClick={() => navigate(`/tasks/${task._id}`)}
          className={`
            text-[15px] font-semibold leading-snug tracking-tight cursor-pointer transition-colors
            ${dark
              ? "text-white/90 group-hover:text-white"
              : "text-gray-800 group-hover:text-black"
            }
          `}
        >
          {task.title}
        </h3>

        <StatusBadge status={task.status} />
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={`
            text-[13px] leading-relaxed line-clamp-2
            ${dark ? "text-white/50" : "text-black/50"}
          `}
        >
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div
        className={`
          flex items-center justify-between flex-wrap gap-3 pt-3 border-t
          ${dark ? "border-white/10" : "border-black/10"}
        `}
      >
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`${dark ? "text-white/40" : "text-black/40"}`}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>

          <span className={dark ? "text-white/40" : "text-black/40"}>
            {formattedDate}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
              border
              ${dark
                ? "border-white/20 text-white/60 hover:border-[#c8b89a]/60 hover:text-[#c8b89a] hover:bg-[#c8b89a]/10"
                : "border-black/10 text-black/60 hover:border-[#c8b89a]/60 hover:text-[#c8b89a] hover:bg-[#c8b89a]/10"
              }
            `}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
              border
              ${dark
                ? "border-white/20 text-white/60 hover:border-red-500/60 hover:text-red-500 hover:bg-red-500/10"
                : "border-black/10 text-black/60 hover:border-red-500/60 hover:text-red-500 hover:bg-red-500/10"
              }
            `}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;