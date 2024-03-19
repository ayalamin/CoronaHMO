import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  HomePage  from "./components/homePage";
import ViewMembers from "./components/ViewMembers";
import MemberDetails from "./components/MemberDetails";

const App = () => {
  const routes = [
    { path: "/", component: <HomePage/> },
    // { path: "/ViewMembers", component: <ViewMembers/> },
    // { path: "/MemberDetails", component: <MemberDetails/> },
   
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
