import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCardForm } from "./AddCardForm";

describe("AddCardForm", () => {
  it("opens the form when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<AddCardForm onAdd={vi.fn()} />);

    await user.click(screen.getByTestId("add-card-trigger"));
    expect(screen.getByTestId("add-card-form")).toBeInTheDocument();
  });

  it("submits with title and details", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);

    await user.click(screen.getByTestId("add-card-trigger"));
    await user.type(screen.getByTestId("add-card-title"), "New task");
    await user.type(screen.getByTestId("add-card-details"), "Some details");
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).toHaveBeenCalledWith("New task", "Some details");
  });

  it("does not submit with empty title", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);

    await user.click(screen.getByTestId("add-card-trigger"));
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).not.toHaveBeenCalled();
  });
});
