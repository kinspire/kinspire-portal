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

export interface ContentRequest {
  arg: ContentArg;
  data: Record<string, any>;
}

export const enum ContentArg {
  GET_COURSE,
  GET_COURSES,
  GET_MODULE,
  SAVE_MODULE,
}

export const enum AuthArg {
  LOGIN,
}
