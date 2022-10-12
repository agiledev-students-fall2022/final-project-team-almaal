import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

import Home from './routes/Home'
import Friends from './routes/Friends'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
