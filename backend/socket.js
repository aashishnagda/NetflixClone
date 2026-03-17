// socket.on("video-action", data => {
//   socket.to(data.roomId).emit("sync-video", data);
// });


import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // stable
});

export default socket;
