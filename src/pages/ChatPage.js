import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatState } from "../context/ChatProvider";
function ChatPage() {
  const { user, setUser } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage;
