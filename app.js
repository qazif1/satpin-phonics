const words = [
  "at", "in", "an", "it", "is",
  "sat", "pin", "tap", "sip", "tan",
  "nap", "sit", "pat", "pit", "tip",
  "pan", "tin", "sap", "nip", "ant",
  "tap", "nap", "pin", "pat", "sip",
  "pit", "sat", "pan", "tin", "tip"
];

const wordSentences = {
  at: "Look at the cat.",
  in: "The ball is in the box.",
  an: "I see an apple.",
  it: "Point at it.",
  is: "This is a cat.",
  sat: "I sat on a mat.",
  pin: "This is a pin.",
  tap: "Turn off the tap.",
  sip: "I sip some tea.",
  tan: "He got a tan in the sun.",
  nap: "I will take a nap.",
  sit: "Please sit here.",
  pat: "Pat the dog gently.",
  pit: "A peach has a pit.",
  tip: "She gave a tip.",
  pan: "The pan is hot.",
  tin: "This is a tin can.",
  sap: "The tree sap is sticky.",
  nip: "The puppy will nip.",
  ant: "An ant is small."
};

let currentWord = "";
let currentIndex = 0;

// Display a new word
function displayWord() {
  if (currentIndex >= words.length) {
    alert("You have completed all words!");
    return;
  }

  currentWord = words[currentIndex];
  document.getElementById("wordContainer").innerHTML = "";
  document.getElementById("answer").style.visibility = "hidden";
  document.getElementById("sentence").style.display = "none";
  document.getElementById("wordImage").style.display = "none";

  updateProgressBar();
}

// Play letter sounds without showing letters
function playSounds() {
  const letters = currentWord.split("");
  let i = 0;

  function playNext() {
    if (i < letters.length) {
      const audio = new Audio(`sound_${letters[i]}.mp3`);
      audio.play();
      i++;
      setTimeout(playNext, 1200); // Delay between each letter
    }
  }

  setTimeout(playNext, 500); // Initial delay before the first letter plays
}

// Show letters and play letter sounds
function breakdownLetters() {
  const container = document.getElementById("wordContainer");
  container.innerHTML = "";

  for (let letter of currentWord) {
    const div = document.createElement("div");
    div.className = "letter spaced";
    div.innerHTML = letter.toUpperCase() + '<div class="dot"></div>';
    container.appendChild(div);
  }

  const letters = document.querySelectorAll(".letter");
  let i = 0;

  function highlightLetter() {
    if (i < letters.length) {
      const letter = letters[i].textContent.trim().toLowerCase();
      const dot = letters[i].querySelector(".dot");
      dot.style.display = "block";

      const audio = new Audio(`sound_${letter}.mp3`);
      audio.play();

      setTimeout(() => {
        dot.style.display = "none";
        i++;
        highlightLetter();
      }, 1200);
    }
  }

  setTimeout(highlightLetter, 500); // Initial delay
}

// Show image, full word, and sentence
function showImageAndSentence() {
  document.getElementById("answer").textContent = currentWord.toUpperCase();
  document.getElementById("answer").style.visibility = "visible";
  document.getElementById("sentence").textContent = wordSentences[currentWord] || "";
  document.getElementById("sentence").style.display = "block";

  const image = document.getElementById("wordImage");
  image.src = `${currentWord}-min.png`; // Use -min.png image format
  image.style.display = "block";
  image.style.opacity = "0";
  setTimeout(() => {
    image.style.opacity = "1";
  }, 50);
}

// Move to next word
function nextWord() {
  currentIndex++;
  displayWord();
}

// Progress bar update
function updateProgressBar() {
  const progress = ((currentIndex + 1) / words.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").textContent = `Word ${currentIndex + 1} of ${words.length}`;
}

// Initialize game
displayWord();
