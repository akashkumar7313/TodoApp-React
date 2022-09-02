import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import {Toaster} from 'react-hot-toast'
export default function App() {
  return (
    <div>
      <Header/>
      <Body/>
      <Toaster/>
    </div>
  );
}