// @flow
// The user service is a normal JS service independent of Redux

export const userService = {
	login,
	logout
};

// TODO remove temporary "database"
let validUsernames = {
	testaccount: 'Test Account'
};

function login(username) {
	// TODO replace with actual db lookup
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
