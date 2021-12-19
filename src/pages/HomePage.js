import React, { useEffect } from "react";
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
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom";
function HomePage() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
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
          BV Chat
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
          <TabList mb="1em">
            <Tab fontFamily="cursive" color="white" width="50%">
              Login
            </Tab>
            <Tab fontFamily="cursive" color="white" width="50%">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
