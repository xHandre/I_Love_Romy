const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const wrongAnswer = document.getElementById("wrong-answer");
const wrapper = document.querySelector(".wrapper");

let noClickCount = 0; // Track how many times "No" is clicked

// Function to handle when any "Yes" button is clicked
function handleYesClick() {
    question.innerHTML = "Being with you is my biggest blessing. I love you.";
    gif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGNhdXh1b252b2F2b2U4cHRlNGkwMDZsajllaGF1cDJyb2p4NXl2YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G6N0pDDgDpLjUvNoyQ/giphy.gif";

    // Hide all Yes buttons and the No button
    document.querySelectorAll(".yes-btn").forEach(btn => btn.style.display = "none");
    noBtn.style.display = "none";

    // Remove the "Wrong Answer" message immediately
    wrongAnswer.classList.remove("flash");
    wrongAnswer.classList.add("hidden");
}

// When the main "Yes" button is clicked, trigger handleYesClick
yesBtn.addEventListener("click", handleYesClick);

// When "No" is clicked
noBtn.addEventListener("click", () => {
    noClickCount++; // Increase the counter
    moveNoButton(); // Move the "No" button
    createExtraYesButtons(noClickCount); // Add multiple "Yes" buttons
});

// Function to move the "No" button
function moveNoButton() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate max positions to ensure the button stays within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Generate new random positions
    const randomX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const randomY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    // Apply new positions
    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Show the "Wrong answer" overlay
    wrongAnswer.classList.remove("hidden");
    wrongAnswer.classList.add("flash");

    // Hide after 0.7 seconds
    setTimeout(() => {
        wrongAnswer.classList.remove("flash");
        wrongAnswer.classList.add("hidden");
    }, 2000);
}

// Function to create multiple "Yes" buttons based on noClickCount
function createExtraYesButtons(count) {
    for (let i = 0; i < count; i++) {
        createSingleYesButton();
    }
}

// Function to create a single "Yes" button inside the wrapper
function createSingleYesButton() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate max positions within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Generate new random positions
    const randomX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const randomY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    // Create a new Yes button
    const newYesBtn = document.createElement("button");
    newYesBtn.innerText = "Yes";
    newYesBtn.classList.add("yes-btn"); // Keep styling consistent
    newYesBtn.style.position = "absolute";
    newYesBtn.style.left = `${randomX}px`;
    newYesBtn.style.top = `${randomY}px`;

    // Attach Yes button functionality
    newYesBtn.addEventListener("click", handleYesClick);

    // Append the new Yes button inside the wrapper
    wrapper.appendChild(newYesBtn);
}
