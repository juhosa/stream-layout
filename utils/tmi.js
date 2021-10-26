import tmi from "tmi.js";

let TMIClient = undefined;

const getClient = () => {
  if (TMIClient !== undefined) {
    console.log("OLD");
    return TMIClient;
  } else {
    console.log("NEW");
    TMIClient = new tmi.Client({
      channels: ["juhosalli"],
    });
    TMIClient.on("disconnected", () => {
      console.log("disconnected event fired");
    });

    TMIClient.on("connected", () => {
      console.log("client connected");
    });

    TMIClient.on("reconnect", () => {
      console.log("client reconnected");
    });

    TMIClient.connect();
    return TMIClient;
  }
};

const disconnect = () => {
  TMIClient.removeAllListeners();
  TMIClient.disconnect();
};

export { getClient, disconnect };
