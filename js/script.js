// Wait for the page to load
window.addEventListener("load", () => {
  // Animate clouds
  document.querySelector(".cloud-left").classList.add("animate-left");
  document.querySelector(".cloud-right").classList.add("animate-right");

  // Show quote after clouds move
  setTimeout(() => {
    document.querySelector(".quote-container").classList.add("show");
  }, 2000);

  // Create particle effect
  createParticles();
});

// Function to create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";

    // Set random size (smaller particles)
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Set random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // Set random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    // Set random animation
    const duration = Math.random() * 10 + 10;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;

    // Random floating animation
    const keyframeX = Math.random() * 10 - 5;
    const keyframeY = Math.random() * 10 - 5;

    // Add keyframe animation dynamically
    const keyframes = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(${keyframeX}px, ${keyframeY}px); }
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    // Add to container
    particlesContainer.appendChild(particle);
  }
}

const verses = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
  },
  {
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17",
  },
  {
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
  },
  {
    text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const jesusImage = document.getElementById("jesus-image");
  const overlay = document.getElementById("overlay");
  const versePopup = document.getElementById("verse-popup");
  const verseText = document.getElementById("verse-text");
  const verseReference = document.getElementById("verse-reference");
  const closePopup = document.getElementById("close-popup");

  if (jesusImage && overlay && versePopup && closePopup) {
    function showRandomVerse(e) {
      e.preventDefault();

      const randomIndex = Math.floor(Math.random() * verses.length);
      const verse = verses[randomIndex];

      verseText.textContent = verse.text;
      verseReference.textContent = verse.reference;

      overlay.classList.add("active");
      versePopup.classList.add("active");
    }

    function closeVersePopup() {
      overlay.classList.remove("active");
      versePopup.classList.remove("active");
    }

    jesusImage.addEventListener("click", showRandomVerse);
    closePopup.addEventListener("click", closeVersePopup);
    overlay.addEventListener("click", closeVersePopup);
  }
});
