import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function SampleUploadPage({ db, storage }) {
  const sampleCollection = collection(db, "samples");

  const [sampleName, setSampleName] = useState("");
  const [theFile, setTheFile] = useState([]);

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
      category: "something",
      filePath: url,
    };

    const docRef = await addDoc(sampleCollection, sampleInfo);
    console.log(`Wrote doc ${docRef.id}`);
  };

  return (
    <>
      <h1>Sample Upload</h1>

      <form>
        <label htmlFor="fileUpload">Choose File</label>
        <input
          type="file"
          name="fileUpload"
          onChange={(e) => setTheFile(e.target.files[0])}
        />
        <label htmlFor="sampleName">Sample Name</label>
        <input
          type="text"
          name="sampleName"
          onChange={(e) => setSampleName(e.target.value)}
        />

        <button onClick={uploadFile}>Upload</button>
      </form>
    </>
  );
}

export default SampleUploadPage;
