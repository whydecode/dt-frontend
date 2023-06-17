import "./App.css";
import Navbar from "./components/Navbar";

import StoryBoard from "./screens/StoryBoard";
function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <StoryBoard />
      </div>
    </>
  );
}

export default App;
