import { signOut } from "firebase/auth";

function Navigation({ auth }) {
  const signOutUser = function () {
    signOut(auth);
  };

  const emailHelp = function (e) {
    e.preventDefault();
    window.open(`mailto:naederj@oregonstate.edu?subject=Questions`);
  };

  return (
    <nav>
      <button onClick={emailHelp}>Questions?</button>
      <h1>Sample Flip Friday</h1>
      <button onClick={signOutUser}>Sign Out</button>
    </nav>
  );
}

export default Navigation;
