import { collection, getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import SampleLibraryFile from "../components/SampleLibraryFile";
import SamplePackSampleFile from "../components/SamplePackSampleFile";

function SamplePackDisplayPage({ samplePackToShow, db }) {
  const [theSamplePack, setTheSamplePack] = useState({});
  const [samples, setSamples] = useState([]);
  const [theUser, setTheUser] = useState({});

  const getData = async function () {
    // Get Sample Pack Data
    const samplePack = await getDoc(doc(db, "sample_packs", samplePackToShow));
    const samplePackData = samplePack.data();
    setTheSamplePack(samplePackData);

    // Get Samples Data
    let newSamples = [];
    for (let i = 0; i < samplePackData["samples"].length; i++) {
      const sampleRef = getDoc(
        doc(db, "samples", samplePackData["samples"][i])
      );
      newSamples.push((await sampleRef).data());
    }
    setSamples(newSamples);

    // Get User Data
    const userRef = await getDoc(doc(db, "users", samplePackData["userID"]));
    const theUser = userRef.data();
    setTheUser(theUser);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Title: {theSamplePack["packName"]}</h1>
      <h4>Created By: {theUser["email"]}</h4>
      <table className="sample_table">
        <thead>
          <tr>
            <th>Sample Name</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((sample, i) => (
            <SamplePackSampleFile key={i} sample={sample} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SamplePackDisplayPage;
