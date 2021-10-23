async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#sign-up-user").value.trim();
    const email = document.querySelector("#sign-up-email").value.trim();
    const password = document.querySelector("#sign-up-password").value.trim();

    if (username && email && password) {
        const response = await fetch("api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log("success");
        } else {
            response.statusText;
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trime();

    if (email && password) {
        const response = await fetch("api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/");
        } else {
            response.statusText;
        }
    }
}

document.querySelector(".sign-up-form").addEventListener("submit", signupFormHandler);
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
