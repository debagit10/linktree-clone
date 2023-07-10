import "./App.css";
import Homepage from "./Pages/Homepage";
import Linkpage from "./Pages/Linkpage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/links" Component={Linkpage} />
      </Routes>
    </div>
  );
}

export default App;
