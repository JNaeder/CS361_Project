import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginPage({ auth }) {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = function (e) {
    e.preventDefault();
    console.log(auth);
    signInWithEmailAndPassword(auth, userName, password).then(
      (userCredential) => console.log(userCredential)
    );
  };

  const forgotPassword = function (e) {
    e.preventDefault();
  };

  const signUpButton = function (e) {
    e.preventDefault();
    navigation("/signup");
  };

  return (
    <>
      <h1>Sample Flip Friday</h1>
      <h3>Login Page</h3>
      <p>Login With Your User Credentials</p>
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
        <button type="submit" onClick={loginButton}>
          Login
        </button>
        <button type="submit" onClick={forgotPassword}>
          Forgot Password?
        </button>
        <button type="submit" onClick={signUpButton}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default LoginPage;
