import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SamplePackPageFile({ samplePack, db, setSamplePackToShow }) {
  const userDB = collection(db, "users");

  const [samplePackData, setSamplePackData] = useState(samplePack.data());
  const [theUser, setTheUser] = useState({});
  const navigation = useNavigate();

  const openSamplePack = function () {
    console.log(`Open Sample Pack ${samplePack.id}`);
    setSamplePackToShow(samplePack.id);
    navigation("/samplepackdisplay");
  };
  const getData = async function () {
    const theUser = await getDoc(doc(userDB, samplePackData["userID"]));
    setTheUser(theUser.data());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="sample_pack_page_file">
        <img src={theUser["avatar"]} className="avatar_sample_pack_image" />
        <h3>Pack Name: {samplePackData["packName"]}</h3>
        <button onClick={openSamplePack}>View Pack</button>
      </div>
    </>
  );
}

export default SamplePackPageFile;
