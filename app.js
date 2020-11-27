// game data
import { data } from './data.js';

let game = data.game;
let player = data.player;
let products = data.products;
let apparelItems = data.apparelItems;
let apparelShop = data.apparelShop;
let apparelOwned = data.apparelOwned;
let apparelEquipped = data.apparelEquipped;
let interiorItems = data.interiorItems;
let interiorShop = data.interiorShop;
let interiorOwned = data.interiorOwned;
let interiorEquipped = data.interiorEquipped;
let tasks = data.tasks;
let achievements = data.achievements;

let hover = new Audio('./assets/sounds/hover.wav');
let hoverSpecial = new Audio('./assets/sounds/hover-special.wav');
let serve = new Audio('./assets/sounds/serve.wav');

const app = document.querySelector('.app');

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function updateGame() {
  app.innerHTML = /*html*/`
    <div class="game-logo"></div>
    <div class="menu-icon"></div>

    <div class="name-wrap">
      <div class="levelbadge tooltip-left" data-tooltip="Level"><span>${player.level}</span></div>
      <input class="playername" value="${player.name}">
    </div>

    <div class="money tooltip-right" data-tooltip="Money">
      <div class="icon"></div>
      <div class="sum"><span>${player.money}</span></div>
    </div>

    <div class="energy tooltip-left" data-tooltip="Energy">
      <div class="progress" style="height: ${player.energy}%"></div>
    </div>

    <menu class="main-menu">
      <span class="home-link">Home</span>
      <span class="cafe-link">Kami Café</span>
      <span class="tasks-link">Tasks</span>
      <span class="apparel-link">Ichi Apparel</span>
      <span class="interior-link">Fuji Interior</span>
      <span class="storage-link">Storage</span>
      <span class="achievements-link">Achievements</span>
      <span class="settings-link">Settings</span>
    </menu>

    <section id="home">
      <div class="interior-home"></div>
      <div class="character" style="background-image: url(${player.sprite})"></div>
    </section>

    <section id="cafe">
      <div class="backdrop">
        <div class="inner"></div>
      </div>
      <div class="character" style="background-image: url(${player.sprite})"></div>
      <div class="counter"></div>
      <div class="bonsai"></div>
    </section>

    <section id="tasks">
      <div class="inner">
        <h3>Tasks</h3>
        <div class="task-items"></div>
      </div>
    </section>

    <section id="apparel">
      <div class="inner">
        <h3>Ichi Apparel</h3>
        <div class="apparel-shop"></div>
      </div>
    </section>

    <section id="interior">
      <div class="inner">
        <h3>Fuji Interior</h3>
        <div class="interior-shop"></div>
      </div>
    </section>

    <section id="storage">
      <div class="inner">
        <div class="equipped-items">
          <h3>Equipped</h3>
          <h4>Apparel</h4>
          <div class="apparel-equipped"></div>
          <h4>Interior</h4>
          <div class="interior-equipped"></div>
        </div>
        <div class="storage-items">
          <h3>Storage</h3>
          <h4>Apparel</h4>
          <div class="apparel-owned"></div>
          <h4>Interior</h4>
          <div class="interior-owned"></div>
        </div>
      </div>
    </section>

    <section id="achievements">
      <div class="inner">
        <h3>Achievements</h3>
        <strong>Unlocked</strong>
        <div class="unlocked-achievements"></div>
        <strong>Hidden</strong>
        <div class="hidden-achievements"></div>
      </div>
    </section>
    
    <section id="settings">
      <div class="inner">
        <div class="col">
          <h3>Character Settings</h3>
          <div class="option">
            <h4>Name</h4>
          </div>
          <div class="option">
            <h4>Skin Tone</h4>
          </div>
          <div class="option">
            <h4>Eyes</h4>
          </div>
          <div class="option">
            <h4>Mouth</h4>
          </div>
        </div>
        <div class="col">
          <h3>Game Settings</h3>
          <div class="option">
            <h4>HUD Size</h4>
          </div>
          <div class="option">
            <h4>Audio</h4>
          </div>
        </div>
      </div>
    </section>
  `

  document.querySelector('.menu-icon').addEventListener('click', () => {
    document.querySelector('.main-menu').classList.toggle('flex')
  });

  let navItems = document.querySelectorAll('.main-menu span');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => hover.play());
    item.addEventListener('mouseleave', () => hover.currentTime = 0);
    item.addEventListener('click', () => document.querySelector('.main-menu').classList.toggle('flex'));
  });
}

