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
      <h1 style={{ textAlign: 'center' }}>Welcome to the HMO website</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ width: '60%', textAlign: 'left', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>
          <p>
            About corona hadasim HMO
            Welcome to corona hadasim HMO,
            where we are dedicated to providing comprehensive and affordable health insurance solutions to
            meet the diverse needs of our members.

            Our Mission:
            At corona hadasim HMO, our mission is to ensure access to
            high-quality healthcare for individuals and families across Proudly serving London, UK
            . We strive to be a trusted partner in our members'
            health journeys, offering peace of mind and financial security through our range of insurance products and services.

            Who We Are:
            Established in Established since 2005
            ,corona hadasim HMO has been a leader in the health insurance industry,
            serving thousands of satisfied members throughoutProudly serving London, UK
            . As a customer-centric organization, we prioritize transparency,
            innovation, and excellence in everything we do.
          </p>
        </div>
        <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/RegistrationForm" style={{ textDecoration: 'none', color: 'white' }}>
            <button style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#45a049', color: 'white' }}>Sign up
            </button>
          </Link>
          <Link to="/ViewMembers" style={{ textDecoration: 'none', color: 'white' }}>
            <button style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#45a049', color: 'white' }}>View Health Fund Members
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;