// @flow
import Datastore from 'nedb';

import contentUtils from '../utils/contentUtils';

export const userService = {
	login,
	logout,
	signup
};

let usersDb = new Datastore({filename: 'users.db', autoload: true});
let contentProgressDb = new Datastore({filename: 'contentProgress.db', autoload: true});

// Login
function login(username) {
	return new Promise(function(resolve, reject) {
		usersDb.find({ username: username }, function(err, users) {
			if (err !== null || !users.length) return reject(err);

			localStorage.setItem('user', JSON.stringify(users[0]));
			resolve(users[0]);
		});
	});
}

// TODO make a Promise
function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

// TODO: add error handling
function signup(details) {
	return new Promise(function(resolve, reject) {
		details.username = (details.firstName + details.lastName).toLowerCase();
		usersDb.find({ username: details.username }, function(err, users) {
			if (users.length) {
				return reject("Duplicate username");
			} else {
				// Creation of all new records for this user
				usersDb.insert(details, function(err, newDetails) {
					if (err != null) reject(err);

					contentProgressDb.insert(contentUtils.getDefaultContentProgress(newDetails._id), function(err, newContentProgress) {
						if (err != null) reject(err);

						localStorage.setItem('user', JSON.stringify(newDetails));
						resolve(newDetails);
					});
				});
			}
		});
	});
}
