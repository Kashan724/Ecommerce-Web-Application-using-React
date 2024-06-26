import React, { useContext } from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontext";


const About = () => {
  const {myName}=useProductContext()  // this "myName" is accessing the "value" pf property Provider
  const data={
    name:"About Ecommerce"
  }
  return <>
  {myName}
  <HeroSection myData={data}/>
  </>
};



export default About;
