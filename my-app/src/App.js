import React from "react";
import { Routes, Route } from "react-router-dom";
import  HomePage  from "./components/homePage";
import ViewMembers from "./components/ViewMembers";
import RegistrationForm from "./components/RegistrationForm";
import Modal from './components/Modal'
import PatientDetails from './components/PatientDetails'
import AddVaccine from './components/addVaccine'
import DisplayImage from './components/displayImage'
import LastMonthGraph from './components/lastMonthGraph'
const App = () => {
  console.log("in App")

  

  return (
    // <Router>
      <Routes>
          <Route  path= "/"  element={ <HomePage/> }/>
          <Route  path= "/ViewMembers" element={ <ViewMembers/> }/>
          <Route  path= "/RegistrationForm" element={ <RegistrationForm/> }/>
          <Route  path= "/Modal" element={ <Modal/> }/>
          <Route  path= "/PatientDetails" element={ <PatientDetails/> }  />
          <Route  path= "/AddVaccine" element={ <AddVaccine/> }  />
          <Route  path= "/displayImage" element={ <DisplayImage/> }  />
          <Route  path= "/lastMonthData" element={ <LastMonthGraph/> }  />


      </Routes>
    // </Router>
  );
};

export default App;
