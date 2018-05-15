// @flow
import Datastore from 'nedb';

export const userService = {
	login,
	logout,
	signup
};

let db = new Datastore({filename: './test.db', autoload: true});

// Login
function login(username) {
	return new Promise(function(resolve, reject) {
		db.find({ username: username }, function(err, users) {
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
		db.find({ username: details.username }, function(err, users) {
			if (users.length) {
				return reject("Duplicate username");
			} else {
				db.insert(details, function(err, newDetails) {
					localStorage.setItem('user', JSON.stringify(newDetails));
					resolve(newDetails);
				});
			}
		});
	});
}
