import { useEffect, useState } from "react";
import { getClient, disconnect } from "../utils/tmi";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = getClient();

    client.on("message", (channel, tags, message, self) => {
      handleMessage(channel, tags, message, self);
    });

    return () => {
      disconnect();
    };
  }, []);

  const handleMessage = (channel, tags, message, self) => {
    // console.log(`${tags["display-name"]}: ${message}`);
    const msg = {
      username: tags["display-name"],
      message: message,
    };
    addMessage(msg);
  };

  const addMessage = (msg) => {
    // this won't work because of stale data!
    // setMessages([...messages, msg])
    setMessages((prevState) => {
      return [...prevState, msg];
    });
  };
  return (
    <div>
      {messages.map((msg, i) => {
        return (
          <p key={i}>
            {msg.username}: {msg.message}
          </p>
        );
      })}
    </div>
  );
};

export default Chat;
