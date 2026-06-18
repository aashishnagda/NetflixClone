import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;
const socketOptions = {
  autoConnect: false,
  transports: ["websocket"]
};

const socket = API_URL
  ? io(API_URL, socketOptions)
  : io(socketOptions);

export default socket;
