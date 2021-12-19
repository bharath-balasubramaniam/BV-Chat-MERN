import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
      <Skeleton height="45PX" />
    </Stack>
  );
};
export default ChatLoading;
