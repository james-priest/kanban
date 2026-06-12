import type { Board } from "./types";

export function renameColumn(
  board: Board,
  columnId: string,
  title: string
): Board {
  return {
    ...board,
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, title } : col
    ),
  };
}

export function addCard(
  board: Board,
  columnId: string,
  title: string,
  details: string
): Board {
  const id = `card-${crypto.randomUUID()}`;
  const card = { id, title, details };

  return {
    ...board,
    cards: { ...board.cards, [id]: card },
    columns: board.columns.map((col) =>
      col.id === columnId ? { ...col, cardIds: [...col.cardIds, id] } : col
    ),
  };
}

export function deleteCard(board: Board, cardId: string): Board {
  const remainingCards = { ...board.cards };
  delete remainingCards[cardId];

  return {
    cards: remainingCards,
    columns: board.columns.map((col) => ({
      ...col,
      cardIds: col.cardIds.filter((id) => id !== cardId),
    })),
  };
}

export function moveCard(
  board: Board,
  cardId: string,
  fromColumnId: string,
  toColumnId: string,
  toIndex: number
): Board {
  if (fromColumnId === toColumnId) {
    return {
      ...board,
      columns: board.columns.map((col) => {
        if (col.id !== fromColumnId) return col;
        const newCardIds = [...col.cardIds];
        const fromIndex = newCardIds.indexOf(cardId);
        if (fromIndex === -1) return col;
        newCardIds.splice(fromIndex, 1);
        newCardIds.splice(toIndex, 0, cardId);
        return { ...col, cardIds: newCardIds };
      }),
    };
  }

  return {
    ...board,
    columns: board.columns.map((col) => {
      if (col.id === fromColumnId) {
        return {
          ...col,
          cardIds: col.cardIds.filter((id) => id !== cardId),
        };
      }
      if (col.id === toColumnId) {
        const newCardIds = [...col.cardIds];
        newCardIds.splice(toIndex, 0, cardId);
        return { ...col, cardIds: newCardIds };
      }
      return col;
    }),
  };
}
