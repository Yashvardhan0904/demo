(function () {
  // 🦁 Sound collection
  const CREATURE_LIBRARY = {
    dog: { sound: "dog.mp3", image: "dog.png" },
    modi: { sound: "modiA.mp3", image: "modi.png" },
    goat: { sound: "ron.mp3", image: "cr.png" },
    mamta: { sound: "mamta1.mp3", image: "mamta.png" },
    luffy: { sound: "luffy.mp3", image: "Monkeyd.png" },
    saitama: { sound: "saitama.mp3", image: "Saitama.png" },
  };

  // 🎧 UI Elements
  const player = document.getElementById("animalAudio");
  const imageEl = document.getElementById("animalImg");
  const statusEl = document.getElementById("status");
  const imageWrapper = document.getElementById("animalBox");
  const body = document.body;
  const inputBox = document.querySelector(".input");

  let typedKeys = "";
  let soundActive = false;

  // 🐾 Play creature sound and show visuals
  function playCreatureSound(creatureName) {
    const data = CREATURE_LIBRARY[creatureName];
    if (!data) return;

    if (soundActive) {
      player.pause();
      player.currentTime = 0;
      resetVisuals();
    }

    imageEl.src = data.image;
    player.src = data.sound;

    player.currentTime = 0;
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => console.warn("⚠️ Autoplay blocked by browser."));
    }

    imageWrapper.classList.add("show");
    statusEl.textContent = `🎵 ${creatureName.toUpperCase()} says hello!`;
    statusEl.classList.add("active");
    body.classList.add("sound-active");
    soundActive = true;

    player.onended = resetVisuals;
  }

  // 🧹 Reset visuals
  function resetVisuals() {
    imageWrapper.classList.remove("show");
    statusEl.classList.remove("active");
    body.classList.remove("sound-active");
    soundActive = false;
  }

  // 🎹 Detect typing in input box
  if (inputBox) {
    inputBox.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      for (const name in CREATURE_LIBRARY) {
        if (value.endsWith(name)) {
          playCreatureSound(name);
          e.target.value = ""; // clear *after* match is found
          typedKeys = "";
          break;
        }
      }

      // Keep track of what user typed
      typedKeys = value;
    });

    // Auto focus input when page loads (for mobile keyboard)
    window.addEventListener("load", () => {
      setTimeout(() => inputBox.focus(), 500);
    });
  }

  // ✅ Proper Mobile Audio Unlock
  function unlockAudio() {
    const silentPlay = player.play();
    if (silentPlay !== undefined) {
      silentPlay
        .then(() => {
          player.pause();
          player.currentTime = 0;
          console.log("✅ Audio unlocked for mobile playback");
          document.removeEventListener("pointerdown", unlockAudio);
          document.removeEventListener("touchstart", unlockAudio);
        })
        .catch(() => console.warn("⚠️ User tap required to unlock sound"));
    }
  }

  document.addEventListener("pointerdown", unlockAudio);
  document.addEventListener("touchstart", unlockAudio);

  // ⚠️ Handle missing files
  player.addEventListener("error", () => {
    statusEl.style.color = "#ff4040";
    statusEl.textContent = "⚠️ Missing sound or image file!";
    imageWrapper.classList.remove("show");
    soundActive = false;
  });
})();
