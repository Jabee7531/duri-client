import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import Read from "./pages/read/Read";
import Regist from "./pages/regist/Regist";
import Search from "./pages/search/Search";
import Test from "./pages/Test/Test";
import Writer from "./pages/writer/Writer";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<AppLayout.HeaderLayout />}>
          <Route element={<AppLayout.FloatingHeaderLayout />}>
            <Route element={<AppLayout.Main />}>
              <Route index element={<Home />} />
              <Route path="/post" element={<Post />} />
            </Route>
          </Route>
          <Route element={<AppLayout.Main2 />}>
            <Route path="/search" element={<Search />} />
            <Route path="/post/read/:id" element={<Read />} />
          </Route>
        </Route>
        <Route path="/regist" element={<Regist />} />
        <Route path="/writer" element={<Writer />} />
        <Route path="/editor" element={<Writer />} />
      </Route>
      <Route path="*" element={<Test />} />
    </Routes>
  );
};

export default App;
