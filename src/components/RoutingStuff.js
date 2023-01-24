import { Route, Routes } from "react-router-dom";
import SampleLibraryPage from "../pages/SampleLibraryPage";

function RoutingStuff() {
  return (
    <>
      <Routes>
        <Route path="/" element={SampleLibraryPage} />
      </Routes>
    </>
  );
}

export default RoutingStuff;
