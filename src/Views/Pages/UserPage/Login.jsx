import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast, Flex, Stack, Heading, Text, Checkbox, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import "../../../Styles/Login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const usersData = JSON.parse(localStorage.getItem('users')) || [];

  const formValidation = (values) => {
    const errors = {};
    errors.email = !values.email ? "Email Required" : "";
    errors.password = !values.password ? "Password Required" : "";

    return errors;
  };

  const handleLogin = () => {
    const errors = formValidation({ email, password });
    setFormErrors(errors);

    const isErrors = Object.values(errors).some((item) => item !== "");

    if (isErrors) {
      toast({
        position: 'top',
        render: () => (
          <Box color='white' p={3} bg='red.500' borderRadius={"10px"}>
            Please enter login details.
          </Box>
        ),
      });
    } else {
      const user = usersData.find((userData) => userData.email === email && userData.password === password);

      if (user) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("loggedInUser", user.email);

        toast({
          position: 'top',
          render: () => (
            <Box color='white' p={3} bg='green.500' borderRadius={"10px"} textAlign={"center"}>
              Login Successfully
            </Box>
          ),
        });

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        toast({
          position: 'top',
          render: () => (
            <Box color='white' p={3} bg='red.500' borderRadius={"10px"}>
              Account Not Found, Wrong Credentials.
            </Box>
          ),
        });
      }
    }
  };

return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
    mt={"3rem"}
    id="register_form_container"
      bg={""}>
      <Stack className='login_form' spacing={8} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={""}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input  className='input_tag' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
              {formErrors.email && <p style={{ color: 'red', margin: 0 }}>{formErrors.email}</p>}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input className='input_tag' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
              {formErrors.password && <p style={{ color: 'red', margin: 0 }}>{formErrors.password}</p>}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text align={'center'} >
                  <Link onClick={() => navigate("/register")} color={'blue.400'}>Register</Link>
                </Text>
              </Stack>
              <Button onClick={handleLogin}
                bg={'blue.400'}
                width={"50%"}
                m={"auto"}
                color={'white'}
                _hover={{
                  bg: 'rgb(230, 218, 56)',
                  transition: "1s"
                }}>
              Sign in






              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {/* {isAdmin && <Redirect to="/admin" />} This handles the admin redirection */}
    </Flex>
  );
};

export default Login;