function newCustomer() {
  let menu = getRandom(products, 3);

  const customer = document.createElement('div');
  customer.classList.add('customer');
  customer.innerHTML = `
    <div class="customer-sprite"></div>
    <div class="customer-menu">
      <h3>I'll take a...</h3>
      <div class="menu-items"></div>
    </div>
  `

  document.querySelector('#cafe').appendChild(customer);

  menu.forEach(item => {
    document.querySelector('.menu-items').innerHTML += `
      <button class="select-btn cost${item.cost}" data-id=${item.id}>${item.name}</button>
    `;
  });

  let select = [...document.querySelectorAll('.select-btn')];
  select.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      selectProduct(e.target);
    });
    btn.addEventListener('mouseenter', () => hoverSpecial.play());
    btn.addEventListener('mouseleave', () => hoverSpecial.currentTime = 0);
  });
}

function updateTasks() {
  const taskItems = document.querySelector('.task-items');
  taskItems.innerHTML = '';
  tasks.forEach(task => {
    taskItems.innerHTML += `
      <div class="task">
        <div class="task-image" style="background-image: url(${task.img})"></div>
        <div class="task-info">
          <span class="task-name">${task.name}</span>
          <span class="task-desc">${task.desc}</span>
          <div class="task-buttons">
          <button class="start-task" data-id=${task.id}>Start task</button>
          <span class="task-reward">Reward: <i class="fas fa-money"></i> ${task.reward}</span>
        </div>
      </div>
    `
  });
  let taskBtns = [...document.querySelectorAll('.start-task')];
  taskBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let cooldown = 300;
      let startCooldown = setInterval(() => {
        cooldown -= 1
        btn.innerText = `${cooldown}s cooldown`
      }, 1000);
      btn.disabled = true;
      console.log(btn)
      setTimeout(() => {
        startTask(e.target);
        btn.disabled = false
        clearInterval(startCooldown);
      }, 300000);
    });
  });
}

function sortItems() {
  apparelShop = [];
  apparelOwned = [];
  apparelEquipped = [];

  interiorShop = [];
  interiorOwned = [];
  interiorEquipped = [];

  apparelItems.map((item) => {
    if (item.owned === true && item.equipped === true) {
      apparelEquipped.push(item);
    } else if (item.owned === true) {
      apparelOwned.push(item);
    } else {
      apparelShop.push(item);
    }
  });

  interiorItems.map((item) => {
    if (item.owned === true && item.equipped === true) {
      interiorEquipped.push(item);
    } else if (item.owned === true) {
      interiorOwned.push(item);
    } else {
      interiorShop.push(item);
    }
  });
}

function updateApparelShop() {
  const apparelShopDOM = document.querySelector('.apparel-shop');
  apparelShopDOM.innerHTML = '';
  apparelShop.forEach((item) => {
    apparelShopDOM.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <button class="buy-btn" data-id=${item.id}>Buy for <i class="fas fa-money"></i> ${item.price}</button>
        </div>
      </div>
    `;
  });
  let buyBtns = [...document.querySelectorAll('.apparel-shop .buy-btn')];
  buyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buyApparel(e.target);
    });
  });
}

function updateInteriorShop() {
  const interiorShopDOM = document.querySelector('.interior-shop');
  interiorShopDOM.innerHTML = '';
  interiorShop.forEach((item) => {
    interiorShopDOM.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <button class="buy-btn" data-id=${item.id}>Buy for <i class="fas fa-money"></i> ${item.price}</button>
        </div>
      </div>
    `;
  });
  let buyBtns = [...document.querySelectorAll('.interior-shop .buy-btn')];
  buyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buyInterior(e.target);
    });
  });
}

