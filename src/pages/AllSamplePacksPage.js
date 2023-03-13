import { httpsCallable } from "firebase/functions";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import SamplePackPageFile from "../components/SamplePackPageFile";

function AllSamplePacksPage({ functions, db, auth, setSamplePackToShow }) {
  const samplePackDB = collection(db, "sample_packs");

  const [allSamplePacks, setAllSamplePacks] = useState([]);
  const getAllPacks = async () => {
    const packs = await getDocs(samplePackDB);
    const allPacks = [];
    packs.forEach((pack) => allPacks.push(pack));
    setAllSamplePacks(allPacks);
    // setAllSamplePacks(packs);
  };

  useEffect(() => {
    getAllPacks();
  }, []);

  const generateSamplePackFunction = httpsCallable(
    functions,
    "generateSamplePack"
  );

  const generatePack = async function () {
    const docRef = await generateSamplePackFunction(auth.currentUser.uid);
    console.log(`Generated Sample pack with ID ${docRef.data}`);
    getAllPacks();
  };
  return (
    <>
      <div className="page_top_bar">
        <h1>Sample Packs</h1>
        <button onClick={generatePack}>Generate Sample Pack</button>
      </div>
      <div>
        {allSamplePacks.map((samplePack, i) => (
          <SamplePackPageFile
            key={i}
            samplePack={samplePack}
            db={db}
            setSamplePackToShow={setSamplePackToShow}
          />
        ))}
      </div>
    </>
  );
}

export default AllSamplePacksPage;
