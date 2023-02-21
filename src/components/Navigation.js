import { signOut } from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Navigation({ auth, db }) {
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
      <button onClick={emailHelp}>Questions?</button>
      <h1>Sample Flip Friday</h1>
      <div className="user_profile">
        <img
          src={userProfile ? userProfile["avatar"] : ""}
          className="avatar_image"
        />
        <h2>{userProfile ? userProfile["email"] : "blank user"}</h2>
      </div>
      <button onClick={signOutUser}>Sign Out</button>
    </nav>
  );
}

export default Navigation;
