import React, { useState } from "react";
import "../../../Styles/Contact.css";

import axios from "axios";
import { Box, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Contact = () => {
    const userDetails = {
        name: "",
        mobile: "",
        email: "",
        query: "",
    };
    const [details, setDetails] = useState(userDetails);
    const [formErrors, setFormErrors] = useState({});
    const toast = useToast()
    const navigate = useNavigate()

    const getDetails = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/contacts",
                details
            );
        } catch (error) {
            console.log(error);
            alert("Oops! Something went wrong. Please try again later.");
        }
    };

    // --------Apply form validation----------
    const form_Validation = (values) => {
        const errors = {};
        errors.name = !values.name
            ? "name is required!"
            : !/^[A-Za-z\s]*$/.test(values.name)
                ? "name should only contain letters"
                : values.name.length < 3
                    ? "name must be more than 3 characters"
                    : values.name.length > 50
                        ? "name cannot be more than 50 characters"
                        : "";



        errors.email = !values.email
            ? "Email Required"
            : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ? "Invailed email address"
                : "";
        errors.mobile = !values.mobile
            ? "mobile is required!"
            : values.mobile.length < 4
                ? "mobile must be more than 4 characters"
                : values.mobile.length > 10
                    ? "mobile cannot be more than 10 characters"
                    : "";

        errors.query = !values.query
            ? "query is required!"
            : values.query.length > 300
                ? "query cannot be more than 300 characters"
                : "";

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = form_Validation(details);
        setFormErrors(errors);

        // Check if there are any validation errors
        const isErrors = Object.values(errors).some((item) => item !== "");
        //---alert
        if (isErrors) {
            toast({
                position: "top",
                render: () => <Box id="un_success_toast">All fields required</Box>,
                duration: 2000,
            });
        }
        if (!isErrors) {
            toast({
                position: "top",
                render: () => <Box id="success_toast">
                    Details Submitted Successfully </Box>,
                duration: 2000,
            });

            setDetails(userDetails);
            getDetails();
            setTimeout(() => {
                navigate("/")
            }, 2000)



        }
    };


    //--remove error msg automatically
    const getError = (field) => {
        return formErrors[field] ? (
            <p style={{ color: "red", margin: "0" }}>{formErrors[field]}</p>
        ) : null;
    };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };


    // used for mobile length should be 10
    const handleMobileInput = (e) => {
        if (e.target.value.length >= 10) {
            e.preventDefault();
        }
    };
    return (
        <div className="contact_Container">
            <div className="image_container">
                <img
                    src="https://img.freepik.com/free-photo/closeup-business-woman-hand-typing-laptop-keyboard-with-m_1232-2746.jpg?w=740&t=st=1691736602~exp=1691737202~hmac=71a80bcf694c8fbe3f394180744c45a5817a20c9f0cbf5bd4411cf7be4616b98"
                    alt="image_icon"
                />
            </div>
            <div className="contact-form">
                <div className="contect_us_heading">
                    <p>Contact Us</p>

                </div>
                <form onSubmit={handleSubmit}>
                    <label>Name-</label> <br />
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        name="name"
                        value={details.name}
                        onChange={handleChange}
                    />
                    {getError("name")}
                    <br />
                    <label>Mobile-</label>
                    <br />
                    <input
                        type="number"
                        placeholder="Enter your Mobile"
                        name="mobile"
                        value={details.mobile}
                        onKeyPress={handleMobileInput}
                        onChange={handleChange}
                    />
                    <br />
                    {getError("mobile")}
                    <label>Email-</label> <br />
                    <input
                        type="email"
                        placeholder="Enter your Email here"
                        name="email"
                        value={details.email}
                        onChange={handleChange}
                    />

                    <br />
                    {getError("email")}
                    <label>Query-</label> <br />
                    <textarea
                        placeholder="Type your Query"
                        name="query"
                        value={details.query}
                        onChange={handleChange}>

                    </textarea>
                    <br />
                    {getError("query")}
                    <div>
                        <button className="submit">
                            Submit
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Contact;
