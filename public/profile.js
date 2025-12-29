(async () => {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");

  const res = await fetch("http://localhost:5000/profile/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) window.location.href = "dashboard.html";
})();

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

  const response = await fetch("http://localhost:5000/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const err = await response.json();
    if (err.message === "Profile already exists") {
      alert("You already created a profile. Redirecting...");
      return (window.location.href = "dashboard.html");
    }

    alert(err.message || "Something went wrong");
    return;
  }

  const data = await response.json();
  console.log("Success:", data);

  if (response.status === 201) {
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Next page (we will build)
    }, 800);
  }
});
