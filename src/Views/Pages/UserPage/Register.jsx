import {
  Button,

  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useColorModeValue,
  Box,
  HStack,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom";
import "../../../Styles/Login.css"
const initialState = {
  name: "",
  email: "",
  password: "",
  lastname:""
}


const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [userDetails, setUserDetails] = useState(initialState)
  const [formErrors, setFormErrors] = useState({});

  const toast = useToast()


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
    errors.lastname = !values.lastname
      ? "lastname is required!"
      : !/^[A-Za-z\s]*$/.test(values.lastname)
        ? "lastname should only contain letters"
        : values.lastname.length < 3
          ? "lastname must be more than 3 characters"
          : values.lastname.length > 50
            ? "lastname cannot be more than 50 characters"
            : "";



    errors.email = !values.email
      ? "Email Required"
      : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ? "Invailed email address"
        : "";
    errors.password = !values.password
      ? "password is required!"
      : values.password.length < 6
        ? "password must be more than 6 characters"
        : values.password.length > 10
          ? "password cannot be more than 10 characters"
          : "";


    return errors;
  };


  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => {
      return { ...prev, [name]: value }
    })
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }






  //--remove error msg automatically
  const getError = (field) => {
    return formErrors[field] ? (
      <p style={{ color: "red", margin: "0" }}>{formErrors[field]}</p>
    ) : null;
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = form_Validation(userDetails);
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
    //---alert
    if (!isErrors) {
      toast({
        position: 'top',
        render: () =>
          <Box color='white' p={3} bg='green.500' borderRadius={"10px"}>
            Account Created Successfully
          </Box>,
        duration: 1500,

      })
      setTimeout(() => {

        navigate('/login');
        window.location.reload()
      }, 2000)

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      existingUsers.push(userDetails);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem("isAuth", JSON.stringify(false));


    }




  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} marginTop={"3rem"} py={12} px={6}
id="register_form_container"
width={"40%"}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Box className='input_tag_wrapper'>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                <Input style={{border:"1px solid  rgba(184, 182, 182, 0.795)"}} type="text"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                    placeholder='Enter your First Name'
                  />
                </FormControl>
              </Box>
              {getError("name")}

              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text"
                    name="lastname"
                    value={userDetails.lastname}
                    onChange={handleChange}
                    placeholder='Enter your Last Name'
                  />
                </FormControl>
                {getError("lastname")}

              </Box>



            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder='Enter your Email'


              />
            </FormControl>
            {getError("email")}

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}

                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  placeholder='Enter your Password'

                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {getError("password")}

            <Stack spacing={10} pt={2}>
              <Button onClick={handleSubmit}
                loadingText="Submitting"
                width={"220px"}
                margin={"auto"}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={() => navigate("/login")} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default Register