function updateApparelOwned() {
  const apparelOwnedDOM = document.querySelector('.apparel-owned');
  apparelOwnedDOM.innerHTML = '';
  apparelOwned.forEach((item) => {
    apparelOwnedDOM.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <div class="item-btns">
            <button class="equip-btn" data-id=${item.id}>Equip</button>
            <button class="sell-btn" data-id=${item.id}>Sell for <i class="fas fa-money"></i> ${item.price / 2}</button>
          </div>
        </div>
      </div>
    `;
  });

  let equipBtns = [...document.querySelectorAll('.apparel-owned .equip-btn')];
  equipBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      equipApparel(e.target);
    });
  });

  let sellBtns = [...document.querySelectorAll('.apparel-owned .sell-btn')];
  sellBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      sellApparel(e.target);
    });
  });
}

function updateInteriorOwned() {
  const interiorOwnedDOM = document.querySelector('.interior-owned');
  interiorOwnedDOM.innerHTML = '';
  interiorOwned.forEach((item) => {
    interiorOwnedDOM.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <div class="item-btns">
            <button class="equip-btn" data-id=${item.id}>Equip</button>
            <button class="sell-btn" data-id=${item.id}>Sell for <i class="fas fa-money"></i> ${item.price / 2}</button>
          </div>
        </div>
      </div>
    `;
  });

  let equipBtns = [...document.querySelectorAll('.interior-owned .equip-btn')];
  equipBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      equipInterior(e.target);
    });
  });

  let sellBtns = [...document.querySelectorAll('.interior-owned .sell-btn')];
  sellBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      sellInterior(e.target);
    });
  });
}

function customizeAvatar() {
  let character = document.querySelectorAll('.character');
  character.forEach(selectEyes)
}

const selectEyes = (el) => {
  let eyes = document.createElement('img');
  eyes.src = player.eyes;
  eyes.classList.add('eyes');
  el.appendChild(eyes)
}

function updateApparelEquipped() {
  const characters = [...document.querySelectorAll('.character')];
  const apparelEquippedDOM = document.querySelector('.apparel-equipped');
  
  characters.forEach((character) => {
    character.innerHTML = '';
  })
  
  apparelEquippedDOM.innerHTML = '';

  apparelEquipped.forEach((item) => {
    characters.forEach((character) => {
      character.innerHTML += `
        <img class="${item.id}" src="${item.img}" alt="${item.name}">
      `;
    })
    apparelEquippedDOM.innerHTML += `
      <button class="unequip-btn" data-id=${item.id}>Unequip ${item.name}</button>
    `;
  });

  let unequip = [...document.querySelectorAll('.apparel-equipped .unequip-btn')];
  unequip.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      unequipApparel(e.target);
    });
  });

  customizeAvatar();
}

function updateInteriorEquipped() {
  const interiorHome = document.querySelector('.interior-home');
  const interiorEquippedDOM = document.querySelector('.interior-equipped');

  interiorHome.innerHTML = '';
  interiorEquippedDOM.innerHTML = '';
  
  interiorEquipped.forEach((item) => {
    interiorHome.innerHTML += `
      <img class="${item.id}" src="${item.img}" alt="${item.name}">
    `;
    interiorEquippedDOM.innerHTML += `
      <button class="unequip-btn" data-id=${item.id}>Unequip ${item.name}</button>
    `;
  });

  let unequip = [...document.querySelectorAll('.interior-equipped .unequip-btn')];
  unequip.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      unequipInterior(e.target);
    });
  });
}

function updateAchievements() {
  const unlockedAchievements = document.querySelector('.unlocked-achievements');
  const hiddenAchievements = document.querySelector('.hidden-achievements');
  let unlocked = achievements.filter(function (x) { return Boolean(x.done); });
  let hidden = achievements.filter(function (x) { return Boolean(!x.done); });

  unlockedAchievements.innerHTML = '';
  unlocked.forEach(item => {
    unlockedAchievements.innerHTML += `
      <div class="task">
        <div class="task-image" style="background-image: url(${item.icon})"></div>
        <div class="task-info">
          <span class="task-name">${item.name}</span>
          <span class="task-desc">${item.desc}</span>
        </div>
      </div>
    `
  });

  hiddenAchievements.innerHTML = '';
  hidden.forEach(item => {
    hiddenAchievements.innerHTML += `
      <div class="task">
        <div class="task-image" style="background-image: url(https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/question.png)"></div>
      </div>
    `
  });
}

