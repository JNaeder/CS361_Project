function SampleLibraryFile({ sample }) {
  return (
    <>
      <tr>
        <td>{sample["sampleName"]}</td>
        <td>{sample["category"]}</td>
        <td>{sample["length"]}</td>
        <td>
          <audio controls>
            <source src={sample["filePath"]} />
          </audio>
        </td>
      </tr>
    </>
  );
}

export default SampleLibraryFile;
