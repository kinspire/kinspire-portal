export const Messages = {
  Ping: {
    REQUEST: "pingRequest",
    REPLY: "pingReply",
  },
  Content: {
    REQUEST: "contentRequest",
    REPLY: "contentReply",
  },
  Auth: {
    REQUEST: "authRequest",
    REPLY: "authReply",
  },
};

export interface ElectronRequest {
  arg: ContentArg | AuthArg;
  data: Record<string, any>;
}

export const enum ContentArg {
  GET_COURSE,
  GET_COURSES,
  GET_MODULE,
  SAVE_MODULE,
}

export const ContentArgString = {
  [ContentArg.GET_COURSE]: "GET_COURSE",
  [ContentArg.GET_COURSES]: "GET_COURSES",
  [ContentArg.GET_MODULE]: "GET_MODULE",
  [ContentArg.SAVE_MODULE]: "SAVE_MODULE",
};

export const enum AuthArg {
  LOGIN,
}

export const AuthArgString = {
  [AuthArg.LOGIN]: "LOGIN",
};
