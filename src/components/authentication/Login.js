import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Stack, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const forgotHandler = () => {};
  const submitHandler = async () => {
    setLoading(true);
    if (!password || !email) {
      toast({
        title: "Please fill all the Fields ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://bv-chat.onrender.com/user/login",
        { email, password },
        config
      );
      // toast({
      //   title: "Login Successful",
      //   status: "Success",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  //   };
  return (
    <VStack spacing="5px">
      <FormControl id="email2" isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password2" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your  password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button
              h="1.7rem"
              size="sm"
              onClick={handleClick}
              colorScheme="#3182ce"
              variant="ghost"
              border-color="#3182ce"
            >
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="80%"
        style={{ marginTop: 15 }}
        onClick={() => {
          submitHandler();
        }}
        isLoading={loading}
      >
        Login
      </Button>
      <Stack direction="row" spacing={3} align="stretch" paddingTop="7px">
        <Button
          variant="solid"
          colorScheme="orange"
          width="80%"
          padding="0 15px"
          onClick={() => {
            setEmail("guest@bv.in");
            setPassword("123123");
          }}
        >
          Guest
        </Button>
        <Link to="/forgot-password">
          <Button
            variant="solid"
            colorScheme="red"
            width="100%"
            padding="0 25px"
            onClick={() => forgotHandler}
          >
            Forgot Password
          </Button>
        </Link>
      </Stack>
    </VStack>
  );
};

export default Login;
