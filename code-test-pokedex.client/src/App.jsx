import { Suspense } from "react";
import './App.css'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
