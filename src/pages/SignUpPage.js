import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

function SignUpPage({ db, auth }) {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const getAvatar = async function () {
    const response = await fetch(
      "https://cs361-avatar-microservice.onrender.com/random"
    );
    const output = await response.json();
    return output["url"];
  };

  const signUpUser = async function (e) {
    e.preventDefault();
    const userDB = collection(db, "users");

    // ----- Input Validation -----
    // Check if email or password is empty
    if (!userName || !password) {
      alert("email or password is blank");
      return;
    }
    // Check if passwords don't match
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    const userResponse = await createUserWithEmailAndPassword(
      auth,
      userName,
      password
    );
    auth.signOut();

    const newUser = userResponse["user"];
    const photoURL = await getAvatar();

    const userData = {
      email: newUser["email"],
      avatar: photoURL,
    };

    alert("User Created!");

    const newDoc = doc(userDB, newUser["uid"]);
    const docResponse = await setDoc(newDoc, userData);
    navigation("/");
  };

  return (
    <>
      <h3>Signup Page</h3>
      <form className="form_container">
        <div className="form_input">
          <label htmlFor="user_name">Email</label>
          <input
            type="email"
            name="user_name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form_input">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button type="submit" onClick={signUpUser}>
          Sign Up
        </button>
        <div>
          <p>Have a login already?</p>
          <button type="submit" onClick={() => navigation("/")}>
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpPage;
