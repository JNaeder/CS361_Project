import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function SampleUploadPage({ db, storage, auth }) {
  const navigation = useNavigate();
  const sampleCollection = collection(db, "samples");

  const [settingsStatus, setSettingsStatus] = useState(false);
  const [advancedClassName, setAdvancedClassName] = useState("General");
  // Sample Details
  const [theFile, setTheFile] = useState([]);
  const [sampleName, setSampleName] = useState("");
  const [sampleCatagory, setSampleCatagory] = useState("General");
  const [sampleAuthor, setSampleAuthor] = useState("");
  const [sampleYear, setSampleYear] = useState("");

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

  const setNewFile = function (e) {
    const newFile = e.target.files[0];
    setTheFile(newFile);
    console.log(newFile["name"]);
    setSampleName(newFile["name"]);
  };

  const uploadFile = async function (e) {
    e.preventDefault();
    const fileRef = ref(storage, theFile["name"]);
    await uploadBytes(fileRef, theFile).then((snapshot) => {
      console.log(snapshot);
    });
    const url = await getDownloadURL(fileRef);

    const sampleInfo = {
      sampleName: sampleName,
      length: "0:05",
      category: sampleCatagory,
      author: sampleAuthor,
      year: sampleYear,
      filePath: url,
      userID: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
    };

    const docRef = await addDoc(sampleCollection, sampleInfo);
    console.log(`Wrote doc ${docRef.id}`);

    navigation("/");
  };

  return (
    <>
      <h1>Sample Upload</h1>
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

      <div className="button_container">
        <button onClick={uploadFile}>Upload Sample</button>
        <button onClick={() => navigation("/")}>Cancel</button>
      </div>

      <form className="upload_form">
        <label htmlFor="fileUpload">Choose File</label>
        <input type="file" name="fileUpload" onChange={setNewFile} />
        <label htmlFor="sampleName">Sample Name</label>
        <input
          type="text"
          name="sampleName"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
        />
        <label htmlFor="catagory">Catagory</label>
        <select
          name="catagory"
          onChange={(e) => setSampleCatagory(e.target.value)}
        >
          <option>General</option>
          <option>Drums</option>
          <option>Bass</option>
          <option>Chords</option>
          <option>Melody</option>
          <option>Vocals</option>
          <option>Other</option>
        </select>
        <div className={advancedClassName + " advanced_form"}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            onChange={(e) => setSampleAuthor(e.target.value)}
          />
          <label htmlFor="year">Year</label>
          <input
            type="text"
            name="year"
            onChange={(e) => setSampleYear(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default SampleUploadPage;
