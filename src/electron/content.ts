import { ipcMain } from "electron";
import { Message } from "../common/messages";

export default function register() {
  ipcMain.on(Message.Ping.REQUEST, (event, arg) => {
    console.log(arg);
    event.reply(Message.Ping.REPLY, "pong");
  });
}
