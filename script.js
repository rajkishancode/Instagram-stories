// App state
let currentUserIndex = 0;
let currentStoryIndex = 0;
let progressInterval;
let autoAdvanceInterval;
let isPaused = false;

// Stories data from JSON (embedded directly to avoid CORS issues)
const storiesData = [
    {
        "id": 1,
        "username": "mountain_explorer",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 3, "image": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 2,
        "username": "foodie_mike",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 3,
        "username": "adventure_sam",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 3, "image": "https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 4,
        "username": "art_lover",
        "avatar": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 5,
        "username": "fitness_guru",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 6,
        "username": "pet_lover",
        "avatar": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1514888286974-6d03bde4ba42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 3, "image": "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 7,
        "username": "city_lights",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    },
    {
        "id": 8,
        "username": "beach_days",
        "avatar": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        "stories": [
            { "id": 1, "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
            { "id": 2, "image": "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" }
        ]
    }
];

// DOM elements
const storiesList = document.getElementById('storiesList');
const storyViewer = document.getElementById('storyViewer');
const currentStoryImage = document.getElementById('currentStoryImage');
const currentUserAvatar = document.getElementById('currentUserAvatar');
const currentUsername = document.getElementById('currentUsername');
const currentTime = document.getElementById('currentTime');
const progressBars = document.getElementById('progressBars');
const closeStory = document.getElementById('closeStory');
const prevStory = document.getElementById('prevStory');
const nextStory = document.getElementById('nextStory');
const loadingIndicator = document.getElementById('loadingIndicator');

// Initialize the stories list
function initStoriesList() {
    storiesList.innerHTML = '';
    
    storiesData.forEach((user, index) => {
        const storyItem = document.createElement('div');
        storyItem.className = 'story-item';
        storyItem.dataset.index = index;
        
        storyItem.innerHTML = `
            <div class="story-avatar">
                <img src="${user.avatar}" alt="${user.username}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random'">
            </div>
            <div class="story-username">${user.username}</div>
        `;
        
        storyItem.addEventListener('click', () => openStory(index));
        storiesList.appendChild(storyItem);
    });
}

// Open story viewer for a specific user
function openStory(userIndex) {
    currentUserIndex = userIndex;
    currentStoryIndex = 0;
    
    // Show loading indicator
    loadingIndicator.style.display = 'block';
    currentStoryImage.classList.remove('active');
    
    // Show the story viewer
    storyViewer.classList.add('active');
    
    // Load the first story
    loadCurrentStory();
    
    // Start auto-advance
    startAutoAdvance();
}

// Load the current story
function loadCurrentStory() {
    const currentUser = storiesData[currentUserIndex];
    const currentStory = currentUser.stories[currentStoryIndex];
    
    // Update user info
    currentUsername.textContent = currentUser.username;
    currentUserAvatar.src = currentUser.avatar;
    currentUserAvatar.onerror = function() {
        this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=random`;
    };
    currentTime.textContent = `${Math.floor(Math.random() * 12) + 1}h ago`;
    
    // Create progress bars
    createProgressBars();
    
    // Load the image
    const img = new Image();
    img.onload = () => {
        currentStoryImage.src = currentStory.image;
        currentStoryImage.classList.add('active');
        loadingIndicator.style.display = 'none';
        startProgressBar();
    };
    
    img.onerror = () => {
        loadingIndicator.textContent = 'Failed to load story';
        // Try to load a fallback image after 2 seconds
        setTimeout(() => {
            img.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        }, 2000);
    };
    
    img.src = currentStory.image;
}

// Create progress bars for current user's stories
function createProgressBars() {
    progressBars.innerHTML = '';
    const currentUser = storiesData[currentUserIndex];
    
    currentUser.stories.forEach((story, index) => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'progress-fill';
        progressFill.id = `progress-${index}`;
        
        if (index < currentStoryIndex) {
            progressFill.style.width = '100%';
        } else if (index === currentStoryIndex) {
            progressFill.style.width = '0%';
        }
        
        progressBar.appendChild(progressFill);
        progressBars.appendChild(progressBar);
    });
}

// Start progress bar animation
function startProgressBar() {
    clearInterval(progressInterval);
    
    const progressFill = document.getElementById(`progress-${currentStoryIndex}`);
    if (!progressFill) return;
    
    let width = 0;
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    progressInterval = setInterval(() => {
        if (!isPaused) {
            width += increment;
            progressFill.style.width = `${width}%`;
            
            if (width >= 100) {
                clearInterval(progressInterval);
                nextStoryHandler();
            }
        }
    }, interval);
}

// Start auto-advance to next story
function startAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = setInterval(() => {
        if (!isPaused) {
            nextStoryHandler();
        }
    }, 5000);
}

// Go to next story
function nextStoryHandler() {
    const currentUser = storiesData[currentUserIndex];
    
    if (currentStoryIndex < currentUser.stories.length - 1) {
        // Go to next story in current user's stories
        currentStoryIndex++;
        loadCurrentStory();
    } else if (currentUserIndex < storiesData.length - 1) {
        // Go to next user's first story
        currentUserIndex++;
        currentStoryIndex = 0;
        loadCurrentStory();
    } else {
        // Reached the end, close story viewer
        closeStoryViewer();
    }
}

// Go to previous story
function prevStoryHandler() {
    if (currentStoryIndex > 0) {
        // Go to previous story in current user's stories
        currentStoryIndex--;
        loadCurrentStory();
    } else if (currentUserIndex > 0) {
        // Go to previous user's last story
        currentUserIndex--;
        currentStoryIndex = storiesData[currentUserIndex].stories.length - 1;
        loadCurrentStory();
    }
}

// Close story viewer
function closeStoryViewer() {
    storyViewer.classList.remove('active');
    clearInterval(progressInterval);
    clearInterval(autoAdvanceInterval);
    isPaused = false;
}

// Event listeners setup
function setupEventListeners() {
    closeStory.addEventListener('click', closeStoryViewer);
    
    prevStory.addEventListener('click', () => {
        prevStoryHandler();
        // Reset auto-advance timer
        clearInterval(autoAdvanceInterval);
        startAutoAdvance();
    });
    
    nextStory.addEventListener('click', () => {
        nextStoryHandler();
        // Reset auto-advance timer
        clearInterval(autoAdvanceInterval);
        startAutoAdvance();
    });

    // Pause auto-advance when user interacts with the story
    storyViewer.addEventListener('touchstart', () => {
        isPaused = true;
    });
    
    storyViewer.addEventListener('touchend', () => {
        isPaused = false;
    });

    // Mouse events for desktop testing
    storyViewer.addEventListener('mousedown', () => {
        isPaused = true;
    });
    
    storyViewer.addEventListener('mouseup', () => {
        isPaused = false;
    });
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initStoriesList();
});