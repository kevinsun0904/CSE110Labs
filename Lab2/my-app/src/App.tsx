import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { useContext, useState } from "react";
import ToggleTheme from "./hooksExercise";
import { ThemeContext, themes } from "./themeContext";

function App() {
  const [likeMap, setLikeMap] = useState<any>({});

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const onHeartClick = (title: string) => {
    const likeMapCopy = {...likeMap}
    likeMapCopy[title] = !likeMap[title];
    setLikeMap(likeMapCopy);
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
    <div>
      <div className="app-container">
        <ToggleTheme setCurrentTheme={setCurrentTheme}></ToggleTheme>
        <form>
          <div>
            <input placeholder="Note Title"></input>
          </div>

          <div>
            <textarea></textarea>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>
        <div className="notes-grid">
          {dummyNotesList.map((note) => {
            return (
              <div key={note.id} className="note-item" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
                <div className="notes-header">
                  <button onClick={() => onHeartClick(note.title)}>{likeMap[note.title] ? "❤️" : "🤍"}</button>
                  <button style={{ background: currentTheme.foreground, color: currentTheme.background }} >x</button>
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
              </div>)
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
}

export default App;
