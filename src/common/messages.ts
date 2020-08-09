export const Messages = {
  Ping: {
    REQUEST: "pingRequest",
    REPLY: "pingReply",
  },
  Content: {
    REQUEST: "contentRequest",
    REPLY: "contentReply",
  },
};

export interface ContentRequest {
  arg: ContentArg;
  data: Record<string, any>;
}

export const enum ContentArg {
  GET_COURSE,
  GET_COURSES,
  GET_LESSON,
  // divider
  // TODO delete the following after WordSearch is transferred to Moodle
  GET_ALL_CONTENT,
  GET_CONTENT,
  GET_CONTENT_PROGRESS,
  SUBMIT_CONTENT_PROGRESS,
}
