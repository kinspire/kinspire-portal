import Datastore from 'nedb';

export const usersDb = new Datastore({filename: 'users.db', autoload: true});
export const contentProgressDb = new Datastore({filename: 'contentProgress.db', autoload: true});
export const contentDb = new Datastore({filename: 'content.db', autoload: true});
export const contentSubmissionsDb = new Datastore({filename: 'contentSubmissions.db', autoload: true});
export const tasksDb = new Datastore({filename: 'tasks.db', autoload: true});
