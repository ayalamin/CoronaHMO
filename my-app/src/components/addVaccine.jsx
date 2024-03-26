
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/PatientDetails.css';
import { useLocation, useHistory } from 'react-router-dom';



const AddVaccine = (props) => {
    console.log("in add vacciens component");
    const [VaccineDate, setVaccineDate] = useState('');
    const [Manufacturer, setManufacturer] = useState('');
    const [VaccineCount, setVaccineCount] = useState(0);
    const { MemberID } = props;
    useEffect(() => {
        // Fetch vaccine count for the current user
        fetchVaccineCount();
    }, []);

    const fetchVaccineCount = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/vaccines/count/${MemberID}`);
            if (response.ok) {
                const data = await response.json();
                console.log("the data is " + JSON.stringify(data))
                setVaccineCount(data[0].VaccineCount);
                console.log("the VaccineCount is " + VaccineCount)
            } else {
                throw new Error('Failed to fetch vaccine count');
            }
        } catch (error) {
            console.error('Error fetching vaccine count:', error);
        }
    };

    const addVaccine = async () => {
        console.log("before fetch")
        try {
            console.log("the in the addvaccine before  is: "+ VaccineCount)

            if (VaccineCount >= 4) {
                console.log("the VaccineCount is: "+ VaccineCount)
                alert('You already have four vaccines. You cannot add more.');
                return;
            }
            const response = await fetch(`http://localhost:8080/api/user/vaccines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MemberID: MemberID,
                    DateReceived: VaccineDate,
                    Manufacturer: Manufacturer
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add vaccine');
            }

            console.log('Vaccine added successfully!');
            alert('Vaccine added successfully!')

        } catch (error) {
            console.error('Error:', error);
        }
    };





    return (
        <div className="patient-details">
            <>
                <div className="details">
                    <label htmlFor="VaccineDate">Vaccine Date:</label>
                    <input
                        type="text"
                        id="VaccineDate"
                        value={VaccineDate}
                        onChange={(e) => setVaccineDate(e.target.value)}
                    />
                </div>
                <div className="details">
                    <label htmlFor="Manufacturer">Vaccine Manufacturer:</label>
                    <input
                        type="text"
                        id="Manufacturer"
                        value={Manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                    />
                </div>
                <div className="details">
                    <button type="button" onClick={addVaccine}>Add a vaccine</button>
                </div>
            </>
        </div>
    );
};

export default AddVaccine;
