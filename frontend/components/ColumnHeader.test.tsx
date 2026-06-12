import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColumnHeader } from "./ColumnHeader";

describe("ColumnHeader", () => {
  it("displays the column title and card count", () => {
    render(<ColumnHeader title="Backlog" cardCount={3} onRename={vi.fn()} />);
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
    expect(screen.getByTestId("column-count")).toHaveTextContent("3");
  });

  it("calls onRename when editing and pressing Enter", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<ColumnHeader title="Backlog" cardCount={0} onRename={onRename} />);

    await user.click(screen.getByTestId("column-title"));
    const input = screen.getByTestId("column-rename-input");
    await user.clear(input);
    await user.type(input, "Ideas{Enter}");

    expect(onRename).toHaveBeenCalledWith("Ideas");
  });
});
