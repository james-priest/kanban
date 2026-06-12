"use client";

import { useEffect, useRef, useState } from "react";

type ColumnHeaderProps = {
  title: string;
  cardCount: number;
  onRename: (title: string) => void;
};

export function ColumnHeader({ title, cardCount, onRename }: ColumnHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEditing() {
    setValue(title);
    setEditing(true);
  }

  function commit() {
    const trimmed = value.trim();
    if (trimmed) {
      onRename(trimmed);
    } else {
      setValue(title);
    }
    setEditing(false);
  }

  return (
    <div className="mb-3 flex items-center justify-between gap-2 border-b-2 border-accent-yellow pb-2">
      {editing ? (
        <input
          ref={inputRef}
          data-testid="column-rename-input"
          className="w-full rounded border border-blue-primary bg-white px-2 py-1 text-sm font-semibold text-dark-navy outline-none focus:ring-2 focus:ring-blue-primary/30"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setValue(title);
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          type="button"
          data-testid="column-title"
          className="text-left text-sm font-semibold text-dark-navy hover:text-blue-primary transition-colors"
          onClick={startEditing}
        >
          {title}
        </button>
      )}
      <span
        data-testid="column-count"
        className="shrink-0 rounded-full bg-accent-yellow/20 px-2 py-0.5 text-xs font-medium text-dark-navy"
      >
        {cardCount}
      </span>
    </div>
  );
}
