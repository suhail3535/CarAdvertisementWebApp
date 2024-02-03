import React, { useEffect, useState } from 'react';
import "../../../Styles/Admin.css";
import axios from 'axios';

const Admin = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getContactDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/contacts");
            setContacts(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactDetails();
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <h1 style={{textAlign:"center",fontSize:"1.8rem",marginTop:"7rem",fontWeight:"bold"}}>All Query Details</h1>
            <div className='table_div'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <div>
                                <h1>Loading.........</h1>
                            </div>
                        ) : contacts.length > 0 ? (
                            contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.mobile}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.query}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No contacts available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;
