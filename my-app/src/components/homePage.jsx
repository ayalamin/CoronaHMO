import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const HomePage = () => {
  console.log("in homepage")
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate])


  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to the Website</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ width: '60%', textAlign: 'right', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>
          Here will be information about the website services, who is behind the website, etc.
        </div>
        <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/RegistrationForm" style={{ textDecoration: 'none', color: 'white' }}>
            <button style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#45a049', color: 'white' }}>Sign up
            </button>
          </Link>
          <Link to="/ViewMembers" style={{ textDecoration: 'none', color: 'white' }}>
            <button style={{ padding: '10px', border: 'none', borderRadius: '5px',  backgroundColor: '#45a049', color: 'white' }}>View Health Fund Members
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;