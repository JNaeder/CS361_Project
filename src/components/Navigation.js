import { signOut } from "firebase/auth";

function Navigation({ auth }) {
  const signOutUser = function () {
    signOut(auth);
  };

  return (
    <nav>
      <h1>Sample Flip Friday</h1>
      <button onClick={signOutUser}>Sign Out</button>
    </nav>
  );
}

export default Navigation;
