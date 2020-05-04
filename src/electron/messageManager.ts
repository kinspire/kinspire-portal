import { ipcMain } from "electron";
import { Messages } from "../common/messages";
import { registerContent } from "./content";

export default function register() {
  ipcMain.on(Messages.Ping.REQUEST, (event, arg) => {
    console.log(arg);
    event.reply(Messages.Ping.REPLY, "pong");
  });

  // Register all sublisteners
  registerContent();
}
