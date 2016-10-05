//https://codeshare.io/wbEIH

import Battle from "./game";
import Attack from "./attack";
import Monster from "./monster";

document.addEventListener("DOMContentLoaded", $(function(){
  //grab canvas
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let muted = false;
  let mute = document.getElementById("mute")
  let buffering = false;
  mute.addEventListener("click", function(){
    console.log("muted")
    if(!buffering){
      buffering = true;
      console.log(muted)
      if (muted === false){
        $(".music").each(function(){
          $(this).prop("volume", 0);
        });
        mute.style.backgroundImage = "url('./lib/pics/unmute.png')";
        muted = true;
      }else {
        $(".music").each(function(){
          $(this).prop("volume", 1);
        });
        mute.style.backgroundImage = "url('./lib/pics/mute.png')";
        muted = false;
      }
    }
    buffering = false;
  });

  //grab background images
  let background = new Image();
  background.src = "lib/pics/intro1/frame_0_delay.gif"
  let background2 = new Image();
  background2.src = "lib/pics/oaklab.jpg"

  //set home background
  let home_frame = 0;
  let first_scene = true;

  // function home_animation(){
  //   ctx.clearRect(0,0,800,600);
  //   if (home_frame > 40){
  //     home_frame = 0;
  //     first_scene = false;
  //   }
  //   if (first_scene){
  //     background.src = "lib/pics/intro1/frame_" + `${home_frame}` + "_delay.gif";
  //   }else{
  //     background.src = "lib/pics/intro2/frame_" + `${home_frame}` + "_delay.gif";
  //   }
  //   ctx.drawImage(background, 0, 0, 800, 600);
  //   home_frame++
  // }

  const animatehomeint = setInterval(function(){
    if (home_frame > 40){
      home_frame = 0;
      first_scene = false;
    }
    if (first_scene){
      background.src = "lib/pics/intro1/frame_" + `${home_frame}` + "_delay.gif";
    }else{
      background.src = "lib/pics/intro2/frame_" + `${home_frame}` + "_delay.gif";
    }
    background.onload = function(){
      ctx.drawImage(background, 0, 0, 800, 600);
    }
    home_frame++
  }, 200);




  let select = [];
  select.push(document.getElementById('select-charmander'));
  select.push(document.getElementById('select-bulbasaur'));
  select.push(document.getElementById('select-squirtle'));

  select.forEach(el => el.style.display= "none");
  let pokemonList = [Charmander, Bulbasaur, Squirtle];
  select[0].addEventListener("click", function(){initiateBattle(pokemonList[0], pokemonList[Math.floor(Math.random() * 3 )] )});
  select[1].addEventListener("click", function(){initiateBattle(pokemonList[1], pokemonList[Math.floor(Math.random() * 3 )] )});
  select[2].addEventListener("click", function(){initiateBattle(pokemonList[2], pokemonList[Math.floor(Math.random() * 3 )] )});
  //grab pokemon pics
  let bulb = new Image();
  bulb.src = "lib/pics/bulbasaur.png";
  let char = new Image();
  char.src = "lib/pics/charmander.png";
  let squir = new Image();
  squir.src = "lib/pics/squirtle.png";

  //add click listener to start-button
  let button = document.getElementById("start-button");
  button.addEventListener("click", function(){drawCharSelect(0,0)});

  //render character select screen
  function drawCharSelect(x,y){
    clearInterval(animatehomeint);
    ctx.clearRect(0,0,800,600);
    button.style.display = "none";
    ctx.drawImage(background2, 0, 0, 800, 600);
    select.forEach(el => el.style.display= "block");
    ctx.font="36px Ubuntu";
    ctx.fillStyle="red";
    ctx.fillText("Select your pokemon", 250, 100);
    ctx.font="30px Verdana";
    ctx.fillStyle="red";
    ctx.drawImage(bulb, 100, 300, 100, 100);
    ctx.fillText("Bulbasaur", 80, 270);
    ctx.drawImage(char, 350, 300, 100, 100);
    ctx.fillText("Charmander", 300, 270);
    ctx.drawImage(squir, 600, 300, 100, 100);
    ctx.fillText("Squirtle", 595, 270);
  }
  //start battle
  let background3 = new Image();
  let bsrc = Math.floor(Math.random()*3);
  switch(bsrc){
    case 0:
      background3.src = "lib/pics/firefield.png";
      break;
    case 1:
      background3.src = "lib/pics/waterfield.jpg";
      break;
    case 2:
      background3.src = "lib/pics/grassfield.png";
      break;
    default:
      background3.src = "lib/pics/firefield.png";
  }

  let animateInterval;

  function initiateBattle(p1, p2){
    let themesong = document.getElementById("theme");
    let battlesong = document.getElementById("battle");
    themesong.muted = true;
    battlesong.currentTime = 2;
    battlesong.play();
    $(".logo").hide();
    let player = p1.getNewInstanceOfMonster(true);
    let comp = p2.getNewInstanceOfMonster(false);
    let battle = new Battle(player, comp);
    select.forEach(el => el.style.display= "none");
    ctx.clearRect(0, 0, 800, 600);
    ctx.drawImage(background3, 0, 0, 800, 600);
    for(let i=0; i < 3; i++){
      ctx.fillStyle="#000";
      setTimeout(() => {ctx.fillRect(0, 0, 800, 600)}, 300 * (i+1));
      setTimeout(() => {ctx.clearRect(0, 0, 800, 600)}, 300 * (i+1) + 200);
    }
    setTimeout(() => {
      ctx.drawImage(background3, 0, 0, 800, 600);
      let animatePokeballsInterval = setInterval(function(){animatePokeballs();}, 10);

      setTimeout(() => {
        document.getElementById("pokeball").play();
        clearInterval(animatePokeballsInterval);
        ctx.clearRect(0, 0, 800, 600);
        ctx.drawImage(background3, 0, 0, 800, 600);
        $(`.${p2.name}-front`).show();
        $(`.${p1.name}-back`).show();
        $("#my-hp").show();
        $("#opp-hp").show();
        $("#my-hp").animate({width: "300px"}, 500)
        $("#opp-hp").animate({width: "300px"}, 500)
        let attacks;
        if (battle.player.name === "Charmander"){
          attacks = $(".charmander-attack");
          attacks.show();
        }else if(battle.player.name === "Bulbasaur"){
          attacks = $(".bulbasaur-attack");
          attacks.show();
        }else{
          attacks = $(".squirtle-attack");
          attacks.show();
        };

        for(let i=0; i < 4; i++){
          $(attacks[i]).click(
            function(){
              commenceBattle(battle, attacks, i);
            }
          )
        };
      }, 1600);

    }, 1200);
  }

  let px = 0;
  let py = 450;
  let frame = 0;
  let frameRate = 0;
  let cx = 700;
  let cy = 100;
  function animatePokeballs(){
    ctx.save();
    ctx.drawImage(background3, 0, 0, 800, 600);
    ctx.clearRect(0, 0, 800, 500);
    ctx.drawImage(background3, 0, 0, 800, 600);
    ctx.drawImage(pokeballImg, 65*frameRate, 0, 60, 60, px, py, 40, 40);
    ctx.drawImage(pokeballImg, 65*frameRate, 0, 60, 60, cx, cy, 40, 40);
    px++;
    cx--;
    frame++;
    frameRate = Math.floor(frame/2);
    if(px < 30){
      cy--;
    }else{
      cy++;
    }
    if(px < 100){
      py--;
    }else{
      py++;
    }
    if (frame > 12){
      frame = 0;
    }
    ctx.restore();
  };


  let pokeballImg = new Image();
  pokeballImg.src = "lib/pics/pokeball.png";
  let data;
  function commenceBattle(battle, attacks, i){
    attacks.hide();
    data = battle.genSequence(i);
    setTimeout(() => {animateAttacks(data.f1, data.f2, data.a1, data.d1)}, 100)
    if(data.f2.stats.hp > 0){
      setTimeout(() => {animateAttacks(data.f2, data.f1, data.a2, data.d2)}, 3600)
    }
    setTimeout(()=>{
      console.log(`your hp: ${battle.player.stats.hp}`);
      console.log(`your opponents hp: ${battle.comp.stats.hp}`);
      console.log(`your opponent: ${battle.comp.name}`);
      ctx.drawImage(background3, 0, 0, 800, 600);
      attacks.show();
    }, 7100)
  }

  function animateAttacks(f1, f2, a, d){
    ctx.clearRect(0, 500, 800, 100);
    ctx.font="32px Ubuntu";
    ctx.fillStyle="black";

    if(f1.human){

      if(a.name === "firefang"){
        $("#fire-you").animate({height: "40px"}, 1000);
        $("#bite-you").show();
        setTimeout(() => {
          $("#bite-you").hide();
          $("#bite-you2").show();
        }, 700);
        $("#fire-you").animate({height: "0"}, 500);
        setTimeout(() => {
          $("#bite-you2").hide();
        }, 1200)
      }else if (a.typing === "fire") {
        $("#fire-you").animate({height: "40px"}, 1000);
        $("#fire-you").animate({height: "0"}, 500);
      }else if (a.name === "scratch") {
        let scratch = $("#scratch-you");
        scratch[0].style.width = "150px";
        scratch.animate({width: "240px"}, 1000);
        scratch.animate({width: "0"}, 200);
      }else if (a.typing === "normal") {
        for(let i=0; i < 3; i++){
          $("#tackle-you").animate({width: "100"}, 200);
          $("#tackle-you").animate({width: "0"}, 100)
        }
      }else if(a.typing === "grass"){
        $("#leaves-you").animate({height: "40"}, 300);
        for(let i=0; i < 4; i++){
          $("#leaves-you").animate({left: "510"}, 100);
          $("#leaves-you").animate({left: "520"}, 100);
        }
        $("#leaves-you").animate({height: "0"}, 500);
      }else if (a.typing === "water") {
        $("#water-you").show();
        setTimeout(() => {
          $("#water-you").hide();
        }, 1500);
      }else if (a.typing === "dark") {
        $("#bite-you").show();
        setTimeout(() => {
          $("#bite-you").hide();
          $("#bite-you2").show();
        }, 700);
        setTimeout(() => {
          $("#bite-you2").hide();
        }, 1200)
      }

      document.getElementById("attack-sound").play();

      for(let i=0; i<3; i++){
        setTimeout(() => {
          $(`.${f2.name}-front`).hide();
        }, 700 * i);
        setTimeout(() => {
          $(`.${f2.name}-front`).show();
        }, 700 * i + 200)
      }

      setTimeout(() => {
        if(d === 0){
          ctx.fillText(`Your ${a.name} missed!`, 50, 550);
        }else{
          let hpwidth = 200 * (f2.stats.hp/f2.maxHP);
          $(".opp-hp-bar").animate({width: hpwidth}, 500);
          ctx.fillText(`Your ${a.name} dealt ${d} damage!`, 50, 550);
          if(hpwidth === 0){
            //render victory
            let victorysong = document.getElementById("victory-sound");
            let battlesong = document.getElementById("battle");
            battlesong.muted = true;
            victorysong.currentTime = 11;
            victorysong.play();
            finished(1);
          }
        }
      }, 1500)
      //opponent attacks me
    }else{
      if(a.name === "firefang"){
        $("#fire-me").animate({height: "60px"}, 1000);
        $("#bite-me").show();
        setTimeout(() => {
          $("#bite-me").hide();
          $("#bite-me2").show();
        }, 700);
        $("#fire-me").animate({height: "0"}, 500);
        setTimeout(() => {
          $("#bite-me2").hide();
        }, 1200)
      }else if (a.typing === "fire") {
        $("#fire-me").animate({height: "60px"}, 1000);
        $("#fire-me").animate({height: "0"}, 500);
      }else if (a.name === "scratch") {
        let scratch = $("#scratch-me");
        scratch[0].style.width = "150px";
        scratch.animate({width: "240px"}, 1000);
        scratch.animate({width: "0"}, 200);
      }else if (a.typing === "normal") {
        for(let i=0; i < 3; i++){
          $("#tackle-me").animate({width: "120"}, 200);
          $("#tackle-me").animate({width: "0"}, 100)
        }
      }else if(a.typing === "grass"){
        $("#leaves-me").animate({height: "60"}, 300);
        for(let i=0; i < 4; i++){
          $("#leaves-me").animate({left: "130"}, 100);
          $("#leaves-me").animate({left: "140"}, 100);
        }
        $("#leaves-me").animate({height: "0"}, 500);
      }else if (a.typing === "water") {
        $("#water-me").show();
        setTimeout(() => {
          $("#water-me").hide();
        }, 1500);
      }else if (a.typing === "dark") {
        $("#bite-me").show();
        setTimeout(() => {
          $("#bite-me").hide();
          $("#bite-me2").show();
        }, 700);
        setTimeout(() => {
          $("#bite-me2").hide();
        }, 1200)
      }
      document.getElementById("attack-sound").play();
      for(let i=0; i<3; i++){
        setTimeout(() => {
          $(`.${f2.name}-back`).hide();
        }, 400 * i);
        setTimeout(() => {
          $(`.${f2.name}-back`).show();
        }, 400 * i + 200)
      }

      setTimeout(() => {
        if(d === 0){
          ctx.fillText(`Opponent's ${a.name} missed!`, 50, 550);
        }else{
          let hpwidth = 200 * (f2.stats.hp/f2.maxHP);
          $(".my-hp-bar").animate({width: hpwidth}, 500);
          ctx.fillText(`Opponent's ${a.name} dealt ${d} damage!`, 50, 550)
          if(hpwidth === 0){
            //render defeat
            let defeatsong = document.getElementById("defeat-sound");
            let battlesong = document.getElementById("battle");
            battlesong.muted = true;
            defeatsong.currentTime = 11;
            defeatsong.play();
            finished(0);
          }
        }
      }, 1500)
    }
  }

  function finished(p){
    if(p===1){
      $("button").hide();
      let victory = new Image();
      victory.src = "lib/pics/victory.png";
      ctx.clearRect(0, 0, 800, 600);
      ctx.drawImage(victory, 0, 0, 800, 600);
    }else{
      $("button").hide();
      let defeat = new Image();
      defeat.src = "lib/pics/defeat.png";
      ctx.clearRect(0, 0, 800, 600);
      ctx.drawImage(defeat, 0, 0, 800, 600);
    }
  }

}));

