import React, { useEffect, useState, } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/ViewMembers.css';

const ViewMembers = () => {
    const [names, setNames] = useState([]);
    const [amountOfPatients, setAmountOfPatients] = useState(null)

    useEffect(() => {
        const fetchNamesData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user`);
                const data = await response.json();
                setNames(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchNamesData();
    }, []);

    const UnvaccinatedPatients = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/vaccines/how`);
            const data = await response.json();
            console.log("the number is: "+ JSON.stringify(data[0]))
            const count = data[0]['COUNT(*)'];
            setAmountOfPatients(count);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const MonthlyPatientChart = async () => {

    }

    const deletePatientData = async (ID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/${ID}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete patient data');
            }
            console.log('Patient data deleted successfully!');
            alert('Patient data deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className="view-members">
            <h2>HMO members</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {names.map((name, index) => (

                        <tr key={index}>
                            <td>{name.FirstName}</td>
                            <td>{name.LastName}</td>
                            <td>
                                {console.log(name.ID)}
                                <Link to="/PatientDetails" state={name.ID}>More Details</Link>
                                {/* <Link to={{
                                    pathname: '/PatientDetails',
                                   state: { ID: name.ID }
                                }}
                                >More Details</Link> */}
                            </td>
                            <td>
                                <button onClick={() => deletePatientData(name.ID)}>Delete</button>
                            
                            </td>
                        </tr>


                    ))}

                </tbody>
            </table>
            <div>
            <br/>
            <button onClick={() => UnvaccinatedPatients()}>Unvaccinated patients</button>
            <div>{amountOfPatients && <h5>HMO members who are not vaccinated:  {amountOfPatients}</h5> }</div>
            <div>
            <br/>
            <button onClick={() => MonthlyPatientChart()}>Monthly patient chart</button>
            </div>
            </div>
        </div>
    );
};

export default ViewMembers;
