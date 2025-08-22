// Main JavaScript for PG Portal
document.addEventListener("DOMContentLoaded", function () {
  // Initialize tabs
  initTabs();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize mobile menu if needed
  initMobileMenu();

  // Load all data
  loadAllData();
});

// Tab functionality
function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");

  // Set first tab as active by default
  if (tabs.length > 0 && tabContents.length > 0) {
    tabs[0].classList.add("active");
    tabContents[0].classList.add("active");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetId = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding content
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");

        // Smooth scroll to top if on mobile
        if (window.innerWidth < 768) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const navHeight = document.querySelector(".nav-container").offsetHeight;
        const totalOffset = headerHeight + navHeight;

        const targetPosition = targetElement.offsetTop - totalOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  // Add mobile menu toggle if needed
  const navContainer = document.querySelector(".nav-container");

  if (navContainer) {
    // Add mobile menu button for very small screens
    if (window.innerWidth < 480) {
      const mobileToggle = document.createElement("button");
      mobileToggle.className = "mobile-toggle";
      mobileToggle.innerHTML = "☰";
      mobileToggle.style.cssText = `
                display: none;
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                z-index: 101;
            `;

      navContainer.style.position = "relative";
      navContainer.appendChild(mobileToggle);

      mobileToggle.addEventListener("click", function () {
        const navTabs = document.querySelector(".nav-tabs");
        navTabs.style.display =
          navTabs.style.display === "none" ? "flex" : "none";
      });

      // Show mobile toggle on very small screens
      if (window.innerWidth < 480) {
        mobileToggle.style.display = "block";
        document.querySelector(".nav-tabs").style.display = "none";
      }
    }
  }
}

// Add loading states to content
function addLoadingStates() {
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach((content) => {
    if (!content.querySelector(".exam-card")) {
      content.innerHTML = '<div class="loading">Loading content...</div>';
    }
  });
}

// Utility function to create exam cards dynamically
function createExamCard(examData) {
  const card = document.createElement("div");
  card.className = "exam-card";

  card.innerHTML = `
        <div class="exam-name">${examData.name}</div>
        <div class="exam-details">
            ${
              examData.eligibility
                ? `
                <div class="detail-section">
                    <h4>📋 Eligibility</h4>
                    <ul>
                        ${examData.eligibility
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              examData.syllabus
                ? `
                <div class="detail-section">
                    <h4>📚 Syllabus</h4>
                    <ul>
                        ${examData.syllabus
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              examData.importantDates
                ? `
                <div class="detail-section">
                    <h4>📅 Important Dates</h4>
                    <ul>
                        ${examData.importantDates
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              examData.applicationProcess
                ? `
                <div class="detail-section">
                    <h4>📝 Application Process</h4>
                    <ul>
                        ${examData.applicationProcess
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              examData.website
                ? `
                <div class="detail-section">
                    <h4>🌐 Official Website</h4>
                    <a href="${examData.website}" target="_blank" class="btn btn-secondary">Visit Website</a>
                </div>
            `
                : ""
            }
        </div>
    `;

  return card;
}

// Search functionality (can be extended later)
function initSearch() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const examCards = document.querySelectorAll(".exam-card");

      examCards.forEach((card) => {
        const examName = card
          .querySelector(".exam-name")
          .textContent.toLowerCase();
        const examDetails = card.textContent.toLowerCase();

        if (examName.includes(searchTerm) || examDetails.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
}

// Filter functionality (can be extended later)
function initFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterType = this.getAttribute("data-filter");

      // Remove active class from all filter buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Apply filter logic here
      console.log("Filter applied:", filterType);
    });
  });
}

// Lazy loading for images (if any)
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Handle window resize
window.addEventListener("resize", function () {
  // Reinitialize mobile menu on resize
  initMobileMenu();
});

// Add some interactive features
function addInteractiveFeatures() {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".card, .exam-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click to expand functionality for detail sections
  const detailSections = document.querySelectorAll(".detail-section");

  detailSections.forEach((section) => {
    const toggle = document.createElement("button");
    toggle.className = "detail-toggle";
    toggle.innerHTML = "▼";
    toggle.style.cssText = `
            background: none;
            border: none;
            color: var(--accent-color);
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            margin-left: auto;
        `;

    const header = section.querySelector("h4");
    if (header) {
      header.style.display = "flex";
      header.appendChild(toggle);

      toggle.addEventListener("click", function () {
        const content = section.querySelector("ul, .btn");
        if (content) {
          content.style.display =
            content.style.display === "none" ? "block" : "none";
          this.innerHTML = content.style.display === "none" ? "▼" : "▲";
        }
      });
    }
  });
}

// Initialize additional features when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add interactive features
  addInteractiveFeatures();

  // Initialize search if search input exists
  initSearch();

  // Initialize filters if filter buttons exist
  initFilters();

  // Initialize lazy loading
  initLazyLoading();
});

