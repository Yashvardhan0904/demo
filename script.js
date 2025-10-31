(function () {
  // 🦁 Sound collection
  const CREATURE_LIBRARY = {
    dog: { sound: "dog.mp3", image: "dog.png" },
    modi: { sound: "modiA.mp3", image: "modi.png" },
    goat: { sound: "ron.mp3", image: "cr.png" },
    mamta: {sound: "mamta1.mp3", image: "mamta.png" },
    luffy: {sound : "luffy.mp3", image: "Monkeyd.png" },
    saitama :{sound : "saitama.mp3", image: "Saitama.png"}
  };

  // 🎧 UI Elements
  const player = document.getElementById("animalAudio");
  const imageEl = document.getElementById("animalImg");
  const statusEl = document.getElementById("status");
  const imageWrapper = document.getElementById("animalBox"); // ✅ fixed ID
  const body = document.body;

  let typedKeys = "";
  let soundActive = false;

  // 🐾 Play creature sound and show visuals
  function playCreatureSound(creatureName) {
    const data = CREATURE_LIBRARY[creatureName];
    if (!data) return;

    // Reset any playing sound
    if (soundActive) {
      player.pause();
      player.currentTime = 0;
      resetVisuals();
    }

    // Set image + sound
    imageEl.src = data.image;
    player.src = data.sound;

    // Attempt to play
    player.currentTime = 0;
    const playPromise = player.play();
    if (playPromise !== undefined)
      playPromise.catch(() => console.warn("⚠️ Autoplay blocked by browser."));

    // Show visuals
    imageWrapper.classList.add("show");
    statusEl.textContent = `🎵 ${creatureName.toUpperCase()} says hello!`;
    statusEl.classList.add("active");
    body.classList.add("sound-active");
    soundActive = true;

    // Reset when sound ends
    player.onended = resetVisuals;
  }

  // 🧹 Reset visuals
  function resetVisuals() {
    imageWrapper.classList.remove("show");
    statusEl.classList.remove("active");
    body.classList.remove("sound-active");
    soundActive = false;
  }

  // 🎹 Detect typing
  window.addEventListener("keydown", (e) => {
    if (e.key.length === 1) {
      typedKeys += e.key.toLowerCase();
      if (typedKeys.length > 12) typedKeys = typedKeys.slice(-12);

      for (const name in CREATURE_LIBRARY) {
        if (typedKeys.endsWith(name)) {
          playCreatureSound(name);
          typedKeys = "";
          break;
        }
      }
    }
  });

  // 🖱️ Unlock audio for mobile
  document.addEventListener("pointerdown", function unlockOnce() {
    player.volume = player.volume;
    document.removeEventListener("pointerdown", unlockOnce);
  });

  // ⚠️ Handle errors
  player.addEventListener("error", () => {
    statusEl.style.color = "#ff4040";
    statusEl.textContent = "⚠️ Missing sound or image file!";
    imageWrapper.classList.remove("show");
    soundActive = false;
  });
})();
