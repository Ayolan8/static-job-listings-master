const postContainer = document.getElementById("post-container");

fetch('./data.json').then((res) => res.json())
.then((data) => {
   displayJobs(data);
}).catch(() => postContainer.innerHTML = `There is an error loading this page`);

const displayJobs = (jobs) => {
   jobs.forEach(({id, company, logo, isNew, featured, position, role,
   level, postedAt, contract, location, languages, tools}, index) => {
    postContainer.innerHTML += `
    <div id="${id}"class="job-card ${isNew && featured ? "listing-border" : " "}">
      <div class="listing ">
          <img src="${logo}" alt="logo">
          <div class="job-details">
              <p class="job-desc">${company}<span class="btn-container">
              ${isNew || featured ? `<button class="new">NEW!</button>
              <button class="featured">${featured ? "FEATURED" : ""}</button>`: ``}
            </span>
                  
              </p>
              <!-- </div> -->
              <h3 class="position">${position}</h3>
              <div class="about">
                  <span>${postedAt}</span> 
                  <div class="dot"></div>
                  <span>${contract}</span>
                  <div class="dot"></div>
                  <span>${location}</span>
              </div>
          </div>
      </div>

      <div class="hide"></div>

      <div class="roles-languages">
          <p>${role}</p>
          <p>${level}</p>
          ${languages.map(lang => `<p>${lang}</p>`).join('')}
          ${tools.map(tool => `<p>${tool}</p>`).join('')}
      </div>
  </div>
      `
   })
}
