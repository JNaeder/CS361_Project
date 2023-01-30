import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import SampleLibraryFile from "../components/SampleLibraryFile";

function SampleLibraryPage({ db }) {
  const navigate = useNavigate();
  const sampleCollection = collection(db, "samples");
  const [allSamples, setAllSamples] = useState([]);

  useEffect(() => {
    const getData = async function () {
      const rawData = await getDocs(sampleCollection);
      const output = [];
      rawData.forEach((doc) => output.push(doc.data()));
      setAllSamples(output);
    };

    getData();
  }, []);

  return (
    <>
      <div>
        <h3>Sample Library Page</h3>
      </div>
      <table className="sample_table">
        <thead>
          <tr>
            <th>Sample Name</th>
            <th>Category</th>
            <th>Length</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {allSamples.map((sample, i) => (
            <SampleLibraryFile sample={sample} key={i} />
          ))}
        </tbody>
      </table>
      <div className="upload_container">
        <p>Upload your own samples!</p>
        <button onClick={() => navigate("/sampleupload")}>Upload</button>
      </div>
    </>
  );
}

export default SampleLibraryPage;
