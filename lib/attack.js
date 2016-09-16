//Attacks class

export default class Attacks {

  constructor(name, damage, typing, accuracy, attType, pic){
    this.name = name;
    this.damage = damage;
    this.typing = typing;
    this.accuracy = accuracy;
    this.pic = pic;
    this.attType = attType;
  }
};

// export default class Buffs extends Attacks {
//  	constructor(){
//     super;
//     this.effects = effects;

//   }
// }
