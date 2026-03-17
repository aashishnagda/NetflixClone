import { io } from "socket.io-client";

/*
 Backend will be added later.
 For now this file is just READY.
*/
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const socket = io(API_URL, {
  autoConnect: false
});

export default socket;
