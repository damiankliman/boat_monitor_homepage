import axios from "axios";

const thingspeakClient = axios.create({
  baseURL: "https://api.thingspeak.com/channels",
  timeout: 30000,
});

export default thingspeakClient;
