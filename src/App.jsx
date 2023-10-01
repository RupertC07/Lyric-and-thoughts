import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./shared/layouts/MainLayout";

import { Lyric } from "./pages/Lyric";
import { NotFound } from "./pages/404";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/Page1" element={<Lyric />} />
          <Route path="/rt/:title" element={<Lyric />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
