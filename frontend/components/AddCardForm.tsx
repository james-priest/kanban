"use client";

import { useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle, details.trim());
    setTitle("");
    setDetails("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        data-testid="add-card-trigger"
        className="mt-2 w-full rounded-lg border border-dashed border-blue-primary/40 py-2 text-sm font-medium text-blue-primary transition-colors hover:border-blue-primary hover:bg-blue-primary/5"
        onClick={() => setOpen(true)}
      >
        + Add card
      </button>
    );
  }

  return (
    <form
      data-testid="add-card-form"
      className="mt-2 space-y-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
      onSubmit={handleSubmit}
    >
      <input
        data-testid="add-card-title"
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm text-dark-navy outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        data-testid="add-card-details"
        className="w-full resize-none rounded border border-gray-200 px-2 py-1.5 text-sm text-gray-text outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="add-card-submit"
          className="rounded bg-purple-secondary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-secondary/90"
        >
          Add
        </button>
        <button
          type="button"
          data-testid="add-card-cancel"
          className="rounded px-3 py-1.5 text-sm text-gray-text transition-colors hover:bg-gray-100"
          onClick={() => {
            setOpen(false);
            setTitle("");
            setDetails("");
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
