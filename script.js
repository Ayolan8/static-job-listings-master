const postContainer = document.getElementById("post-container");
const navLinks = document.getElementById("nav-links");
const clearBtn = document.getElementById("clear");
const nav = document.querySelector(".nav");
const main = document.getElementById("main");

const fetchData = () => {
    fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
        displayJobs(data);
     })
    .catch(() => postContainer.innerHTML = `There is an error loading this page`);
}

const displayJobs = (jobs) => {
   jobs.forEach(({id, company, logo, isNew, featured, position, role,
   level, postedAt, contract, location, languages, tools}, index) => {
    postContainer.innerHTML += `
    <div id="${id}" class="job-card ${isNew && featured ? "listing-border" : " "}">
      <div class="listing ">
          <img src="${logo}" alt="logo">
          <div class="job-details">
              <p class="job-desc">${company}<span class="btn-container">
              ${isNew || featured ? `<span class="new">NEW!</span>
              <span class="featured">${featured ? "FEATURED" : '' }</span>`: ``}
            </span>
                  
              </p>
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
          <p onclick="filterOut(this)">${role}</p>
          <p onclick="filterOut(this)">${level}</p>
          ${languages.map(lang => `<p onclick="filterOut(this)">${lang}</p>`).join('')}
          ${tools.map(tool => `<p onclick="filterOut(this)">${tool}</p>`).join('')}
      </div>
  </div>
      `
   })
}

// filter function
const filterOut = (el) => {
    const text = el.textContent;
    const link = document.createElement('a');
    link.href = "#";
    link.textContent = text;

    // Check if the element has been clicked before
    if (el.dataset.click === "true"){
        el.dataset.click = "false";
        // Remove the link if the element is clicked again
        const existingLink = document.querySelector(`.${text}`);
        if (existingLink) existingLink.remove();
    } else {
        el.dataset.click = "true";
        link.classList.add(text); // Add the text as a class to the link
        const closeBtn = document.createElement('span');
        closeBtn.textContent = 'X';
        closeBtn.onclick = function() {
            link.remove();
            Array.from(document.getElementsByClassName('job-card')).forEach(card => {
                if(card.textContent.includes(text)) {
                    card.style.display = 'flex';
                }
            });
        }
        link.appendChild(closeBtn);
        navLinks.appendChild(link);
    }

    Array.from(document.getElementsByClassName('job-card')).forEach(card => {
        if(!card.textContent.includes(text)) {
            card.style.display = 'none';
        }
    });
    nav.style.display = "flex";
    main.style.paddingTop = "8em";

}

clearBtn.addEventListener('click', function() {
    Array.from(document.getElementsByClassName('job-card')).forEach(card => {
        card.style.display = 'flex';
    });
    navLinks.innerHTML = '';
    nav.style.display = "none";
    main.style.paddingTop = "3.5em";
});


fetchData();