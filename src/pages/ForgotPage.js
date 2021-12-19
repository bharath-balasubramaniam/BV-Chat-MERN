import React from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabPanel,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import bv from "../components/icon2.png";
import Forgot from "../components/authentication/Forgot";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <Container maxW="xl">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        backgroundColor="rgba(0,0,0,.9)"
        w="100%"
        margin="40px 0 15px 0"
        borderRadius="5px"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Kalam" color="white">
          <img
            src={bv}
            alt="logo.png"
            width="60px"
            style={{ position: "relative", right: "60px", top: "10px" }}
          />
          <span style={{ position: "relative", top: "-30px", left: "10px" }}>
            Chat
          </span>
        </Text>
      </Box>
      <Box
        backgroundColor="rgba(0,0,0,.9)"
        w="100%"
        p={4}
        borderRadius="5px"
        borderWidth="1px"
        color="white"
      >
        <Tabs variant="soft-rounded" colorScheme="black">
          <TabList mb="1em" d="flex" justifyContent="space-between">
            <Tab color="white" width="50%">
              Forgot Password
            </Tab>
            <Link to="/">
              <Tab color="white" width="50%">
                Login
              </Tab>
            </Link>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Forgot />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
