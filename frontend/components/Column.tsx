"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Card as CardType, Column as ColumnType } from "@/lib/types";
import { AddCardForm } from "./AddCardForm";
import { Card } from "./Card";
import { ColumnHeader } from "./ColumnHeader";

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      data-testid={`column-${column.id}`}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-column-bg p-3"
    >
      <ColumnHeader
        title={column.title}
        cardCount={cards.length}
        onRename={(title) => onRename(column.id, title)}
      />
      <div
        ref={setNodeRef}
        data-testid={`column-drop-${column.id}`}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 rounded-lg transition-colors ${
          isOver ? "bg-blue-primary/5 ring-2 ring-blue-primary/20" : ""
        }`}
      >
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.length === 0 ? (
            <p className="py-4 text-center text-xs text-gray-text">
              Drop cards here
            </p>
          ) : (
            cards.map((card) => (
              <Card key={card.id} card={card} onDelete={onDeleteCard} />
            ))
          )}
        </SortableContext>
      </div>
      <AddCardForm onAdd={(title, details) => onAddCard(column.id, title, details)} />
    </div>
  );
}
