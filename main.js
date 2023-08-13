// select the start game button & start game
document.querySelector(".control-buttons span").onclick = function () {
  startGame();
  showIcons();
};

// setting the player name & start game
function startGame() {
  // select name
  let name = document.querySelector(".name span");

  // prompt window to ask for name
  let yourName = prompt("Whats Your Name");

  // check name is empty
  if (yourName === null || yourName === "") {
    // set name to Unknown
    name.innerHTML = "Unknown";
  } else {
    // set name to your name
    name.innerHTML = yourName;
  }

  // remove splash screen
  document.querySelector(".control-buttons").remove();
}

// show icons for hint
function showIcons() {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("is-flipped");
    });
  }, 5000);
}

// effect duration
let duration = 1000;

// select blocks container
let blockContainer = document.querySelector(".memory-game-blocks");

// create array from game blocks
let blocks = Array.from(blockContainer.children);

// create range of keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
  // add css order property
  block.style.order = orderRange[index];

  // add click event
  block.addEventListener("click", function () {
    //  trigger the flip block function
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");

  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // if there tow selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();

    // check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// stop clicking function
function stopClicking() {
  // add class no clicking on main container
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no clicking after duration
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

function checkIfAllBlocksMatch() {
  let allBlocks = document.querySelectorAll(".game-block");
  let allMatched = Array.from(allBlocks).every((block) =>
    block.classList.contains("has-match")
  );
  if (allMatched) {
    let win = document.querySelector(".show-win");
    win.classList.add("win");
    document.querySelector(".show-win span").innerHTML = "You Win";
    document.getElementById("win").play();
    win.onclick = function () {
      location.reload();
    };
  }
}

// check match block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();

    checkIfAllBlocksMatch();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").play();
  }

  if (parseInt(triesElement.innerHTML) === 20) {
    let lose = document.querySelector(".show-lose");
    lose.classList.add("lose");
    document.querySelector(".show-lose span").innerHTML = "Game Over";
    document.getElementById("lose").play();
    lose.onclick = function () {
      location.reload();
    };
  }
}

// shuffle function
function shuffle(array) {
  // setting vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);

    // decrease length by one
    current--;

    // [1] save current element in stash
    temp = array[current];

    // [2] current element = random element
    array[current] = array[random];

    // [3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}
