import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import RoutingStuff from "./components/RoutingStuff";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);

function App() {
  const [currentUser, setCurrentUser] = useState({});

  onAuthStateChanged(auth, () => {
    setCurrentUser(auth.currentUser);
  });

  console.log(currentUser);

  return (
    <>
      <BrowserRouter>
        <RoutingStuff />
      </BrowserRouter>
    </>
  );
}

export default App;
