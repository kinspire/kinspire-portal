// @flow
// TODO replace with actual db lookup
// import sqlite from 'sqlite';

export const userService = {
	login,
	logout,
	signup
};

// TODO remove temporary "database"
let validUsernames = {
	testaccount: 'Test Account'
};

function login(username) {
	if (username in validUsernames) {
		return Promise.resolve({ username: username, name: validUsernames[username] })
		.then(user => {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
	} else {
		return Promise.reject(new Error("invalid username"));
	}
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

function signup(details) {
	const { firstName, lastName } = details;
	let username = (firstName + lastName).toLowerCase();
	if (username in validUsernames) {
		return Promise.reject(new Error("duplicate"));
	} else {
		let name = [firstName, lastName].join(' ');
		// TODO save user in db
		// TODO save more than just the name lmao
		validUsernames[username] = name;
		return login(username);
	}
}
