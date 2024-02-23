let loginForm = document.getElementById("loginForm");
let notification = document.querySelector(".notification");
let loginBtn = document.querySelector(".login-btn");
let loader = document.querySelector(".loading");

// Authenticated User

let isUserAuthenticated = sessionStorage.getItem("authenticated-user");

isUserAuthenticated ? (window.location.href = "index.html") : null;

// registredUser
let registeredUsers = [];

const isRegisteredUserAvailable = sessionStorage.getItem("registeredUser");
registeredUsers = isRegisteredUserAvailable
  ? JSON.parse(isRegisteredUserAvailable)
  : [];

console.log(registeredUsers);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  loginBtn.innerText = "processing...";
  loader.classList.remove("hide");

  let isUserAuthenticated = registeredUsers.find(
    (user) => user.email === email
  );

  setTimeout(() => {
    if (isUserAuthenticated !== undefined) {
      if (isUserAuthenticated.password === password) {
        notification.innerText = "Login Successfull";
        notification.classList.remove("hide-notification");
        sessionStorage.setItem(
          "authenticated-user",
          JSON.stringify(isUserAuthenticated)
        );

        setTimeout(() => {
          notification.classList.add("hide-notification");
          window.location.href = "ticketing-home.html";
        }, 3000);
      } else {
        notification.innerText = "Password incorrect";
        notification.classList.remove("hide-notification");
        setTimeout(() => {
          notification.classList.add("hide-notification");
        }, 4000);
      }
    } else {
      notification.innerText = "Account not found";
      notification.classList.remove("hide-notification");

      setTimeout(() => {
        notification.classList.add("hide-notification");
      }, 4000);
    }

    loginBtn.innerText = "Login";
    loader.classList.add("hide");
  }, 2000);
});

