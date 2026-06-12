import { describe, it, expect } from "vitest";
import type { Board } from "./types";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
} from "./board-actions";

const testBoard: Board = {
  columns: [
    { id: "col-1", title: "Backlog", cardIds: ["card-1", "card-2"] },
    { id: "col-2", title: "Done", cardIds: ["card-3"] },
    { id: "col-3", title: "Empty", cardIds: [] },
    { id: "col-4", title: "Col4", cardIds: [] },
    { id: "col-5", title: "Col5", cardIds: [] },
  ],
  cards: {
    "card-1": { id: "card-1", title: "First", details: "A" },
    "card-2": { id: "card-2", title: "Second", details: "B" },
    "card-3": { id: "card-3", title: "Third", details: "C" },
  },
};

describe("renameColumn", () => {
  it("renames the target column", () => {
    const result = renameColumn(testBoard, "col-1", "Ideas");
    expect(result.columns[0].title).toBe("Ideas");
    expect(result.columns[1].title).toBe("Done");
  });
});

describe("addCard", () => {
  it("adds a card to the specified column", () => {
    const result = addCard(testBoard, "col-1", "New card", "Details here");
    const newId = result.columns[0].cardIds.at(-1)!;
    expect(result.cards[newId]).toEqual({
      id: newId,
      title: "New card",
      details: "Details here",
    });
    expect(result.columns[0].cardIds).toContain(newId);
  });
});

describe("deleteCard", () => {
  it("removes the card from board and all columns", () => {
    const result = deleteCard(testBoard, "card-2");
    expect(result.cards["card-2"]).toBeUndefined();
    expect(result.columns[0].cardIds).toEqual(["card-1"]);
  });
});

describe("moveCard", () => {
  it("moves a card to another column at the given index", () => {
    const result = moveCard(testBoard, "card-1", "col-1", "col-2", 0);
    expect(result.columns[0].cardIds).toEqual(["card-2"]);
    expect(result.columns[1].cardIds).toEqual(["card-1", "card-3"]);
  });

  it("reorders within the same column", () => {
    const result = moveCard(testBoard, "card-1", "col-1", "col-1", 1);
    expect(result.columns[0].cardIds).toEqual(["card-2", "card-1"]);
  });

  it("moves a card to an empty column", () => {
    const result = moveCard(testBoard, "card-1", "col-1", "col-3", 0);
    expect(result.columns[0].cardIds).toEqual(["card-2"]);
    expect(result.columns[2].cardIds).toEqual(["card-1"]);
  });
});
