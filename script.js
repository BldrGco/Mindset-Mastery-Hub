// Initialize
let day = localStorage.getItem('day') ? parseInt(localStorage.getItem('day')) : 1;
let journalData = JSON.parse(localStorage.getItem('journalData')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];
let moodData = JSON.parse(localStorage.getItem('moodData')) || [];

document.getElementById('current-day').textContent = day;
document.documentElement.style.setProperty('--progress', (day / 90) * 100);

// Save Journal
function saveJournal() {
    const entry = document.getElementById('journal-entry').value;
    if (entry) {
        journalData.push({ day, text: entry, date: new Date().toLocaleDateString() });
        localStorage.setItem('journalData', JSON.stringify(journalData));
        document.getElementById('journal-entry').value = '';
        updateDay();
    }
}

// Add Goal
function addGoal() {
    const goal = document.getElementById('goal-input').value;
    if (goal) {
        goals.push(goal);
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
        document.getElementById('goal-input').value = '';
    }
}

function displayGoals() {
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = goals.map(g => `<li>${g}</li>`).join('');
}

// Update Day & Progress
function updateDay() {
    day++;
    localStorage.setItem('day', day);
    document.getElementById('current-day').textContent = day;
    document.documentElement.style.setProperty('--progress', (day / 90) * 100);
    updateMoodChart();
}

// Mood Chart (example data for now)
function updateMoodChart() {
    const mood = prompt("Rate your mood today (1-10):"); // Replace with daily input later
    if (mood) {
        moodData.push(parseInt(mood));
        localStorage.setItem('moodData', JSON.stringify(moodData));
    }

    const ctx = document.getElementById('mood-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: moodData.map((_, i) => `Day ${i + 1}`),
            datasets: [{
                label: 'Mood',
                data: moodData,
                borderColor: '#60a5fa',
                fill: false,
            }]
        },
        options: {
            scales: { y: { min: 1, max: 10 } }
        }
    });
}

// Load Initial Data
displayGoals();
updateMoodChart();
