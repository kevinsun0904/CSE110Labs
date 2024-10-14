import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";
import { GroceryItem } from "./types";
import { ToDoList } from "./toDoList";

describe("test todo list", () => {
  test("renders all dummy groceries", () => {
    render(<ToDoList />);

    dummyGroceryList.forEach((dummyGrocery: GroceryItem) => {
      const groceryName = screen.getByText(dummyGrocery.name);
      expect(groceryName).toBeInTheDocument();
    });
  });

  test("checks number of checked items", () => {
    render(<ToDoList />);

    let itemsBought = screen.getByText("Items bought: 0");
    expect(itemsBought).toBeInTheDocument();

    const item = dummyGroceryList[1];
    const checkbox = screen.getByTestId(`${item.name}-checkbox`);
    fireEvent.click(checkbox);

    itemsBought = screen.getByText("Items bought: 1");
    expect(itemsBought).toBeInTheDocument();
  });
});
