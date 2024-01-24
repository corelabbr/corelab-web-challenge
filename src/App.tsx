import './styles/global.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/HomePage'
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
