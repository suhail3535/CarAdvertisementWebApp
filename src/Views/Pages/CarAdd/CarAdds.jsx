import React, { useState } from "react";
import axios from "axios";
import "../../../Styles/CarAdds.css";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Box,
  Stack,
  Select,

} from "@chakra-ui/react";

const initialState = {
  name: "",
  image: "",
  brand: "",
  year: "",
  type: "",
  price: "",
  address: "",
};
const CarAdds = () => {
  const toast = useToast();
  const navigate = useNavigate()
  const [carAdd, setCarAdd] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  //---for taking normal value from input and select tag----/
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Remove the error message for the corresponding field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setCarAdd((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const addNewItem = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/cars",
        carAdd
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // --------Apply form validation----------
  const validate = (values) => {
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

    errors.image = !values.image ? "image is required!" : "";
      errors.brand = !values.brand ? "brand is required!" : "";
      errors.year = !values.year? "year is required!" : "";
      errors.type = !values.type? "type is required!" : "";
    errors.price = !values.price ? "price is required!" : "";
    errors.address = !values.address
      ? "address is required!"
      : values.address.length > 300
        ? "address cannot be more than 300 characters"
        : "";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(carAdd);
    setFormErrors(errors);

    // Check if there are any validation errors
    const isErrors = Object.values(errors).some((item) => item !== "");
    //---alert
    if (isErrors) {
      toast({
        position: "top",
        render: () => <Box id="un_success_toast">All fields required</Box>,
        duration:2000,

      });
    }
    if (!isErrors) {
      toast({
        position: "top",
        render: () => <Box id="success_toast">Add Successfully  Created</Box>,
        duration:2000,

      });

      setCarAdd(initialState);
      addNewItem();
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
  return (
    <div className="form_container">
      <h1>Create Post</h1>
      <div className="form_control_div">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={carAdd.name}
            onChange={handleChange}
            type="text"
            placeholder="First name"

          />
        </FormControl>
        {getError("name")}
        <br />
        <FormControl isRequired>
          <FormLabel>Image</FormLabel>
          <Input
            name="image"
            value={carAdd.image}
            onChange={handleChange}
            type="url"
            placeholder="Image-Url"
          />
        </FormControl>
        {getError("image")}
        <br />
        <FormControl isRequired>
          <FormLabel>Brand</FormLabel>
          <Stack spacing={3}>
            <Select
              name="brand"
              value={carAdd.brand}
              onChange={handleChange}
              placeholder="Select Brand">
              <option value="Tata">Tata</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Ford">Ford</option>
              <option value="Volvo">Volvo</option>
              <option value="Mahindra">Mahindra</option>
            </Select>
          </Stack>
        </FormControl>
        {getError("brand")}


        <br />
        <FormControl isRequired>
          <FormLabel>type</FormLabel>
          <Stack spacing={3}>
            <Select
              name="type"
              value={carAdd.type}
              onChange={handleChange}
              placeholder="Select Type">
              <option value="Manual">Manual</option>
              <option value="Semi-AutoMatic">Semi-AutoMatic</option>
              <option value="AutoMatic">AutoMatic</option>

            </Select>
          </Stack>
        </FormControl>
        {getError("type")}


        <br />
        <FormControl isRequired>
          <FormLabel>Model</FormLabel>
          <Stack spacing={3}>
            <Select
              name="year"
              value={carAdd.year}
              onChange={handleChange}
              placeholder="Select Year">
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2015">2015 </option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Select>
          </Stack>
        </FormControl>
        {getError("year")}


        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            value={carAdd.price}
            onChange={handleChange}
            type="number"
            placeholder="Enter Price.."

          />
        </FormControl>
        {getError("price")}
        <br />

        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Textarea
            name="address"
            value={carAdd.address}
            onChange={handleChange}
            placeholder="Type your description"
          />
        </FormControl>
        {getError("address")}
        <br />

        <div className="btn_div">
          <button className="submit_btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarAdds




