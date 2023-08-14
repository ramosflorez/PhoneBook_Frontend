import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacts from './components/Contacts';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts></Contacts>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
