export const userService = {
	login,
	logout,
	register
};

let validUsernames = {
  testaccount: 'Test Account'
};

// Login service -- the actual login operation
function login(username) {
	// TODO: use username/password to query the local SQL database and then
	// log in
  if (username in validUsernames) {
		return {
  		username: username,
  		name: 'Test Name'
  	};
	}
	return null;
}

function logout() {

}

function register() {

}
