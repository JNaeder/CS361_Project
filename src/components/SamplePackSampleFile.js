function SamplePackSampleFile({ sample }) {
  return (
    <>
      <tr>
        <td>{sample["sampleName"]}</td>
        <td>
          <audio controls>
            <source src={sample["filePath"]} />
          </audio>
        </td>
      </tr>
    </>
  );
}

export default SamplePackSampleFile;
