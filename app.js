// game data
import { data } from './data.js';

let game = data.game;
let player = data.player;
let products = data.products;
let apparelItems = data.apparelItems;
let interiorItems = data.interiorItems;
let apparelShop = data.apparelShop;
let interiorShop = data.interiorShop;
let apparelOn = data.apparelOn;
let interiorOn = data.interiorOn;
let apparelOff = data.apparelOff;
let interiorOff = data.interiorOff;
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
      <span class="nav-item">Home</span>
      <span class="nav-item active">Kami Café</span>
      <span class="nav-item">Tasks</span>
      <span class="nav-item">Ichi Apparel</span>
      <span class="nav-item">Fuji Interior</span>
      <span class="nav-item">Storage</span>
      <span class="nav-item">Achievements</span>
      <span class="nav-item">Settings</span>
    </menu>

    <section id="home">
      <div class="interior"></div>
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
          <div class="apparel-stored"></div>
          <h4>Interior</h4>
          <div class="interior-stored"></div>
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
    const mainMenu = document.querySelector('.main-menu');
    if (mainMenu.style.display === 'flex') {
      mainMenu.style.display = 'none';
    } else {
      mainMenu.style.display = 'flex';
    }
    mainMenu.addEventListener('click', () => {
      mainMenu.style.display = 'none';
    });
  });

  let navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => hover.play());
    item.addEventListener('mouseleave', () => hover.currentTime = 0);
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
  interiorShop = [];
  apparelOn = [];
  interiorOn = [];
  apparelOff = [];
  interiorOff = [];

  apparelItems.map((item) => {
    if (item.owned === true && item.equipped === true) {
      apparelOn.push(item);
    } else if (item.owned === true) {
      apparelOff.push(item);
    } else {
      apparelShop.push(item);
    }
  });

  interiorItems.map((item) => {
    if (item.owned === true && item.equipped === true) {
      interiorOn.push(item);
    } else if (item.owned === true) {
      interiorOff.push(item);
    } else {
      interiorShop.push(item);
    }
  });
}

function updateApparel() {
  const apparelShopDisplay = document.querySelector('.apparel-shop');
  apparelShopDisplay.innerHTML = '';
  apparelShop.forEach((item) => {
    apparelShopDisplay.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <button class="buy-btn" data-id=${item.id}>Buy for <i class="fas fa-money"></i> ${item.price}</button>
        </div>
      </div>
    `;
  });
  let buyBtns = [...document.querySelectorAll('.buy-btn')];
  buyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buyApparel(e.target);
    });
  });
}

function updateInterior() {
  const interiorShopDisplay = document.querySelector('.interior-shop');
  interiorShopDisplay.innerHTML = '';
  interiorShop.forEach((item) => {
    interiorShopDisplay.innerHTML += `
      <div class="item-container">
        <div class="item-display" style="background-image:url(${item.img})"></div>
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <button class="buy-btn" data-id=${item.id}>Buy for <i class="fas fa-money"></i> ${item.price}</button>
        </div>
      </div>
    `;
  });
  let buyBtns = [...document.querySelectorAll('.buy-btn')];
  buyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      buyInterior(e.target);
    });
  });
}

function updateApparelInventory() {
  const apparelStored = document.querySelector('.apparel-stored');
  apparelStored.innerHTML = '';
  apparelOff.forEach((item) => {
    apparelStored.innerHTML += `
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

  let equipBtns = [...document.querySelectorAll('.equip-btn')];
  equipBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      equipApparel(e.target);
    });
  });

  let sellBtns = [...document.querySelectorAll('.sell-btn')];
  sellBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      sellApparel(e.target);
    });
  });
}

