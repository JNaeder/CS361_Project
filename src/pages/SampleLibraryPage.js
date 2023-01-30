import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import SampleLibraryFile from "../components/SampleLibraryFile";

function SampleLibraryPage({ db, auth }) {
  const navigate = useNavigate();
  const sampleCollection = collection(db, "samples");
  const [allSamples, setAllSamples] = useState([]);
  const [settingsStatus, setSettingsStatus] = useState(false);
  const [advancedClassName, setAdvancedClassName] = useState("");

  useEffect(() => {
    const getData = async function () {
      const rawData = await getDocs(sampleCollection);
      const output = [];
      rawData.forEach((doc) => output.push(doc));
      setAllSamples(output);
    };

    getData();
  }, []);

  const changeSettings = () => {
    if (settingsStatus) {
      setAdvancedClassName("");
    } else {
      setAdvancedClassName("hide");
    }
  };

  useEffect(() => {
    changeSettings();
  }, [settingsStatus]);

  return (
    <>
      <div>
        <h3>Sample Library Page</h3>
      </div>
      <div className="settings_slider">
        <label>Basic/Advanced</label>
        <label className="switch">
          <input
            type="checkbox"
            onChange={(e) => setSettingsStatus(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <table className="sample_table">
        <thead>
          <tr>
            <th>Sample Name</th>
            <th>Category</th>
            <th className={advancedClassName}>Author</th>
            <th className={advancedClassName}>Year</th>
            <th className={advancedClassName}>Uploaded By</th>
            <th>Play</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allSamples.map((sample, i) => (
            <SampleLibraryFile
              sampleRaw={sample}
              key={i}
              auth={auth}
              advancedClassName={advancedClassName}
            />
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
