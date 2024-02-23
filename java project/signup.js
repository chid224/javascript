let signupForm = document.getElementById("signupForm");
let registerBtn = document.querySelector(".reg-btn");
let loader = document.querySelector(".loading");
let notification = document.querySelector(".notification");
let passwordIcon = document.querySelector(".password-icon");
let confirmPasswordIcon = document.querySelector(".confirm-password-icon");
let passwordInput = document.querySelector("#password-input");
let confirmPasswordInput = document.querySelector("#confirm-password-input");

let registeredUsers = [];

let isRegisteredUserAvailable = sessionStorage.getItem("registeredUser");
registeredUsers = isRegisteredUserAvailable
  ? JSON.parse(isRegisteredUserAvailable)
  : [];

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstname = e.target[0].value;
  const lastname = e.target[1].value;
  const email = e.target[2].value;
  const password = e.target[3].value;
  const confirmPassword = e.target[4].value;

  const user = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  };

  if (password !== confirmPassword) {
    notification.innerText = "Passwords does not match";
    notification.classList.remove("hide-notification");
    setTimeout(() => {
      notification.classList.add("hide-notification");
    }, 3000);
  } else {
    registerBtn.innerText = "Registering...";
    loader.classList.remove("hide");

    setTimeout(() => {
      let userAlreadyExist = registeredUsers.find(
        (regUser) => regUser.email === user.email
      );

      if (userAlreadyExist !== undefined) {
        notification.innerText = "Email Already Exist";
        notification.classList.remove("hide-notification");
        registerBtn.innerText = "Register";
        loader.classList.add("hide");

        setTimeout(() => {
          notification.classList.add("hide-notification");
        }, 2500);
      } else {
        notification.innerText = "Account Created Successfully!";
        notification.classList.remove("hide-notification");
        registerUser(user);
        signupForm.reset();
        registerBtn.innerText = "Register";
        loader.classList.add("hide");

        setTimeout(() => {
          notification.classList.add("hide-notification");
          window.location.href = "index.html";
        }, 2500);
      }
    }, 2500);
  }
});

const registerUser = (user) => {
  registeredUsers.push(user);
  sessionStorage.setItem("registeredUser", JSON.stringify(registeredUsers));
};

passwordIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

confirmPasswordIcon.addEventListener("click", () => {
  if (confirmPasswordInput.type === "password") {
    confirmPasswordInput.type = "text";
  } else {
    confirmPasswordInput.type = "password";
  }
});
