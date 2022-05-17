import './App.css';
import NameCard from './pages/NameCard';
import Whoops404 from './pages/Whoops404'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:memberName" element={<NameCard/>}/>
        <Route path="*" element={<Whoops404/>}/>
      </Routes>
    </div>
  );
}

export default App;
