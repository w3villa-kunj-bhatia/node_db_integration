//SIGNUP
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    const data = await response.json();
    document.getElementById("responseMessage").innerText = data.message;
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      }),
      mode: "cors",
    });

    const data = await response.json();
    document.getElementById("loginResponse").innerText = data.message;

    if (data.token) {
      localStorage.setItem("token", data.token);

      // Check if profile exists
      const check = await fetch("http://localhost:5000/profile/me", {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      });

      const result = await check.json();

      if (result.exists) {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "profile.html";
      }
    }
  });
}
