import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import RoutingStuff from "./components/RoutingStuff";
import SignUpPage from "./pages/SignUpPage";

const firebaseConfig = {
  apiKey: "AIzaSyA2ABbS8WfN0HGraMfBn3wbA8xNZsw1ido",
  authDomain: "cs361-project-2c0f9.firebaseapp.com",
  projectId: "cs361-project-2c0f9",
  storageBucket: "cs361-project-2c0f9.appspot.com",
  messagingSenderId: "336343136704",
  appId: "1:336343136704:web:4c2fa72ed941438b9df025",
  measurementId: "G-1JMNBJY3GL",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

function App() {
  const [currentUser, setCurrentUser] = useState({});

  onAuthStateChanged(auth, () => {
    setCurrentUser(auth.currentUser);
  });

  return (
    <div className="App">
      <BrowserRouter>
        {currentUser ? (
          <RoutingStuff
            db={db}
            storage={storage}
            auth={auth}
            functions={functions}
          />
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage auth={auth} />} />
            <Route
              path="/signup"
              element={<SignUpPage db={db} auth={auth} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
