// @flow
import { usersDb, contentProgressDb } from '../db';

export const userService = {
	login,
	logout,
	signup
};

//////// PROMISE HELPER FUNCTIONS ////////

// Login
function login(username) {
	return new Promise((resolve, reject) => {
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
	return new Promise((resolve, reject) => {
		details.username = (details.firstName + details.lastName).toLowerCase();
		usersDb.find({ username: details.username }, function(err, users) {
			if (users.length) {
				return reject("Duplicate username");
			} else {
				// Creation of all new records for this user
				usersDb.insert(details, function(err, newDetails) {
					if (err != null) reject(err);

					let newContentProgress = {
						userId: newDetails._id,
						crosswordNum: 0,
						wordsearchNum: 0,
						storyNum: 0
					};
					contentProgressDb.insert(newContentProgress, function(err) {
						if (err != null) reject(err);

						localStorage.setItem('user', JSON.stringify(newDetails));
						resolve(newDetails);
					});
				});
			}
		});
	});
}
