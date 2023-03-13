import { signOut } from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navigation({ auth, db }) {
  const navigation = useNavigate();
  const userDB = collection(db, "users");
  const currentUser = auth.currentUser;
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const getUserProfile = async function () {
        const newProfile = await getDoc(doc(userDB, currentUser["uid"]));
        setUserProfile(newProfile.data());
      };

      getUserProfile();
    }
  }, [currentUser]);

  const signOutUser = function () {
    signOut(auth);
  };

  const emailHelp = function (e) {
    e.preventDefault();
    window.open(`mailto:naederj@oregonstate.edu?subject=Questions`);
  };

  return (
    <nav>
      <div>
        <button onClick={() => navigation("/")}>Home</button>
        <button onClick={() => navigation("/samplelibrary")}>
          Sample Library
        </button>
        <button onClick={() => navigation("/samplepacks")}>Sample Packs</button>
      </div>
      <h1 className="main_title">Sample Flip Friday</h1>
      <div className="user_profile">
        <img
          src={userProfile ? userProfile["avatar"] : ""}
          className="avatar_image"
        />
        <h2>{userProfile ? userProfile["email"] : ""}</h2>
      </div>
      <button onClick={signOutUser}>Sign Out</button>
      <button onClick={emailHelp}>Questions?</button>
    </nav>
  );
}

export default Navigation;
