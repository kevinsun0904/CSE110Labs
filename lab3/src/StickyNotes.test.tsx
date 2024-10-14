import { render, screen, fireEvent } from "@testing-library/react";
import StickyNotes from "./StickyNotes";
import { dummyNotesList } from "./constants";
import { Note } from "./types";

describe("test sticky notes", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("renders all dummy notes", () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((dummyNote: Note) => {
      const noteTitle = screen.getByText(dummyNote.title);
      const noteContent = screen.getByText(dummyNote.content);
      expect(noteTitle).toBeInTheDocument();
      expect(noteContent).toBeInTheDocument();
    });
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("updates a note", () => {
    render(<StickyNotes />);

    const noteTitle = screen.getByText("test note 2 title");
    fireEvent.change(noteTitle, {
      target: { innerHTML: "test note 2 title update" },
    });

    const updateNoteTitle = screen.getByText("test note 2 title update");
    expect(updateNoteTitle).toBeInTheDocument();
  });

  test("delete a note", () => {
    render(<StickyNotes />);

    const note = dummyNotesList[2];

    const deleteButton = screen.getByTestId(`${note.id}-button`);
    fireEvent.click(deleteButton);

    const deleteNoteTitle = screen.queryByText(note.title);

    expect(deleteNoteTitle).toBeNull();
  });
});
