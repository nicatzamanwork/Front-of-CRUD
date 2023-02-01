import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";

// function App() {
//   const [post, setPost] = useState();

//   useEffect(() => {
//     axios("http://localhost:8080/products").then((res) => setPost(res.data));
//   }, []);

//   setPost;

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
