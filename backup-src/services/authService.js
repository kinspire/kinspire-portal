// import swal from "sweetalert";

export default {
  login,
  logout,
  signup
};

// Returns a promise that resolves when the user is logged in, or throws an
// error.
function login() {
  return {};
}

// Returns a promise that resolves when the user is logged out
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
}

// Returns a promise that resolves when the user has successfully signed up, or
// throws an error.
function signup(details) {
  // Sets default username to the first name and last name combined in lower case.
  if (details.username === "") {
    details.username = (details.firstName + details.lastName).toLowerCase();
  }
  return details;
}
