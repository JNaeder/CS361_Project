import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigation = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
        <button type="submit">Sign Up</button>
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
