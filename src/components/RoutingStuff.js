import { Route, Routes } from "react-router-dom";
import SampleLibraryPage from "../pages/SampleLibraryPage";
import SampleUploadPage from "../pages/SampleUploadPage";
import Navigation from "./Navigation";
import AllSamplePacksPage from "../pages/AllSamplePacksPage";
import HomePage from "../pages/HomePage";
import { useState } from "react";
import SamplePackDisplayPage from "../pages/SamplePackDisplayPage";

function RoutingStuff({ db, storage, auth, functions }) {
  const [samplePackToShow, setSamplePackToShow] = useState();

  return (
    <>
      <Navigation auth={auth} db={db} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/samplelibrary"
          element={<SampleLibraryPage db={db} auth={auth} />}
        />
        <Route
          path="/sampleupload"
          element={<SampleUploadPage db={db} storage={storage} auth={auth} />}
        />
        <Route
          path="/samplepacks"
          element={
            <AllSamplePacksPage
              functions={functions}
              db={db}
              auth={auth}
              setSamplePackToShow={setSamplePackToShow}
            />
          }
        />
        <Route
          path="/samplepackdisplay"
          element={
            <SamplePackDisplayPage
              samplePackToShow={samplePackToShow}
              db={db}
            />
          }
        />
      </Routes>
    </>
  );
}

export default RoutingStuff;
