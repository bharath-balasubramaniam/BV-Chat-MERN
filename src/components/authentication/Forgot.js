import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const Forgot = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const validateEmail = RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const submitHandler = async (req, res) => {
    setLoading(true);
    if (!name || !email) {
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
    if (!validateEmail.test(email)) {
      toast({
        title: "Please enter the valid email",
        status: "warning",
        duration: 3000,
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
        "https://bv-chat.herokuapp.com/user/forgotPassword",
        { email },
        config
      );
      console.log(data);
      if (data.success) {
        swal({
          title: `Dear ${name}.`,
          text: "Your password resent link is sent to your registered email 🤞",
          icon: "success",
          button: "close",
        });
        setLoading(false);
        return;
      }
      if (!data.success) {
        toast({
          title: "Error Occured",
          description:
            "The given email does not exit in our Db. kindly check your email once again",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      //TODO
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email2" isRequired>
        <FormLabel> Name </FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password2" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          placeholder="Enter your  email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></Input>
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
        Submit
      </Button>
    </VStack>
  );
};

export default Forgot;
