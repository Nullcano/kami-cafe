let data = {
  game: {
    ui: 'large'
  },
  player: {
    name: 'Player',
    sprite: './assets/avatar/light.gif',
    eyes: './assets/avatar/eyes/magenta.gif',
    money: 100,
    xp: 0,
    level: 1,
    energy: 100
  },
  products: [
    {
      id: 'fresh-milk',
      name: 'Fresh Milk',
      desc: '1 Cost Beverage',
      cost: 1
    }, {
      id: 'almond-milk',
      name: 'Almond Milk',
      desc: '1 Cost Beverage',
      cost: 1
    }, {
      id: 'soy-milk',
      name: 'Soy Milk',
      desc: '1 Cost Beverage',
      cost: 1
    }, {
      id: 'coconut-milk',
      name: 'Coconut Milk',
      desc: '1 Cost Beverage',
      cost: 1
    }, {
      id: 'drip-coffee',
      name: 'Drip Coffee',
      desc: '2 Cost Beverage',
      cost: 2
    }, {
      id: 'espresso',
      name: 'Espresso',
      desc: '2 Cost Beverage',
      cost: 2
    }, {
      id: 'americano',
      name: 'Americano',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'macchiato',
      name: 'Macchiato',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'cappuccino',
      name: 'Cappuccino',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'latte',
      name: 'Latte',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'mocha',
      name: 'Mocha',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'iced-coffee',
      name: 'Iced Coffee',
      desc: '5 Cost Beverage',
      cost: 5
    }, {
      id: 'iced-americano',
      name: 'Iced Americano',
      desc: '6 Cost Beverage',
      cost: 6
    }, {
      id: 'iced-latte',
      name: 'Iced Latte',
      desc: '7 Cost Beverage',
      cost: 7
    }, {
      id: 'iced-mocha',
      name: 'Iced Mocha',
      desc: '8 Cost Beverage',
      cost: 8
    }, {
      id: 'fruit-tea',
      name: 'Fruit Tea',
      desc: '2 Cost Beverage',
      cost: 2
    }, {
      id: 'chai-tea',
      name: 'Chai Tea',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'green-tea',
      name: 'Green Tea',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'iced-fruit-tea',
      name: 'Iced Fruit Tea',
      desc: '6 Cost Beverage',
      cost: 6
    }, {
      id: 'iced-chai-tea',
      name: 'Iced Chai Tea',
      desc: '7 Cost Beverage',
      cost: 7
    }, {
      id: 'iced-green-tea',
      name: 'Iced Green Tea',
      desc: '8 Cost Beverage',
      cost: 8
    }, {
      id: 'hot-chocolate',
      name: 'Hot Chocolate',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'energy-drink',
      name: 'Energy Drink',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'root-beer',
      name: 'Root Beer',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'beer',
      name: 'Beer',
      desc: '5 Cost Beverage',
      cost: 5
    }, {
      id: 'white-wine',
      name: 'White Wine',
      desc: '6 Cost Beverage',
      cost: 6
    }, {
      id: 'red-wine',
      name: 'Red Wine',
      desc: '7 Cost Beverage',
      cost: 7
    }, {
      id: 'sake',
      name: 'Sake',
      desc: '8 Cost Beverage',
      cost: 8
    }, {
      id: 'vanilla-milkshake',
      name: 'Vanilla Milkshake',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'chocolate-milkshake',
      name: 'Chocolate Milkshake',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'berry-smoothie',
      name: 'Berry Smoothie',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'fruit-smoothie',
      name: 'Fruit Smoothie',
      desc: '6 Cost Beverage',
      cost: 6
    }, {
      id: 'god-smoothie',
      name: 'God Smoothie',
      desc: '8 Cost Beverage',
      cost: 8
    }, {
      id: 'lime-soda',
      name: 'Lime Soda',
      desc: '3 Cost Beverage',
      cost: 3
    }, {
      id: 'orange-soda',
      name: 'Orange Soda',
      desc: '4 Cost Beverage',
      cost: 4
    }, {
      id: 'wild-fruits-soda',
      name: 'Wild Fruits Soda',
      desc: '5 Cost Beverage',
      cost: 5
    }, {
      id: 'ramune',
      name: 'Ramune',
      desc: '6 Cost Beverage',
      cost: 6
    }
  ],
  boosts: [
    {
      id: 'fill-energy',
      name: 'Refill Energy',
      price: 10,
      owned: false,
      energy: 100
    }
  ],
  apparelItems: [
    {
      id: 'hair-ponytail',
      name: 'Hair | Ponytail',
      img: './assets/avatar/hair/ponytail.gif',
      price: 5,
      owned: false,
      equipped: false
    }, {
      id: 'outfit-apron-cap',
      name: 'Outfit | Apron & Cap',
      img: './assets/avatar/outfits/apron-cap.gif',
      price: 5,
      owned: false,
      equipped: false
    }, {
      id: 'outfit-kimono',
      name: 'Outfit | kimono',
      img: './assets/avatar/outfits/kimono.gif',
      price: 5,
      owned: false,
      equipped: false
    }
  ],
  interiorItems: [
    {
      id: 'full-wall-basic',
      name: 'Full Wall | Basic',
      img: './assets/room/walls/full-basic.gif',
      price: 0,
      owned: true,
      equipped: true
    }, {
      id: 'dark-panels',
      name: 'Full Wall | Dark Panels',
      img: './assets/room/walls/dark-panels.gif',
      price: 0,
      owned: false,
      equipped: false
    }, {
      id: 'bed-brown',
      name: 'Bed | Brown',
      img: './assets/room/furniture/bed-brown.gif',
      price: 5,
      owned: true,
      equipped: true
    }, {
      id: 'bookshelf-brown',
      name: 'bookshelf | Brown',
      img: './assets/room/furniture/bookshelf-brown.gif',
      price: 0,
      owned: true,
      equipped: true
    }
  ],
  apparelShop: [],
  interiorShop: [],
  apparelOn: [],
  interiorOn: [],
  apparelOff: [],
  interiorOff: [],
  pets: [
    {
      id: 'corgi',
      name: 'Corgi',
      img: './assets/corgi.png',
      price: 1337,
      owned: false,
      active: false
    }, {
      id: 'scottish-fold',
      name: 'Scottish Fold',
      img: './assets/scottish-fold.png',
      price: 1337,
      owned: false,
      active: false
    }
  ],
  activepets: [],
  tasks: [
    {
      id: 1, 
      name: 'Try to sleep',
      desc: 'You are feeling really tired. Try get some sleep.',
      img: './assets/insomnia-hoodie.png',
      reward: 5, 
      completed: false, 
      times: 0
    }, {
      id: 2, 
      name: 'Eat Midnight Snack',
      desc: 'You are feeling a bit hungry. Go get a snack.',
      img: './assets/insomnia-hoodie.png',
      reward: 5, 
      completed: false, 
      times: 0
    }, {
      id: 3, 
      name: 'Play Video Games',
      desc: 'You are feeling a bit bored. Go play video games.',
      img: './assets/insomnia-hoodie.png',
      reward: 5,
      completed: false, 
      times: 0
    }
  ],
  achievements: [
    {
      icon: 'http://www.iconbeast.com/images/iconbeast-lite.png',
      name: 'Welcome',
      desc: 'Your presence has been known',
      done: false,
    }, {
      icon: 'http://www.iconbeast.com/images/iconbeast-lite.png',
      name: 'Loot Hunter',
      desc: 'You clicked on a crate',
      done: false,
    }
  ],
  badges: [

  ],
}

if (window.localStorage.getItem('save')) {
  data = JSON.parse(window.localStorage.getItem('save'));
} else {
  console.log('save not found')
}

export { data };