function updateInteriorInventory() {
  const interiorStored = document.querySelector('.interior-stored');
  interiorStored.innerHTML = '';
  interiorOff.forEach((item) => {
    interiorStored.innerHTML += `
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

  let equipBtns = [...document.querySelectorAll('.equip-btn')];
  equipBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      equipInterior(e.target);
    });
  });

  let sellBtns = [...document.querySelectorAll('.sell-btn')];
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

function updateEquippedApparel() {
  const character = [...document.querySelectorAll('.character')];
  const equippedApparel = document.querySelector('.apparel-equipped');

  character.innerHTML = '';
  equippedApparel.innerHTML = '';

  apparelOn.forEach((item) => {
    character.forEach(() => {
      character.innerHTML += `
        <img class="${item.id}" src="${item.img}" alt="${item.name}">
      `;
    })
    equippedApparel.innerHTML += `
      <button class="unequip-btn" data-id=${item.id}>Unequip ${item.name}</button>
    `;
  });

  let unequip = [...document.querySelectorAll('.apparel-equipped .unequip-btn')];
  unequip.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      unequipApparel(e.target);
    });
  });
}

function updateEquippedInterior() {
  const interiorHome = document.querySelector('.interior');
  const equippedInterior = document.querySelector('.interior-equipped');

  interiorHome.innerHTML = '';
  equippedInterior.innerHTML = '';
  
  interiorOn.forEach((item) => {
    interiorHome.innerHTML += `
      <img class="${item.id}" src="${item.img}" alt="${item.name}">
    `;
    equippedInterior.innerHTML += `
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
  localStorage.setItem('save', JSON.stringify(data));
}

function startTask(target) {
  let taskID = target.dataset.id;
  let task = tasks.find((task) => taskID == task.id);
  task.complete = true;
  player.money += task.reward;
  render();
  localStorage.setItem('save', JSON.stringify(data));  
}

function buyApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelItems.find((item) => itemID == item.id);
  item.owned = true;
  player.money -= item.price;
  player.exp += 10
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function buyInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorItems.find((item) => itemID == item.id);
  item.owned = true;
  player.money -= item.price;
  player.exp += 10
  render();
  localStorage.setItem('save', JSON.stringify(data));
  console.log({ item });
}

function sellApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelItems.find((item) => itemID == item.id);
  item.owned = false;
  player.money += item.price / 2;
  player.exp += 10
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function sellInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorItems.find((item) => itemID == item.id);
  item.owned = false;
  player.money += item.price / 2;
  player.exp += 10
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function equipApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelItems.find((item) => itemID == item.id);
  item.equipped = true;
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function equipInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorItems.find((item) => itemID == item.id);
  item.equipped = true;
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function unequipApparel(target) {
  let itemID = target.dataset.id;
  let item = apparelItems.find((item) => itemID == item.id);
  item.equipped = false;
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function unequipInterior(target) {
  let itemID = target.dataset.id;
  let item = interiorItems.find((item) => itemID == item.id);
  item.equipped = false;
  render();
  localStorage.setItem('save', JSON.stringify(data));
}

function resetGame() {
	localStorage.removeItem('save');
  location.reload();
}

function render() {
  updateGame();
  sortItems();
  updateApparel();
  updateInterior();
  updateApparelInventory();
  updateInteriorInventory();
  updateEquippedApparel();
  updateEquippedInterior();
  updateTasks();
  updateAchievements();
  customizeAvatar();
  renderWindows();
}

render();

function renderWindows() {
  const DOM = {
    tabsNav: document.querySelector('.main-menu'),
    tabsNavItems: document.querySelectorAll('.nav-item'),
    panels: document.querySelectorAll('section')
  };
  
  const setActiveItem = (el) => {
    DOM.tabsNavItems.forEach(tab => {
      tab.classList.remove('active');
    });
    el.classList.add('active');
  };
  
  const findActiveItem = () => {
    let activeIndex = 0;
    for (let i = 0; i < DOM.tabsNavItems.length; i++) {
      if (DOM.tabsNavItems[i].classList.contains('active')) {
        activeIndex = i;
        break;
      };
    }
    return activeIndex;
  };
  
  const findActivePanel = (i) => {
    return DOM.panels[i];
  };
  
  const setActivePanel = (i) => {
    DOM.panels.forEach(el => {
      el.classList.remove('active');
    });
    DOM.panels[i].classList.add('active');
  };
  
  const activeItemIndex = findActiveItem();
  findActivePanel(activeItemIndex);
  setActivePanel(activeItemIndex);
  
  DOM.tabsNav.addEventListener('click', e => {
    const navElemClass = 'nav-item';
    if (e.target.classList.contains(navElemClass)) {
      const clickedTab = e.target;
      const activeItemIndex = Array.from(DOM.tabsNavItems).indexOf(clickedTab);
      setActiveItem(clickedTab);
      findActivePanel(activeItemIndex);
      setActivePanel(activeItemIndex);
    }
  });  
}
renderWindows();
newCustomer();