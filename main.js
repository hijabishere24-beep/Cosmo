// Filter Album Items by Category
function filterGallery(category, button) {
  // Update active button state
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // Show/Hide matching items
  const items = document.querySelectorAll('.album-item');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
// Toggle card spec details
function toggleDetails(button) {
  const detailsBox = button.nextElementSibling;
  
  if (detailsBox.style.display === 'block') {
    detailsBox.style.display = 'none';
    button.textContent = 'View Specs';
  } else {
    detailsBox.style.display = 'block';
    button.textContent = 'Hide Specs';
  }
}

// Filter Planet Cards by Category
function filterPlanets(category, button) {
  // Update active state on filter buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // Show/Hide matching planet cards
  const planets = document.querySelectorAll('.planet-item');
  planets.forEach(planet => {
    if (category === 'all' || planet.classList.contains(category)) {
      planet.style.display = 'block';
    } else {
      planet.style.display = 'none';
    }
  });
}
// Fetch NASA Live APOD Data on Page Load
document.addEventListener("DOMContentLoaded", () => {
  const apodContainer = document.getElementById("apod-feed");
  
  if (apodContainer) {
    // NASA Open API endpoint (DEMO_KEY is provided free by NASA for development)
    const apiKey = "DEMO_KEY"; 
    const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(nasaUrl)
      .then((response) => response.json())
      .then((data) => {
        let mediaHtml = "";

        // Check if the daily release is a video or an image
        if (data.media_type === "video") {
          mediaHtml = `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin: 1.5rem 0;">
              <iframe src="${data.url}" frameborder="0" allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%;"></iframe>
            </div>`;
        } else {
          mediaHtml = `
            <img src="${data.url}" alt="${data.title}" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 8px; margin: 1.5rem 0; border: 1px solid rgba(0,229,255,0.2);">`;
        }

        apodContainer.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
            <span style="color: #00e5ff; font-family: 'Orbitron', sans-serif; font-size: 0.85rem; letter-spacing: 1px;">🔴 LIVE NASA APOD RELEASE</span>
            <span style="color: #a0aec0; font-size: 0.85rem;">DATE: ${data.date}</span>
          </div>
          
          <h2 style="color: #fff; margin-top: 1.2rem; font-family: 'Orbitron', sans-serif;">${data.title}</h2>
          
          ${mediaHtml}
          
          <p style="color: #cbd5e0; line-height: 1.7; text-align: left; font-size: 1rem; margin-top: 1rem;">
            ${data.explanation}
          </p>
          
          <div style="margin-top: 1.5rem; text-align: right;">
            <span style="color: #a0aec0; font-size: 0.8rem;">Copyright: ${data.copyright ? data.copyright : 'Public Domain (NASA)'}</span>
          </div>
        `;
      })
      .catch((error) => {
        console.error("Error fetching NASA API:", error);
        apodContainer.innerHTML = `
          <p style="color: #ff4757; font-weight: 600;">Failed to establish direct connection with NASA API servers.</p>
          <p style="color: #a0aec0; font-size: 0.9rem;">Please check your internet connection or try again later.</p>
        `;
      });
  }
});