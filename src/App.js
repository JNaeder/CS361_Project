// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

function App() {
  return (
    <>
      <h1>Sample Flip Friday</h1>
    </>
  );
}

export default App;
