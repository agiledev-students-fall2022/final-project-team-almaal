import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

import Home from './routes/Home'
import Friends from './routes/Friends'
import Groups from './routes/Groups'
import Profile from './routes/Profile';

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
          <Route path="/groups" element={<Groups />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
