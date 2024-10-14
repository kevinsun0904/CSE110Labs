import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { useContext, useState } from "react";
import ToggleTheme from "./hooksExercise";
import { ThemeContext, themes } from "./themeContext";

const StickyNotes = () => {
  const [likeMap, setLikeMap] = useState<any>({});

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const onHeartClick = (title: string) => {
    const likeMapCopy = { ...likeMap };
    likeMapCopy[title] = !likeMap[title];
    setLikeMap(likeMapCopy);
  };

  const onNoteSelect = (note: Note) => {
    setSelectedNote(note);
    console.log(selectedNote);
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event?.preventDefault();
    setNotes([...notes, createNote]);
  };

  const onNoteDelete = (deleteNote: Note) => {
    const filteredNotes = notes.filter((note) => note !== deleteNote);
    setNotes(filteredNotes);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div>
        <div className="app-container">
          <ToggleTheme setCurrentTheme={setCurrentTheme}></ToggleTheme>
          <form onSubmit={createNoteHandler}>
            <div>
              <input
                placeholder="Note Title"
                onChange={(event) =>
                  setCreateNote({ ...createNote, title: event.target.value })
                }
                required
              ></input>
            </div>

            <div>
              <textarea
                onChange={(event) =>
                  setCreateNote({ ...createNote, content: event.target.value })
                }
                required
              ></textarea>
            </div>

            <div>
              <select
                onChange={(event) =>
                  setCreateNote({
                    ...createNote,
                    label: event.target.value as Label,
                  })
                }
                required
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>

            <div>
              <button type="submit">Create Note</button>
            </div>
          </form>
          <div className="notes-grid">
            {notes.map((note) => {
              return (
                <div
                  key={note.id}
                  className="note-item"
                  onClick={() => onNoteSelect(note)}
                  style={{
                    background: currentTheme.background,
                    color: currentTheme.foreground,
                  }}
                >
                  <div className="notes-header">
                    <button onClick={() => onHeartClick(note.title)}>
                      {likeMap[note.title] ? "❤️" : "🤍"}
                    </button>
                    <button
                      style={{
                        background: currentTheme.foreground,
                        color: currentTheme.background,
                      }}
                      onClick={() => onNoteDelete(note)}
                    >
                      x
                    </button>
                  </div>
                  <h2 contentEditable> {note.title} </h2>
                  <p contentEditable> {note.content} </p>
                  <p contentEditable> {note.label} </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="favorites-container">
          <h3>List of Favorites:</h3>
          <div className="favorites-list">
            {Object.keys(likeMap).map((title: string) => {
              if (likeMap[title]) {
                return <p>{title}</p>;
              }
              return <></>;
            })}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default StickyNotes;
