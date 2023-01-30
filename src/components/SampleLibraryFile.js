import { deleteDoc } from "firebase/firestore";

function SampleLibraryFile({ sampleRaw, auth, advancedClassName }) {
  const sample = sampleRaw.data();
  const deleteFile = () => {
    deleteDoc(sampleRaw["ref"]);
    window.location.reload();
  };

  return (
    <>
      <tr>
        <td>{sample["sampleName"]}</td>
        <td>{sample["category"]}</td>
        <td className={advancedClassName}>{sample["author"]}</td>
        <td className={advancedClassName}>{sample["year"]}</td>
        <td className={advancedClassName}>{sample["userEmail"]}</td>
        <td>
          <audio controls>
            <source src={sample["filePath"]} />
          </audio>
        </td>
        <td>
          {sample["userID"] == auth.currentUser.uid ? (
            <button onClick={deleteFile}>Delete</button>
          ) : (
            ""
          )}
        </td>
      </tr>
    </>
  );
}

export default SampleLibraryFile;
