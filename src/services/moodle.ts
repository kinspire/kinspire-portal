import log from "loglevel";

const host = "https://kinspire.org/portal/";

export const api = (endpoint: string) => {
  log.debug(host + endpoint);
};
