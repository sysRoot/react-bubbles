import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/"
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth().get('/colors')
      .then(response => {
      console.log(response)
      setColorList(response.data)
    })
      .catch(error => console.log(error))
  }, []) 

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
