
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

function updateSalaryType() {
    const weeklyRadio = document.getElementById('weekly');
    const monthlyRadio = document.getElementById('monthly');
    const hourlyRadio = document.getElementById('hourly');

    if (weeklyRadio.checked) {
        // Handle the logic for weekly choice
    } else if (monthlyRadio.checked) {
        // Handle the logic for monthly choice
    } else if (hourlyRadio.checked) {
        // Handle the logic for hourly choice
    }
}

function toggleShowMoreCategories() {
    const additionalCategories = document.getElementById('additionalCategories');
    additionalCategories.classList.toggle('hidden');

    // Toggle the button text between "Show More" and "Show Less"
    const showMoreButton = document.querySelector('#categoryContent button');
    showMoreButton.textContent = additionalCategories.classList.contains('hidden') ? '+ Show More' : '- Show Less';
}

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
