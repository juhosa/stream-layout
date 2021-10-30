import { useEffect, useState } from "react";
import { getClient, disconnect } from "../utils/tmi";
import styles from "../styles/Chat.module.css";
import { rehype } from "rehype";
// import rehype from "rehype";
import sanitize from "rehype-sanitize";

const Chat = () => {
  // const testMessages = [
  //   { username: "juhosalli", message: "asd lol" },
  //   { username: "viewer1", message: "True!" },
  //   { username: "ALongNameBecauseWhyNot", message: ":D" },
  //   {
  //     username: "SuperCoder",
  //     message:
  //       "A longer message for testing purposes. I strongly disagree, oh boy.",
  //   },
  // ];
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = getClient();

    client.on("message", (channel, tags, message, self) => {
      // console.log({ message });
      // console.log({ channel });
      // console.log({ tags });
      handleMessage(channel, tags, message, self);
    });

    return () => {
      disconnect();
    };
  }, []);

  const handleEmotes = (message, { emotes = {} }) => {
    let replaces = {};

    for (let emoteid in emotes) {
      const emote = emotes[emoteid];
      const emoteUrl = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteid}/default/light/3.0`;
      for (let indexes of emote) {
        const split = indexes.split("-");
        const startIndex = split[0];
        const endIndex = split[1];
        let thing = { startIndex, endIndex, emoteUrl };
        replaces[startIndex] = thing;
      }
    }

    // keys in descening order
    const keys = Object.keys(replaces).sort((a, b) => Number(a) < Number(b));

    for (const key of keys) {
      const emote = replaces[key];
      const start = message.substring(0, emote.startIndex);
      const end = message.substring(emote.endIndex);
      const image = `<img alt="emote" src="${emote.emoteUrl}">`;
      message = start + image + end.substring(1);
    }
    return message;
  };

  const handleMessage = (channel, tags, message, self) => {
    message = handleEmotes(message, tags);

    // Sanitize the message
    // Let <img> and <marquee> to pass
    message = rehype()
      .data("settings", { fragment: true })
      .use(sanitize, {
        strip: ["script"],
        protocols: {
          src: ["https"],
        },
        tagNames: ["img", "marquee"],
        attributes: {
          img: ["src"],
          "*": ["alt"],
        },
      })
      .processSync(message)
      .toString();
    // console.log(message);

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
    <div className={styles.chat_container}>
      {messages.slice(-4).map((msg, i) => {
        return (
          <p key={i} className={styles.message}>
            <strong>{msg.username}:</strong>
            {/* <span>{msg.message}</span> */}
            <span dangerouslySetInnerHTML={{ __html: msg.message }} />
          </p>
        );
      })}
    </div>
  );
};

export default Chat;
