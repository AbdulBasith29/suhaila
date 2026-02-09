// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const questionContainer = document.getElementById('question-container');
    const response = document.getElementById('response');

    // Handle the "Yes" button click
    yesButton.addEventListener('click', () => {
        // Hide the question and show the response
        questionContainer.style.display = 'none';
        response.style.display = 'block';
        // Generate multiple hearts for the animation
        for (let i = 0; i < 50; i++) {
            createHeart();
        }
    });

    /**
     * Reposition the "No" button within the bounds of the question container.
     * The button is absolutely positioned relative to the container so each call
     * will place it at a new random location inside the card. This function
     * ensures the button stays visible and does not accumulate offsets from
     * previous moves.
     */
    function repositionNoButton() {
        // Ensure the noButton is absolutely positioned relative to the container
        noButton.style.position = 'absolute';
        // Get dimensions of the container and button
        const containerRect = questionContainer.getBoundingClientRect();
        const btnRect = noButton.getBoundingClientRect();
        // Compute maximum top/left values so the button remains inside
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        // Choose random coordinates within the allowed range
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        // Apply the new position
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    // Capture the initial position of the "No" button relative to its container so that
    // switching to absolute positioning doesn't cause it to jump to the top-left corner.
    {
        const containerRect = questionContainer.getBoundingClientRect();
        const initialRect = noButton.getBoundingClientRect();
        // Compute offsets relative to the container
        const offsetX = initialRect.left - containerRect.left;
        const offsetY = initialRect.top - containerRect.top;
        // Switch to absolute positioning using the calculated offsets
        noButton.style.position = 'absolute';
        noButton.style.left = `${offsetX}px`;
        noButton.style.top = `${offsetY}px`;
    }

    // Make the "No" button hard to click by moving it on hover
    noButton.addEventListener('mouseover', () => {
        repositionNoButton();
    });

    // Add a gentle warning and reposition when the "No" button is clicked
    noButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Are you sure? Please reconsider 😊');
        repositionNoButton();
    });

    // Function to create a single heart element and animate it
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤️';
        // Randomize initial horizontal position
        heart.style.left = Math.random() * 100 + 'vw';
        // Randomize animation duration for variety
        const duration = 5 + Math.random() * 5;
        heart.style.animationDuration = `${duration}s`;
        // Randomize heart size
        const size = 20 + Math.random() * 20;
        heart.style.fontSize = `${size}px`;
        document.body.appendChild(heart);
        // Remove the heart element after its animation completes to clean up the DOM
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
});

// Keep the 'No' button playful
