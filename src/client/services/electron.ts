import { store } from "@app/store";
import { setLoading } from "@app/store/actions";
import { Messages } from "@common/messages";
// import { ipcRenderer } from "electron-better-ipc";
import { ipcRenderer } from "electron";

export const callElectronContent = async (arg: number, data?: any) =>
  await callElectron(Messages.Content.REQUEST, arg, data);

export const callElectronAuth = async (arg: number, data?: any) =>
  await callElectron(Messages.Auth.REQUEST, arg, data);

export const callElectron = async (msg: string, arg: number, data?: any) => {
  try {
    store.dispatch(setLoading(true));
    console.log("callElectron", msg, "arg", arg);
    const res = await ipcRenderer.invoke(msg, {
      arg,
      data: {
        ...data,
        token: store.getState().token,
      },
    });
    // const res = await ipcRenderer.callMain(Messages.Content.REQUEST, {
    //   arg,
    //   data,
    // });
    console.log("invoke returned", res);
    return res;
  } catch (err) {
    console.log("error", err);
  } finally {
    store.dispatch(setLoading(false));
  }
};
