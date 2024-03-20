import React from "react";
import { Routes, Route } from "react-router-dom";
import  HomePage  from "./components/homePage";
import ViewMembers from "./components/ViewMembers";
import MemberDetails from "./components/MemberDetails";
import RegistrationForm from "./components/RegistrationForm";
import Modal from './components/Modal'
import PatientDetails from './components/PatientDetails'


const App = () => {
  console.log("in App")

  // const routes = [
  //   { path: "/", component: <HomePage/> },
  //   { path: "/ViewMembers", component: <ViewMembers/> },
  //   { path: "/MemberDetails", component: <MemberDetails/> },
  // ];

  return (
    // <Router>
      <Routes>
          <Route  path= "/" element={ <HomePage/> }/>
          <Route  path= "/ViewMembers" element={ <ViewMembers/> }/>
          <Route  path= "/MemberDetails" element={ <MemberDetails/> }/>
          <Route  path= "/RegistrationForm" element={ <RegistrationForm/> }/>
          <Route  path= "/Modal" element={ <Modal/> }/>
          <Route  path= "/PatientDetails" element={ <PatientDetails/> }/>


      </Routes>
    // </Router>
  );
};

export default App;
