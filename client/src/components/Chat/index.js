import React, { memo, useCallback, useState } from "react";

import { ChatWrapper, ChatMessageWrapper, MessageWrapper, MessageDate, MessageText, MessageInput, MessageSender } from "./styles";

function Chat({ messages = [], sendMessage, currentUser }) {
  console.log({ currentUser });
  const [message, setMessage] = useState("");
  const renderMessage = useCallback((message, i) => <ChatMessage key={i} currentUser={currentUser} message={message} />, [currentUser]);
  return (
    <ChatWrapper>
      <ChatMessageWrapper id="msg_wrapper">{messages.map(renderMessage).reverse()}</ChatMessageWrapper>
      <MessageInput
        disabled={!currentUser.id}
        onKeyDown={({ keyCode }) => {
          if (keyCode == 13) {
            sendMessage(message);
            setMessage("");
          }
        }}
        onChange={({ target: { value } }) => setMessage(value)}
        value={message}
        placeholder="Digite uma mensagem"
      />
    </ChatWrapper>
  );
}

export default Chat;

const ChatMessage = memo(function ({ currentUser: { id: userId }, message: msg }) {
  console.log("chagMEssage", { userId, senderId: msg.senderId });
  return (
    <MessageWrapper userId={userId} senderId={msg.senderId}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {userId != msg.senderId && <MessageSender> {msg.userName}</MessageSender>}
        {/*  <MessageDate>msg.date</MessageDate> */}
      </div>
      {msg.content}
    </MessageWrapper>
  );
});
