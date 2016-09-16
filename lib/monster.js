// monster class

export default class Monster {
  constructor(name, stats, attacks, typing, weakness, strength, human){
    this.stats = stats;
    this.attacks = attacks;
    this.typing = typing;
    this.name = name;
    this.weakness = weakness;
    this.strength = strength;
    this.human = human;
    this.maxHP = stats.hp;
  }

  getNewInstanceOfMonster(human) {
    let newMonster = new Monster(this.name, Object.assign({}, this.stats), Object.assign([], this.attacks), this.typing, this.weakness, this.strength, human);
    return newMonster;
  }



};
