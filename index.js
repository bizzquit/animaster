addListeners();

function animaster() {
  function fadeIn(element, duration) {
    element.style.transitionDuration = `${duration}ms`;
    element.classList.remove("hide");
    element.classList.add("show");
    setTimeout(() => {
      element.style.transitionDuration = `0ms`;
      element.classList.remove("show");
      element.classList.add("hide");
    }, duration * 1.5);
  }

  function fadeOut(element, duration) {
    element.style.transitionDuration = `${duration}ms`;
    element.classList.remove("show");
    element.classList.add("hide");
    setTimeout(() => {
      element.style.transitionDuration = `0ms`;
      element.classList.remove("hide");
      element.classList.add("show");
    }, duration * 1.5);
  }

  function move(element, duration, translation) {
    element.style.transitionDuration = `${duration}ms`;
    element.style.transform = getTransform(translation, null);
  }

  function scale(element, duration, ratio) {
    element.style.transitionDuration = `${duration}ms`;
    element.style.transform = getTransform(null, ratio);
  }

  function moveAndHide(element, duration, translation) {
    const durationMove = (duration / 5) * 2;
    const durationHide = (duration / 5) * 3;
    move(element, durationMove, translation);
    setTimeout(() => {
      fadeOut(element, durationHide);
    }, durationMove);
  }

  function showAndHide(element, duration) {
    const durationNew = duration / 5;
    fadeIn(element, durationNew);
    setTimeout(() => {
      fadeOut(element, durationNew);
    }, durationNew * 2);
  }

  function heartBeating() {
    return {
      start: function (element, duration, ratio) {
        const arrClass = element.attributes.class.value
          .split(" ")
          .filter((item) => item === "big");
        if (!arrClass.length) {
          element.classList.add("big");
          return scale(element, duration, ratio);
        }
        element.classList.remove("big");
        return scale(element, duration, 1);
      },
      stop: function (idInterval) {
        clearInterval(idInterval);
      },
    };
  }

  return {
    fadeIn: function (element, duration) {
      fadeIn(element, duration);
    },
    fadeOut: function (element, duration) {
      fadeOut(element, duration);
    },
    move: function (element, duration, translation) {
      move(element, duration, translation);
    },
    scale: function (element, duration, ratio) {
      scale(element, duration, ratio);
    },
    moveAndHide: function (element, duration, translation) {
      moveAndHide(element, duration, translation);
    },
    showAndHide: function (element, duration) {
      showAndHide(element, duration);
    },
    heartBeating: () => heartBeating(),
  };
}

function addListeners() {
  document.getElementById("fadeInPlay").addEventListener("click", function () {
    const block = document.getElementById("fadeInBlock");
    animaster().fadeIn(block, 5000);
  });

  document.getElementById("fadeOutPlay").addEventListener("click", function () {
    const block = document.getElementById("fadeOutBlock");
    animaster().fadeOut(block, 5000);
  });

  document.getElementById("movePlay").addEventListener("click", function () {
    const block = document.getElementById("moveBlock");
    animaster().move(block, 1000, { x: 100, y: 10 });
  });

  document.getElementById("scalePlay").addEventListener("click", function () {
    const block = document.getElementById("scaleBlock");
    animaster().scale(block, 1000, 1.25);
  });

  document
    .getElementById("moveAndHidePlay")
    .addEventListener("click", function () {
      const block = document.getElementById("moveAndHideBlock");
      animaster().moveAndHide(block, 1000, { x: 200, y: 20 });
    });

  document
    .getElementById("showAndHidePlay")
    .addEventListener("click", function () {
      const block = document.getElementById("showAndHideBlock");
      animaster().showAndHide(block, 1000);
    });

  document
    .getElementById("heartBeatingPlay")
    .addEventListener("click", function () {
      const block = document.getElementById("heartBeatingBlock");
      let idIntervalHeart = setInterval(() => {
        animaster().heartBeating().start(block, 500, 1.4);
      }, 500);
      document
        .getElementById("heartBeatingStop")
        .addEventListener("click", function () {
          animaster().heartBeating().stop(idIntervalHeart);
        });
    });
}

function getTransform(translation, ratio) {
  const result = [];
  if (translation) {
    result.push(`translate(${translation.x}px,${translation.y}px)`);
  }
  if (ratio) {
    result.push(`scale(${ratio})`);
  }
  return result.join(" ");
}
