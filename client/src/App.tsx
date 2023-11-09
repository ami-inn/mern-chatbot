import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Notfound from "./pages/Notfound";
import ParticlesBackground from "./components/ParticlesBackground";
import { useAuth } from "./context/AuthContext";

function App() {

  const auth = useAuth()
  
  return (
    <main>
      {/* <div className="particles-container">
        <ParticlesBackground />
      </div> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {auth?.isLoggedIn &&  auth.user && <Route path="/chat" element={<Chat />} />}
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </main>
  );
}

export default App;