// Function to load home content
async function loadHome() {
  try {
    const response = await fetch("data/home.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("home-container");
    if (!container) return;

    if (data.categories && data.categories.length > 0) {
      container.innerHTML = "";

      // Create grid layout for categories
      const grid3 = document.createElement("div");
      grid3.className = "grid grid-3";

      const grid2 = document.createElement("div");
      grid2.className = "grid grid-2";

      // First 3 categories go to grid-3
      data.categories.slice(0, 3).forEach((category) => {
        const categoryCard = document.createElement("div");
        categoryCard.className = "card";
        categoryCard.innerHTML = `
          <h3>${category.icon} ${category.name}</h3>
          <p>${category.description}</p>
          <button class="btn" onclick="switchTab('entrance_exams')">Explore ${category.name}</button>
        `;
        grid3.appendChild(categoryCard);
      });

      // Next 2 categories go to grid-2
      data.categories.slice(3, 5).forEach((category) => {
        const categoryCard = document.createElement("div");
        categoryCard.className = "card";
        categoryCard.innerHTML = `
          <h3>${category.icon} ${category.name}</h3>
          <p>${category.description}</p>
          <button class="btn btn-secondary" onclick="switchTab('entrance_exams')">Explore ${category.name}</button>
        `;
        grid2.appendChild(categoryCard);
      });

      container.appendChild(grid3);
      container.appendChild(grid2);
    } else {
      container.innerHTML =
        '<div class="card"><p>No categories available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading home content:", error);
    const container = document.getElementById("home-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading home content. Please try again later.</p></div>';
    }
  }
}

// Data Loading Functions
async function loadAllData() {
  try {
    // Check if we're running on a web server or locally
    if (window.location.protocol === "file:") {
      throw new Error(
        'This page must be served from a web server due to CORS restrictions. Please use a local server like "python3 -m http.server 8000" and access via http://localhost:8000'
      );
    }

    // Load data for each section from separate files
    await Promise.all([
      loadHome(),
      loadEntranceExams(),
      loadTopInstitutes(),
      loadScholarships(),
      loadEligibilityCriteria(),
      loadResources(),
    ]);
  } catch (error) {
    console.error("Error loading data:", error);
    // Show fallback content with helpful error message
    showFallbackContent(error.message);
  }
}

// Function to load entrance exams
async function loadEntranceExams() {
  try {
    const response = await fetch("data/entrance_exams.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("entrance-exams-container");
    if (!container) return;

    if (data.exams && data.exams.length > 0) {
      container.innerHTML = "";
      data.exams.forEach((exam) => {
        const examCard = createEntranceExamCard(exam);
        container.appendChild(examCard);
      });
    } else {
      container.innerHTML =
        '<div class="card"><p>No exam information available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading entrance exams:", error);
    const container = document.getElementById("entrance-exams-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading exam information. Please try again later.</p></div>';
    }
  }
}

// Function to load top institutes
async function loadTopInstitutes() {
  try {
    const response = await fetch("data/top_institutes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("top-institutes-container");
    if (!container) return;

    if (data.institutes && data.institutes.length > 0) {
      container.innerHTML = "";
      data.institutes.forEach((institute) => {
        const instituteCard = createInstituteCard(institute);
        container.appendChild(instituteCard);
      });
    } else {
      container.innerHTML =
        '<div class="card"><p>No institute information available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading top institutes:", error);
    const container = document.getElementById("top-institutes-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading institute information. Please try again later.</p></div>';
    }
  }
}

// Function to load scholarships
async function loadScholarships() {
  try {
    const response = await fetch("data/scholarships.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("scholarships-container");
    if (!container) return;

    if (data.scholarships && data.scholarships.length > 0) {
      container.innerHTML = "";
      data.scholarships.forEach((scholarship) => {
        const scholarshipCard = createScholarshipCard(scholarship);
        container.appendChild(scholarshipCard);
      });
    } else {
      container.innerHTML =
        '<div class="card"><p>No scholarship information available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading scholarships:", error);
    const container = document.getElementById("scholarships-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading scholarship information. Please try again later.</p></div>';
    }
  }
}

// Function to load eligibility criteria
async function loadEligibilityCriteria() {
  try {
    const response = await fetch("data/eligibility_criteria.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("eligibility-container");
    if (!container) return;

    if (data.programs && data.programs.length > 0) {
      container.innerHTML = "";
      data.programs.forEach((program) => {
        const programCard = createEligibilityCard(program);
        container.appendChild(programCard);
      });
    } else {
      container.innerHTML =
        '<div class="card"><p>No eligibility information available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading eligibility criteria:", error);
    const container = document.getElementById("eligibility-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading eligibility information. Please try again later.</p></div>';
    }
  }
}

// Function to load resources
async function loadResources() {
  try {
    const response = await fetch("data/resources.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById("resources-container");
    if (!container) return;

    container.innerHTML = "";

    if (data.sections && data.sections.length > 0) {
      data.sections.forEach((section) => {
        const sectionCard = document.createElement("div");
        sectionCard.className = "card";
        sectionCard.innerHTML = `
                  <h3>${section.title}</h3>
                  <ul>
                      ${section.items
                        .map((item) => `<li>${item}</li>`)
                        .join("")}
                  </ul>
              `;
        container.appendChild(sectionCard);
      });
    } else {
      container.innerHTML =
        '<div class="card"><p>No resources available at the moment.</p></div>';
    }
  } catch (error) {
    console.error("Error loading resources:", error);
    const container = document.getElementById("resources-container");
    if (container) {
      container.innerHTML =
        '<div class="card"><p>Error loading resource information. Please try again later.</p></div>';
    }
  }
}

// Function to create entrance exam card
function createEntranceExamCard(exam) {
  const card = document.createElement("div");
  card.className = "exam-card";

  card.innerHTML = `
        <div class="exam-name">${exam.name}</div>
        <div class="exam-details">
            <div class="detail-section">
                <h4>📋 Category & Programs</h4>
                <p><strong>Category:</strong> ${exam.category}</p>
                <p><strong>Programs:</strong> ${exam.programs.join(", ")}</p>
            </div>
            
            ${
              exam.eligibility
                ? `
                <div class="detail-section">
                    <h4>📋 Eligibility</h4>
                    <ul>
                        ${exam.eligibility
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              exam.syllabus
                ? `
                <div class="detail-section">
                    <h4>📚 Syllabus</h4>
                    <ul>
                        ${exam.syllabus
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              exam.importantDates
                ? `
                <div class="detail-section">
                    <h4>📅 Important Dates</h4>
                    <ul>
                        ${exam.importantDates
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              exam.applicationProcess
                ? `
                <div class="detail-section">
                    <h4>📝 Application Process</h4>
                    <ul>
                        ${exam.applicationProcess
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            
            ${
              exam.website
                ? `
                <div class="detail-section">
                    <h4>🌐 Official Website</h4>
                    <a href="${exam.website}" target="_blank" class="btn btn-secondary">Visit Website</a>
                </div>
            `
                : ""
            }
        </div>
    `;

  return card;
}

// Function to create institute card
function createInstituteCard(institute) {
  const card = document.createElement("div");
  card.className = "exam-card";

  card.innerHTML = `
        <div class="exam-name">${institute.name}</div>
        <div class="exam-details">
            <div class="detail-section">
                <h4>🎓 Programs Offered</h4>
                <ul>
                    ${institute.programs
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>🔬 Specializations</h4>
                <ul>
                    ${institute.specializations
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            ${
              institute.website
                ? `
                <div class="detail-section">
                    <h4>🌐 Official Website</h4>
                    <a href="${institute.website}" target="_blank" class="btn btn-secondary">Visit Website</a>
                </div>
            `
                : ""
            }
        </div>
    `;

  return card;
}

// Function to create scholarship card
function createScholarshipCard(scholarship) {
  const card = document.createElement("div");
  card.className = "exam-card";

  card.innerHTML = `
        <div class="exam-name">${scholarship.name}</div>
        <div class="exam-details">
            <div class="detail-section">
                <h4>📋 Eligibility</h4>
                <p>${scholarship.eligibility}</p>
            </div>
            
            <div class="detail-section">
                <h4>💰 Coverage</h4>
                <p>${scholarship.coverage}</p>
            </div>
            
            <div class="detail-section">
                <h4>📝 Application</h4>
                <p>${scholarship.application}</p>
            </div>
        </div>
    `;

  return card;
}

// Function to create eligibility card
function createEligibilityCard(program) {
  const card = document.createElement("div");
  card.className = "exam-card";

  card.innerHTML = `
        <div class="exam-name">${program.name}</div>
        <div class="exam-details">
            <div class="detail-section">
                <h4>📋 Eligibility</h4>
                <ul>
                    ${program.eligibility
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="detail-section">
                <h4>⏱️ Duration</h4>
                <p><strong>${program.duration}</strong></p>
            </div>
            
            <div class="detail-section">
                <h4>🎯 Specializations</h4>
                <ul>
                    ${program.specializations
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `;

  return card;
}

// Function to show fallback content
function showFallbackContent(errorMessage) {
  const containers = [
    "entrance-exams-container",
    "top-institutes-container",
    "scholarships-container",
    "eligibility-container",
  ];

  containers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      if (errorMessage && errorMessage.includes("CORS")) {
        container.innerHTML = `
                    <div class="card">
                        <h3>🚫 CORS Error - Local File Access</h3>
                        <p><strong>Problem:</strong> ${errorMessage}</p>
                        <p><strong>Solution:</strong> You need to access this website through a web server, not by opening the HTML file directly.</p>
                        <div style="background: #f0f8ff; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                            <h4>To fix this:</h4>
                            <ol>
                                <li>Open terminal/command prompt in this folder</li>
                                <li>Run: <code>python3 -m http.server 8000</code></li>
                                <li>Open your browser and go to: <code>http://localhost:8000</code></li>
                            </ol>
                        </div>
                        <p><em>This is a browser security feature that prevents local files from making network requests.</em></p>
                    </div>
                `;
      } else {
        container.innerHTML = `
                    <div class="card">
                        <h3>Information Temporarily Unavailable</h3>
                        <p>We're currently updating our database. Please check back soon for the latest information.</p>
                        ${
                          errorMessage
                            ? `<p><strong>Error:</strong> ${errorMessage}</p>`
                            : ""
                        }
                    </div>
                `;
      }
    }
  });
}
