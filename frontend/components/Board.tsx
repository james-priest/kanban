"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Board as BoardType } from "@/lib/types";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
} from "@/lib/board-actions";
import { Column } from "./Column";

type BoardProps = {
  initialBoard: BoardType;
};

function findColumnByCardId(board: BoardType, cardId: string) {
  return board.columns.find((col) => col.cardIds.includes(cardId));
}

export function Board({ initialBoard }: BoardProps) {
  const [board, setBoard] = useState(initialBoard);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeCard = activeCardId ? board.cards[activeCardId] : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveCardId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCardId(null);

    if (!over) return;

    const cardId = String(active.id);
    const fromColumn = findColumnByCardId(board, cardId);
    if (!fromColumn) return;

    let toColumnId: string;
    let toIndex: number;

    const overId = String(over.id);
    const overColumn = board.columns.find((col) => col.id === overId);

    if (overColumn) {
      toColumnId = overColumn.id;
      toIndex = overColumn.cardIds.length;
    } else {
      const overCardColumn = findColumnByCardId(board, overId);
      if (!overCardColumn) return;

      toColumnId = overCardColumn.id;
      toIndex = overCardColumn.cardIds.indexOf(overId);
      if (toIndex === -1) toIndex = overCardColumn.cardIds.length;
    }

    if (fromColumn.id === toColumnId) {
      const oldIndex = fromColumn.cardIds.indexOf(cardId);
      if (oldIndex === toIndex || oldIndex === toIndex - 1) return;
      if (oldIndex < toIndex) toIndex -= 1;
    }

    setBoard((prev) =>
      moveCard(prev, cardId, fromColumn.id, toColumnId, toIndex)
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        data-testid="board"
        className="flex gap-4 overflow-x-auto pb-4"
      >
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            cards={column.cardIds.map((id) => board.cards[id]).filter(Boolean)}
            onRename={(columnId, title) =>
              setBoard((prev) => renameColumn(prev, columnId, title))
            }
            onAddCard={(columnId, title, details) =>
              setBoard((prev) => addCard(prev, columnId, title, details))
            }
            onDeleteCard={(cardId) =>
              setBoard((prev) => deleteCard(prev, cardId))
            }
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard ? (
          <div className="rotate-2 scale-105 rounded-lg border border-blue-primary/30 bg-card-bg p-3 shadow-xl">
            <h3 className="text-sm font-semibold text-dark-navy">
              {activeCard.title}
            </h3>
            {activeCard.details && (
              <p className="mt-1 text-xs text-gray-text">{activeCard.details}</p>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
