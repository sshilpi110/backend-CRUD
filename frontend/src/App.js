import './App.css';
import { Routes, Route } from "react-router-dom"
import Register from "./Component/register"
import Login from './Component/login';
import CreateNote from './Component/CreateNote';
import Note from './Component/Notes';
function App() {
  return (
    <div className="App">
      <h1>Notes App</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create" element={<CreateNote />}></Route>
        <Route path="/" element={<Note />}></Route>



      </Routes>
    </div>
  );
}

export default App;
