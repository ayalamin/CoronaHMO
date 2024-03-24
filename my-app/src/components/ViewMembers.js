// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import '../CSS/ViewMembers.css';



// const ViewMembers = ({ }) => {
//     debugger
//     let navigate = useNavigate();
//     const [names, setnames] = useState();


//     useEffect(() => {
//         debugger
//         const fetchnamesData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/api/user`);
//                 const data = await response.json();
//                 setnames(data);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };

//         fetchnamesData();
//     }, []);

//     if (!names) {
//         return <div>Loading...</div>;
//     }



//     const deletePatientData = async (ID) => {
//         try {
//             const response = await fetch(`http://localhost:8080/api/user/${ID}`, {
//                 method: 'DELETE'
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete patient data');
//             }
//             console.log('Patient data deleted successfully!');
//             alert('Patient data deleted successfully!');
//         } catch (error) {
//             console.error('Error:', error);
//         }
//         navigate(`/ViewMembers`);
//     };

//     const {
//         ID,
//         FirstName,
//         LastName,
//     } = names;

//     return (
//         <div>
//             <h2 >HMO members</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th></th> {/* תיאור הכפתור */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {names.map((name, index) => (
//                         <tr key={index}>
//                             <td>{name.FirstName}</td>
//                             <td>{name.LastName}</td>
//                             <td><Link to={{
//                                 pathname: `/PatientDetails${name.ID}`,
//                                 state: { ID:name.ID }
//                             }}>more details</Link></td>
//                             <td><button onClick={() => deletePatientData(name.ID)}>deletion</button></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewMembers;
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../CSS/ViewMembers.css';

const ViewMembers = ({ }) => {
    const navigate = useNavigate();
    const [names, setNames] = useState([]);

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
        } catch (error) {
            console.error('Error:', error);
        }
        navigate(`/ViewMembers`);
    };

    return (
        <div className="view-members">
            <h2>HMO members</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th> {/* תיאור הכפתור */}
                        <th></th> {/* תיאור הכפתור */}
                    </tr>
                </thead>
                <tbody>
                    {names.map((name, index) => (
                        <tr key={index}>
                            <td>{name.FirstName}</td>
                            <td>{name.LastName}</td>
                            <td>
                                <Link to={{
                                    pathname: `/PatientDetails`,
                                    state: { ID: name.ID }
                                }}>More Details</Link>
                            </td>
                            <td>
                                <button onClick={() => deletePatientData(name.ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMembers;