function selectProduct(target) {
  let productID = target.dataset.id;
  let product = products.find((product) => productID == product.id);
  if(player.energy >= product.cost) {
    player.money += product.cost;
    player.energy -= product.cost;
    serve.play();
    setTimeout(() => { newCustomer() }, 1000);
  } else {
    console.log('Not enough energy')
  }
  render();
  setSave();
}

function startTask(target) {
  let taskID = target.dataset.id;
  let task = tasks.find((task) => taskID == task.id);
  task.complete = true;
  player.money += task.reward;
  setSave();
}

function buyApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelShop.find((item) => itemID == item.id);
  item.owned = true;
  player.money -= item.price;
  player.exp += 10;
  sortItems();
  updateApparelShop();
  updateApparelOwned();
  setSave();
  goto(apparelPanel);
}

function buyInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorShop.find((item) => itemID == item.id);
  item.owned = true;
  player.money -= item.price;
  player.exp += 10;
  sortItems();
  updateInteriorShop();
  updateInteriorOwned();
  setSave();
  goto(interiorPanel);
}

function sellApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelOwned.find((item) => itemID == item.id);
  item.owned = false;
  player.money += item.price / 2;
  player.exp += 10;
  sortItems();
  updateApparelOwned();
  updateApparelShop();
  setSave();
}

function sellInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorOwned.find((item) => itemID == item.id);
  item.owned = false;
  player.money += item.price / 2;
  player.exp += 10;
  sortItems();
  updateInteriorOwned();
  updateInteriorShop();
  setSave();
}

function equipApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelOwned.find((item) => itemID == item.id);
  item.equipped = true;
  sortItems();
  updateApparelOwned();
  updateApparelEquipped();
  setSave();
}

function equipInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorOwned.find((item) => itemID == item.id);
  item.equipped = true;
  sortItems();
  updateInteriorOwned();
  updateInteriorEquipped();
  setSave();
}

function unequipApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelEquipped.find((item) => itemID == item.id);
  item.equipped = false;
  sortItems();
  updateApparelEquipped();
  updateApparelOwned();
  setSave();
}

function unequipInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorEquipped.find((item) => itemID == item.id);
  item.equipped = false;
  sortItems();
  updateInteriorEquipped();
  updateInteriorOwned();
  setSave();
}

function setSave() {
  localStorage.setItem('save', JSON.stringify(data));
}

function render() {
  updateGame();
  sortItems();
  updateApparelShop();
  updateApparelOwned();
  updateApparelEquipped();
  updateInteriorShop();
  updateInteriorOwned();
  updateInteriorEquipped();
  customizeAvatar();
}

render();

const homePanel = document.querySelector('#home');
const cafePanel = document.querySelector('#cafe');
const tasksPanel = document.querySelector('#tasks');
const apparelPanel = document.querySelector('#apparel');
const interiorPanel = document.querySelector('#interior');
const storagePanel = document.querySelector('#storage');
const achievementsPanel = document.querySelector('#achievements');
const settingsPanel = document.querySelector('#settings');

const goto = (target) => {
  let allSections = [...document.querySelectorAll('section')];
  allSections.forEach(section => {
    section.classList.remove('active');
  });
  target.classList.add('active');
};

window.onload = goto(cafePanel);

document.querySelector('.home-link').addEventListener('click', () => goto(homePanel));
document.querySelector('.cafe-link').addEventListener('click', () => goto(cafePanel));
document.querySelector('.tasks-link').addEventListener('click', () => goto(tasksPanel));
document.querySelector('.apparel-link').addEventListener('click', () => goto(apparelPanel));
document.querySelector('.interior-link').addEventListener('click', () => goto(interiorPanel));
document.querySelector('.storage-link').addEventListener('click', () => goto(storagePanel));
document.querySelector('.achievements-link').addEventListener('click', () => goto(achievementsPanel));
document.querySelector('.settings-link').addEventListener('click', () => goto(settingsPanel));

newCustomer();