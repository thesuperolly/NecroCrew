export function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || {};
  }
  
  export function saveUser(email, password) {
    const users = getUsers();
    users[email] = {
      password,
      gangs: [],
      weapons: [],
      equipment: [],
      gangerTemplates: [],
    };
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  export function setCurrentUser(email) {
    localStorage.setItem("currentUser", email);
  }
  
  export function getCurrentUser() {
    return localStorage.getItem("currentUser");
  }
  
  export function logout() {
    localStorage.removeItem("currentUser");
  }
  