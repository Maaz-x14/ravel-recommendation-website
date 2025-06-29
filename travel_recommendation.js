async function search() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!input.trim()) {
    container.innerHTML = "<p>Please enter a keyword to search.</p>";
    return;
  }

  const res = await fetch("travel_recommendation_api.json");
  const data = await res.json();
  const results = [];

  const keywords = input.toLowerCase();

  if (keywords.includes("beach")) results.push(...data.beaches);
  if (keywords.includes("temple")) results.push(...data.temples);
  if (keywords.includes("country") || keywords.includes("countries")) {
    data.countries.forEach(c => results.push(...c.cities));
  }

  if (results.length === 0) {
    container.innerHTML = "<p>No matches found.</p>";
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.className = "recommendation";
    div.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(div);
  });
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}

// Optional: Show local time of a specific recommendation
const options = { timeZone: 'Asia/Tokyo', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' };
const localTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in Tokyo:", localTime);
