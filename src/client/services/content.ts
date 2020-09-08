import { store } from "@app/store";
import { setLoading } from "@app/store/actions";
import { ContentArg, Messages } from "@common/messages";
// import { ipcRenderer } from "electron-better-ipc";
import { ipcRenderer } from "electron";

export const callElectron = async (arg: ContentArg, data?: any) => {
  store.dispatch(setLoading(true));
  console.log("callElectron", arg);
  const res = await ipcRenderer.invoke(Messages.Content.REQUEST, {
    arg,
    data,
  });
  // const res = await ipcRenderer.callMain(Messages.Content.REQUEST, {
  //   arg,
  //   data,
  // });
  console.log("invoke returned", res);
  store.dispatch(setLoading(false));
  return res;
};