const Scratch = new Attack("scratch", 40, "normal", 100, "att", null);
const Ember = new Attack("ember", 40, "fire", 100, "matt", null);
const FireFang = new Attack("firefang", 65, "fire", 95, "att", null);
const Inferno = new Attack("inferno", 100, "fire", 50, "matt", null);

const Tackle = new Attack("tackle", 50, "normal", 100, "att", null);
const VineWhip = new Attack("vinewhip", 45, "grass", 100, "att", null);
const TakeDown = new Attack("takedown", 90, "normal", 85, "att", null);
const RazorLeaf = new Attack("razorleaf", 55, "grass", 95, "att", null);

const WaterGun = new Attack("watergun", 40, "water", 100, "matt", null);
const Bite = new Attack("bite", 60, "dark", 100, "att", null);
const WaterPulse = new Attack("waterpulse", 60, "water", 100, "matt", null);

// const ShadowBall = new Attack("shadowball", 5000, "psychic", 100, "matt", null);

// const Mewtwo = new Monster("Mewtwo",
// {
//   hp: 150,
//   att: 100,
//   matt: 110,
//   def: 100,
//   mdef: 110,
//   speed: 100
// },
// [ShadowBall, Tackle, TakeDown, Bite],
// "psychic",
// "normal",
// "psychic",
// false
// );

const Charmander = new Monster("Charmander",
  {
    hp: 62,
    att: 38,
    matt: 42,
    def: 34,
    mdef: 37,
    speed: 45
  },
  [Scratch, Ember, FireFang, Inferno],
  "fire",
  "water",
  "grass",
  false
);

const Bulbasaur = new Monster("Bulbasaur",
  {
    hp: 65,
    att: 37,
    matt: 45,
    def: 37,
    mdef: 45,
    speed: 35
  },
  [Tackle, VineWhip, TakeDown, RazorLeaf],
  "grass",
  "fire",
  "water",
  false
);

const Squirtle = new Monster("Squirtle",
  {
    hp: 64,
    att: 36,
    matt: 37,
    def: 45,
    mdef: 44,
    speed: 34
  },
  [Tackle, WaterGun, Bite, WaterPulse],
  "water",
  "grass",
  "fire",
  false
);
