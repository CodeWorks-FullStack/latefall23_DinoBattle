let cavePeople = [
  {
    name: 'Grunt',
    damage: 5, 
    health: 50,
    maxHealth: 50,
    level: 1,
    price: 0,
    unlocked: true

  },
  {
    name: 'Thok',
    damage: 10,
    health: 100,
    maxHealth: 50,
    level: 1,
    price: 500,
    unlocked: false
  },
  {
    name: 'Dung',
    damage: 25,
    health: 200,
    maxHealth: 200,
    level: 1,
    price: 1000,
    unlocked: false,
  }
]

let monsters = [
  {
    name: 'White Meat',
    img: 'rooster',
    damage: 1,
    health: 25,
    maxHealth: 25,
    level: 1
  },
  {
    name: 'Pink Snarf',
    img: 'pig',
    damage: 10,
    health: 50,
    maxHealth: 50,
    level: 1
  },
  {
    name: 'Cutty Cat',
    img: 'tiger',
    damage: 15,
    health: 75,
    maxHealth: 75,
    level: 1
  },
  {
    name: 'Cave Johnson',
    img: 'mammoth',
    damage: 25,
    health: 100,
    maxHealth: 100,
    level: 1
  },
  {
    name: 'Long Boy',
    img: 'long-neck',
    damage: 30,
    health: 150,
    maxHealth: 150,
    level: 1
  },
  {
    name: 'Danger Tooth',
    img: 't-rex',
    damage: 40,
    health: 200,
    maxHealth: 200,
    level: 1
  },
]

let meat = 500

let activeMonster = monsters.shift()

function attackMonster(){
  let totalDamage = 0
  // adds up all the damage the cavePeople can do
  cavePeople.forEach(cavePerson => {
    if(cavePerson.health > 0 && cavePerson.unlocked)
    totalDamage += cavePerson.damage
  })

  // deals that damage to the monster
  activeMonster.health -= totalDamage
  if(activeMonster.health <= 0){ // checks if the monster is dead
     activeMonster.health = 0
    console.log('☠️ monster dead')
    slayMonster()
  }
  // TODO change monster

  drawBoss()
  drawDamage(totalDamage)
}

function drawDamage(damage){
  let damageElm = document.getElementById('damage')
  damageElm.innerHTML = `<span class="damage">${damage}</span>`
}

function slayMonster(){
  console.log('Monster Slain', activeMonster);
  meat += activeMonster.maxHealth
  drawMeat() // draw updates after changes are made
  changeMonster()
}

function changeMonster(){
// now that monster is dead, beef them up
  activeMonster.level++
  activeMonster.maxHealth = Math.round(activeMonster.maxHealth *1.5)
  activeMonster.health = activeMonster.maxHealth
  monsters.push(activeMonster) // adds monster to end of array
  // 
  activeMonster = monsters.shift() // get new monster from the front 
  drawBoss() // draw new monster
}

function attackPeople(){
  cavePeople.forEach( person => {
    if(person.unlocked){
      person.health -= activeMonster.damage * activeMonster.level
      if(person.health < 0 ) person.health = 0
    }
  })
  drawPeople()
}

function healPerson(personName){
  console.log('healing', personName)
  let person = cavePeople.find(person => person.name == personName)
  if(meat >= 25){
    person.health += 10
    meat -= 25
    drawMeat()
    if(person.health > person.maxHealth) person.health = person.maxHealth
  }
  drawPeople()
}

function buyCavePerson(caveName){
  let cavePerson = cavePeople.find(person => person.name == caveName)
  console.log('🧌', caveName, cavePerson);
  if(meat >= cavePerson.price){
    console.log('SOLD!');
    meat -= cavePerson.price
    cavePerson.unlocked = true
    // good to move to another function
    let personElm = document.getElementById(cavePerson.name)
    console.log('🗺️', personElm);
    personElm.classList.remove('d-none')
  }
}


function drawBoss(){
  let monsterElm = document.getElementById('monster')
  let monsterHealthBar = monsterElm.querySelector('.progress-bar')
  let percentHealth = calculatePercentage(activeMonster.health, activeMonster.maxHealth)
  monsterHealthBar.setAttribute('style', `width: ${percentHealth}%`)
  monsterHealthBar.innerText = activeMonster.health.toString()
  let monsterName = monsterElm.querySelector('h2')
  monsterName.innerText = `${activeMonster.name}  lvl:${activeMonster.level}`

  let monsterImg = monsterElm.querySelector('img')
  monsterImg.src = `./imgs/${activeMonster.img}.png`
}

function drawPeople(){
  cavePeople.forEach(person => {
    let personColumn = document.getElementById(person.name)
    let healthBar = personColumn.querySelector('.progress-bar')
    let percentHealth = calculatePercentage(person.health, person.maxHealth)
    healthBar.setAttribute('style', `width: ${percentHealth}%`)
    healthBar.innerHTML = person.health.toString()

    let personName = personColumn.querySelector('h3')
    personName.innerText = `${person.name} lvl: ${person.level}`
  })
}

function drawMeat(){
  let meatElm = document.getElementById('meat')
  meatElm.innerText = meat.toString()
}

function calculatePercentage(min, max){
  return Math.round((min / max)*100)
}

drawBoss()
drawPeople()
drawMeat()
setInterval(attackPeople, 5000)