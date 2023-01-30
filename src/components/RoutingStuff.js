import { Route, Routes } from "react-router-dom";
import SampleLibraryPage from "../pages/SampleLibraryPage";
import SampleUploadPage from "../pages/SampleUploadPage";
import Navigation from "./Navigation";

function RoutingStuff({ db, storage, auth }) {
  return (
    <>
      <Navigation auth={auth} />
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
