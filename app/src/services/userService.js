export const userService = {
	login,
	logout,
	register
};

// Login service -- the actual login operation
function login(username) {
	// TODO: use username/password to query the local SQL database and then
	// log in
	return Promise.resolve({
		username: username,
		name: 'Test Name'
	});
}

function logout() {

}

function register() {

}
