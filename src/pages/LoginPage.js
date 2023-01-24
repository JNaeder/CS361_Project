import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage({ auth }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginButton = function (e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, password).then(
      (userCredential) => console.log(userCredential)
    );
  };

  return (
    <>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="user_name">User Name</label>
        <input
          type="email"
          name="user_name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={loginButton}>
          Login
        </button>
      </form>
    </>
  );
}

export default LoginPage;
