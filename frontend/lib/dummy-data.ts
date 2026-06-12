import type { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    { id: "col-1", title: "Backlog", cardIds: ["card-1", "card-2", "card-3"] },
    { id: "col-2", title: "Ready", cardIds: ["card-4", "card-5"] },
    { id: "col-3", title: "In Progress", cardIds: ["card-6", "card-7"] },
    { id: "col-4", title: "Review", cardIds: ["card-8"] },
    { id: "col-5", title: "Done", cardIds: ["card-9", "card-10"] },
  ],
  cards: {
    "card-1": {
      id: "card-1",
      title: "Design system audit",
      details: "Review color tokens and component spacing across the app.",
    },
    "card-2": {
      id: "card-2",
      title: "User research synthesis",
      details: "Compile findings from five stakeholder interviews.",
    },
    "card-3": {
      id: "card-3",
      title: "API contract draft",
      details: "Define endpoints for board, column, and card operations.",
    },
    "card-4": {
      id: "card-4",
      title: "Sprint planning",
      details: "Prioritize backlog items for the next two-week sprint.",
    },
    "card-5": {
      id: "card-5",
      title: "Accessibility review",
      details: "Run axe checks on the main board view.",
    },
    "card-6": {
      id: "card-6",
      title: "Drag and drop implementation",
      details: "Integrate dnd-kit for card movement between columns.",
    },
    "card-7": {
      id: "card-7",
      title: "Column rename UX",
      details: "Inline editing with keyboard support and blur save.",
    },
    "card-8": {
      id: "card-8",
      title: "E2E test suite",
      details: "Playwright tests covering add, delete, rename, and drag flows.",
    },
    "card-9": {
      id: "card-9",
      title: "Project scaffolding",
      details: "Next.js app with Tailwind and brand color tokens.",
    },
    "card-10": {
      id: "card-10",
      title: "Dummy data setup",
      details: "Seed board with realistic sample cards on first load.",
    },
  },
};
