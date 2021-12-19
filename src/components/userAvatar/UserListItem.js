import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
// import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ handleFunction, user }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      backgroundColor="#E8E8E8"
      _hover={{ color: "black", backgroundColor: "#38B2AC" }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text fontSize="md">{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
