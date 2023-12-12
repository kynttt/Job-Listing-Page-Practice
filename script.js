// Salary Sliding Bar
function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    const button = document.querySelector(`button[onclick="toggleContent('${contentId}')"]`);

    content.classList.toggle('hidden');
    button.textContent = content.classList.contains('hidden') ? '+' : '-';
}


function updateSalaryValue() {
    const range = document.getElementById('salaryRange');
    const valueDisplay = document.getElementById('salaryValue');
    valueDisplay.textContent = range.value;
}



// Salary Buttons
function updateSalaryType(type) {
    // Your existing logic to handle the selected salary type
}

// Function to highlight the selected radio button
function highlightRadio(id) {
    // Remove 'bg-selected' class from all labels
    document.querySelectorAll('.salary-type-label').forEach(function (label) {
        label.classList.remove('bg-selected');
    });

    // Add 'bg-selected' class to the clicked label
    document.querySelector(`[for="${id}"]`).classList.add('bg-selected');
}



// Category
function toggleShowMoreCategories() {
    const additionalCategories = document.getElementById('additionalCategories');
    additionalCategories.classList.toggle('hidden');

    // Toggle the button text between "Show More" and "Show Less"
    const showMoreButton = document.querySelector('#categoryContent button');
    showMoreButton.textContent = additionalCategories.classList.contains('hidden') ? '+ Show More' : '- Show Less';
}

// Salary
function updateSalaryType(selectedType) {
    const labels = document.querySelectorAll('.salary-type-label');

    labels.forEach(label => {
        label.classList.remove('bg-primary', 'text-white'); // Remove the color from all labels
    });

    const selectedLabel = document.querySelector(`label[for="${selectedType}"]`);
    if (selectedLabel) {
        selectedLabel.classList.add('bg-primary', 'text-white'); // Add the color to the selected label
    }
}

// Initial setup to apply styles to the checked label
document.addEventListener('DOMContentLoaded', function () {
    const checkedInput = document.querySelector('input[name="salaryType"]:checked');
    if (checkedInput) {
        const selectedLabel = document.querySelector(`label[for="${checkedInput.id}"]`);
        if (selectedLabel) {
            selectedLabel.classList.add('bg-primary', 'text-white'); // Add the color to the selected label
        }
    }
});


// Tags
function toggleTag(button) {
    // Toggle 'bg-selected' class on the clicked button
    button.classList.toggle('bg-selected');
}



// Pagination
fetch('./pagination.html')
    .then(response => response.text())
    .then(html => {
        // Inject the content into the designated element
        document.getElementById('pagination').innerHTML = html;
    })
    .catch(error => console.error('Error fetching content:', error));



function applyFilters() {
    // Get selected location
    const selectedLocation = document.getElementById('location').value.toLowerCase();

    // Get selected job types
    const jobTypes = document.getElementsByName('jobType');
    const selectedJobTypes = Array.from(jobTypes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.toLowerCase());

    console.log('Selected Location:', selectedLocation);
    console.log('Selected Job Types:', selectedJobTypes);

    // Fetch data and apply filters
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log('Original Data:', data);

            // Apply filters
            const filteredData = data.filter(item => {
                const locationFilter = selectedLocation === 'all' || item.location.toLowerCase() === selectedLocation;
                const jobTypeFilter = selectedJobTypes.length === 0 || selectedJobTypes.some(type => type === item.jobType.toLowerCase());
                return jobTypeFilter && locationFilter; // Ensure location filter is applied after job type filter
            });

            console.log('Filtered Data:', filteredData);

            // Display counts
            displayFilterCounts(selectedLocation, filteredData.length);

            // Render filtered cards
            renderCards(filteredData);
        })
        .catch(error => console.error('Error fetching or filtering data:', error));
}

function displayFilterCounts(selectedLocation, count) {
    const filterCountElement = document.getElementById('filterCount');
    const locationText = selectedLocation === 'all' ? 'All locations' : `Location: ${selectedLocation}`;
    filterCountElement.textContent = count > 0 ? `Showing ${count} jobs | ${locationText}` : `No jobs match the filters | ${locationText}`;
}










// Additional functions for toggling content and updating UI
function toggleContent(id) {
    const content = document.getElementById(id);
    content.classList.toggle('hidden');
}

