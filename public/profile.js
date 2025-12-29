const form = document.getElementById("profileForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in first");
    window.location.href = "login.html";
    return;
  }

  const profileData = {
    age: document.getElementById("age").value,
    industry: document.getElementById("industry").value,
    role: document.getElementById("role").value,
    skills: document
      .getElementById("skills")
      .value.split(",")
      .map((s) => s.trim()),
    hobbies: document
      .getElementById("hobbies")
      .value.split(",")
      .map((h) => h.trim()),
    bio: document.getElementById("bio").value,
    location: document.getElementById("location").value,
  };

  const response = await fetch("http://localhost:5000/profile/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  document.getElementById("profileResponse").innerText = data.message;

  if (response.status === 201) {
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Next page (we will build)
    }, 800);
  }
});
