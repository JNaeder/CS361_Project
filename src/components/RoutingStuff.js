import { Route, Routes } from "react-router-dom";
import SampleLibraryPage from "../pages/SampleLibraryPage";
import SampleUploadPage from "../pages/SampleUploadPage";

function RoutingStuff({ db, storage }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<SampleLibraryPage db={db} storage={storage} />}
        />
        <Route
          path="/sampleupload"
          element={<SampleUploadPage db={db} storage={storage} />}
        />
      </Routes>
    </>
  );
}

export default RoutingStuff;