// Function to render cards
function renderCards(data) {
    const cardSection = document.getElementById('cardSection');
    cardSection.innerHTML = ''; // Clear existing cards

    // Loop through the data and create cards
    data.forEach(item => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container bg-white p-3 rounded-lg shadow-md m-3 ';

        cardContainer.innerHTML = `
                                            <div class="status-badge bg-secondary inline-block mb-4 py-1 px-4 rounded-full">
                                                <p class="text-gray-600 flex items-center">
                                                    <img src="${item.verificationBadge}" alt="Verification Badge" class="w-4 mr-2 inline-block">
                                                    ${item.companyStatus}
                                                </p>
                                            </div>
                                            <div class="company-details flex items-center leading-3 mb-3">
                                                <img src="${item.companyLogo}" alt="${item.companyName} Logo" class="w-10 h-10 mr-4">
                                                <div>
                                                    <p class="text-gray-600 text-xs">${item.location}</p>
                                                    <h2 class="text-lg font-bold">${item.companyName}</h2>
                                                </div>
                                            </div>
                                            <hr />
                                            <h2 class="job-title text-2xl my-4 font-semibold">${item.jobTitle}</h2>
                                            <p class="job-description text-gray-500 mb-5">${item.jobDescription}</p>
                                            <div class="job-info flex flex-row items-center">
                                                <div class="flex-grow">
                                                    <p class="job-info-item text-gray-500 flex items-center">
                                                        <img src="./assets/job-icon.png" alt="Job Icon" class="w-4 mr-2">
                                                        ${item.jobType}
                                                    </p>
                                                    <p class="job-info-item text-gray-500 flex items-center">
                                                        <img src="./assets/dollar.png" alt="Dollar Icon" class="w-4 mr-2">
                                                        ${item.salaryRange}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button class="apply-button bg-primary font-normal text-white px-8 py-2 rounded text-xs">
                                                        APPLY NOW
                                                    </button>
                                                </div>
                                            </div>
                                        `;

        cardSection.appendChild(cardContainer);
    });
}

function clearCards() {
    const cardSection = document.getElementById('cardSection');
    cardSection.innerHTML = '';
}
// End of Function to render cards





// Sidebar
fetch('sidebar.html')
    .then(response => response.text())
    .then(content => {
        document.getElementById('sidebar').innerHTML = content;
    })
    .catch(error => console.error('Error fetching sidebar content:', error));


// Sidebar Toggle
function toggleSide() {
    var sidebarContainer = document.getElementById('sidebarContainer');

    // If the container is currently hidden, load the content from sidebarsm.html
    if (sidebarContainer.style.display === 'none') {
        loadSidebarContent();
    }

    // Toggle the visibility of the container
    sidebarContainer.style.display = sidebarContainer.style.display === 'none' ? 'block' : 'none';
}

function loadSidebarContent() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Update the content of the sidebarContainer with the loaded HTML
            document.getElementById('sidebarContainer').innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', 'sidebarSm.html', true);
    xhr.send();
}


// Filter Button
function toggleTag(button) {
    // Toggle 'bg-selected' class on the clicked button
    button.classList.toggle('bg-selected');
}










// Function for pagination responsiveness
// Load data from JSON file
let dataArray = [];

async function loadData() {
    try {
        const response = await fetch('./data.json');
        dataArray = await response.json();
        updateDisplayedData();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Pagination variables
const itemsPerPage = 6;
let currentPage = 1;


// Function to update displayed data based on the current page
function updateDisplayedData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage - 1;
    const displayedData = dataArray.slice(startIndex, endIndex + 1);

    // Clear previous content
    clearCards();

    // Update pagination info
    document.getElementById('start-index').textContent = startIndex + 1;
    document.getElementById('end-index').textContent = Math.min(endIndex + 1, dataArray.length);
    document.getElementById('total-results').textContent = dataArray.length;

    // Call renderCards to display the current set of data
    renderCards(displayedData);

    // Generate dynamic pagination links
    generatePaginationLinks();
}


// Function to handle page navigation
function goToPage(page) {
    if (page >= 1 && page <= Math.ceil(dataArray.length / itemsPerPage)) {

        currentPage = page;
        updateDisplayedData();
    }
}


// Function to generate dynamic pagination links
function generatePaginationLinks() {
    const paginationContainer = document.getElementById('pagination1');
    paginationContainer.innerHTML = ''; // Clear previous pagination links

    const totalPages = Math.ceil(dataArray.length / itemsPerPage);

    // Previous page link
    const prevPage = document.createElement('a');
    prevPage.href = '#';
    prevPage.textContent = 'Previous';
    prevPage.classList.add('relative', 'inline-flex', 'items-center', 'rounded-l-md', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    prevPage.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage(currentPage - 1);
    });
    paginationContainer.appendChild(prevPage);

    // Individual page links
    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = i;
        link.setAttribute('data-page', i);
        link.classList.add('relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'text-sm', 'font-semibold', 'text-gray-900', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
        if (i === currentPage) {
            link.classList.add('bg-primary', 'text-black');
        }
        link.addEventListener('click', (event) => {
            event.preventDefault();
            goToPage(i);
        });
        paginationContainer.appendChild(link);
    }

    // Next page link
    const nextPage = document.createElement('a');
    nextPage.href = '#';
    nextPage.textContent = 'Next';
    nextPage.classList.add('relative', 'inline-flex', 'items-center', 'rounded-r-md', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    nextPage.addEventListener('click', (event) => {
        event.preventDefault();
        goToPage(currentPage + 1);
    });
    paginationContainer.appendChild(nextPage);
}

// Initial update to display data on page load
loadData();







