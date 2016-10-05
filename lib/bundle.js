/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _attack = __webpack_require__(2);
	
	var _attack2 = _interopRequireDefault(_attack);
	
	var _monster = __webpack_require__(3);
	
	var _monster2 = _interopRequireDefault(_monster);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", $(function () {
	  //grab canvas
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');
	  var muted = false;
	  var mute = document.getElementById("mute");
	  var buffering = false;
	  mute.addEventListener("click", function () {
	    if (!buffering) {
	      buffering = true;
	      if (muted === false) {
	        $(".music").each(function () {
	          $(this).prop("volume", 0);
	        });
	        mute.style.backgroundImage = "url('./lib/pics/unmute.png')";
	        muted = true;
	      } else {
	        $(".music").each(function () {
	          $(this).prop("volume", 1);
	        });
	        mute.style.backgroundImage = "url('./lib/pics/mute.png')";
	        muted = false;
	      }
	    }
	    buffering = false;
	  });
	
	  //grab background images
	  var background = new Image();
	  background.src = "lib/pics/intro1/frame_0_delay.gif";
	  var background2 = new Image();
	  background2.src = "lib/pics/oaklab.jpg";
	
	  //set home background
	  var home_frame = 0;
	  var first_scene = true;
	
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
	
	  var animatehomeint = setInterval(function () {
	    if (home_frame > 40) {
	      home_frame = 0;
	      first_scene = false;
	    }
	    if (first_scene) {
	      background.src = "lib/pics/intro1/frame_" + ("" + home_frame) + "_delay.gif";
	    } else {
	      background.src = "lib/pics/intro2/frame_" + ("" + home_frame) + "_delay.gif";
	    }
	    background.onload = function () {
	      ctx.drawImage(background, 0, 0, 800, 600);
	    };
	    home_frame++;
	  }, 200);
	
	  var select = [];
	  select.push(document.getElementById('select-charmander'));
	  select.push(document.getElementById('select-bulbasaur'));
	  select.push(document.getElementById('select-squirtle'));
	
	  select.forEach(function (el) {
	    return el.style.display = "none";
	  });
	  var pokemonList = [Charmander, Bulbasaur, Squirtle];
	  select[0].addEventListener("click", function () {
	    initiateBattle(pokemonList[0], pokemonList[Math.floor(Math.random() * 3)]);
	  });
	  select[1].addEventListener("click", function () {
	    initiateBattle(pokemonList[1], pokemonList[Math.floor(Math.random() * 3)]);
	  });
	  select[2].addEventListener("click", function () {
	    initiateBattle(pokemonList[2], pokemonList[Math.floor(Math.random() * 3)]);
	  });
	  //grab pokemon pics
	  var bulb = new Image();
	  bulb.src = "lib/pics/bulbasaur.png";
	  var char = new Image();
	  char.src = "lib/pics/charmander.png";
	  var squir = new Image();
	  squir.src = "lib/pics/squirtle.png";
	
	  //add click listener to start-button
	  $(".everything").ready(function () {
	    $(".everything").on("click", "#start-button", function () {
	      drawCharSelect(0, 0);
	    });
	  });
	
	  //render character select screen
	  function drawCharSelect(x, y) {
	    background2.src = "lib/pics/oaklab.jpg";
	    clearInterval(animatehomeint);
	    ctx.clearRect(0, 0, 800, 600);
	    $("#start-button").hide();
	    ctx.drawImage(background2, 0, 0, 800, 600);
	    select.forEach(function (el) {
	      return el.style.display = "block";
	    });
	    ctx.font = "42px VT323";
	    ctx.fillStyle = "yellow";
	    ctx.fillText("Select your pokemon", 250, 550);
	    ctx.font = "30px Verdana";
	    ctx.fillStyle = "green";
	    ctx.drawImage(bulb, 115, 280, 100, 100);
	    ctx.fillText("Bulbasaur", 90, 445);
	    ctx.fillStyle = "red";
	    ctx.drawImage(char, 380, 280, 100, 100);
	    ctx.fillText("Charmander", 325, 445);
	    ctx.fillStyle = "blue";
	    ctx.drawImage(squir, 600, 280, 100, 100);
	    ctx.fillText("Squirtle", 595, 445);
	  }
	  //start battle
	  var background3 = new Image();
	  var bsrc = Math.floor(Math.random() * 3);
	  switch (bsrc) {
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
	
	  var animateInterval = void 0;
	
	  function initiateBattle(p1, p2) {
	    var themesong = document.getElementById("theme");
	    var battlesong = document.getElementById("battle");
	    themesong.muted = true;
	    battlesong.currentTime = 2;
	    battlesong.play();
	    $(".logo").hide();
	    var player = p1.getNewInstanceOfMonster(true);
	    var comp = p2.getNewInstanceOfMonster(false);
	    var battle = new _game2.default(player, comp);
	    select.forEach(function (el) {
	      return el.style.display = "none";
	    });
	    ctx.clearRect(0, 0, 800, 600);
	    ctx.drawImage(background3, 0, 0, 800, 600);
	    for (var i = 0; i < 3; i++) {
	      ctx.fillStyle = "#000";
	      setTimeout(function () {
	        ctx.fillRect(0, 0, 800, 600);
	      }, 300 * (i + 1));
	      setTimeout(function () {
	        ctx.clearRect(0, 0, 800, 600);
	      }, 300 * (i + 1) + 200);
	    }
	    setTimeout(function () {
	      ctx.drawImage(background3, 0, 0, 800, 600);
	      var animatePokeballsInterval = setInterval(function () {
	        animatePokeballs();
	      }, 10);
	
	      setTimeout(function () {
	        document.getElementById("pokeball").play();
	        clearInterval(animatePokeballsInterval);
	        ctx.clearRect(0, 0, 800, 600);
	        ctx.drawImage(background3, 0, 0, 800, 600);
	        $("." + p2.name + "-front").show();
	        $("." + p1.name + "-back").show();
	        $("#my-hp").show();
	        $("#opp-hp").show();
	        $("#my-hp").animate({ width: "300px" }, 500);
	        $("#opp-hp").animate({ width: "300px" }, 500);
	        var attacks = void 0;
	        if (battle.player.name === "Charmander") {
	          attacks = $(".charmander-attack");
	          attacks.show();
	        } else if (battle.player.name === "Bulbasaur") {
	          attacks = $(".bulbasaur-attack");
	          attacks.show();
	        } else {
	          attacks = $(".squirtle-attack");
	          attacks.show();
	        };
	
	        var _loop = function _loop(_i) {
	          $(attacks[_i]).click(function () {
	            commenceBattle(battle, attacks, _i);
	          });
	        };
	
	        for (var _i = 0; _i < 4; _i++) {
	          _loop(_i);
	        };
	      }, 1600);
	    }, 1200);
	  }
	
	  var px = 0;
	  var py = 450;
	  var frame = 0;
	  var frameRate = 0;
	  var cx = 700;
	  var cy = 100;
	  function animatePokeballs() {
	    ctx.save();
	    ctx.drawImage(background3, 0, 0, 800, 600);
	    ctx.clearRect(0, 0, 800, 500);
	    ctx.drawImage(background3, 0, 0, 800, 600);
	    ctx.drawImage(pokeballImg, 65 * frameRate, 0, 60, 60, px, py, 40, 40);
	    ctx.drawImage(pokeballImg, 65 * frameRate, 0, 60, 60, cx, cy, 40, 40);
	    px++;
	    cx--;
	    frame++;
	    frameRate = Math.floor(frame / 2);
	    if (px < 30) {
	      cy--;
	    } else {
	      cy++;
	    }
	    if (px < 100) {
	      py--;
	    } else {
	      py++;
	    }
	    if (frame > 12) {
	      frame = 0;
	    }
	    ctx.restore();
	  };
	
	  var pokeballImg = new Image();
	  pokeballImg.src = "lib/pics/pokeball.png";
	  var data = void 0;
	  function commenceBattle(battle, attacks, i) {
	    attacks.hide();
	    data = battle.genSequence(i);
	    setTimeout(function () {
	      animateAttacks(data.f1, data.f2, data.a1, data.d1);
	    }, 100);
	    if (data.f2.stats.hp > 0) {
	      setTimeout(function () {
	        animateAttacks(data.f2, data.f1, data.a2, data.d2);
	      }, 3600);
	    }
	    setTimeout(function () {
	      console.log("your hp: " + battle.player.stats.hp);
	      console.log("your opponents hp: " + battle.comp.stats.hp);
	      console.log("your opponent: " + battle.comp.name);
	      ctx.drawImage(background3, 0, 0, 800, 600);
	      attacks.show();
	    }, 7100);
	  }
	
	  function animateAttacks(f1, f2, a, d) {
	    ctx.clearRect(0, 500, 800, 100);
	    ctx.font = "32px Ubuntu";
	    ctx.fillStyle = "black";
	
	    if (f1.human) {
	
	      if (a.name === "firefang") {
	        $("#fire-you").animate({ height: "40px" }, 1000);
	        $("#bite-you").show();
	        setTimeout(function () {
	          $("#bite-you").hide();
	          $("#bite-you2").show();
	        }, 700);
	        $("#fire-you").animate({ height: "0" }, 500);
	        setTimeout(function () {
	          $("#bite-you2").hide();
	        }, 1200);
	      } else if (a.typing === "fire") {
	        $("#fire-you").animate({ height: "40px" }, 1000);
	        $("#fire-you").animate({ height: "0" }, 500);
	      } else if (a.name === "scratch") {
	        var scratch = $("#scratch-you");
	        scratch[0].style.width = "150px";
	        scratch.animate({ width: "240px" }, 1000);
	        scratch.animate({ width: "0" }, 200);
	      } else if (a.typing === "normal") {
	        for (var i = 0; i < 3; i++) {
	          $("#tackle-you").animate({ width: "100" }, 200);
	          $("#tackle-you").animate({ width: "0" }, 100);
	        }
	      } else if (a.typing === "grass") {
	        $("#leaves-you").animate({ height: "40" }, 300);
	        for (var _i2 = 0; _i2 < 4; _i2++) {
	          $("#leaves-you").animate({ left: "510" }, 100);
	          $("#leaves-you").animate({ left: "520" }, 100);
	        }
	        $("#leaves-you").animate({ height: "0" }, 500);
	      } else if (a.typing === "water") {
	        $("#water-you").show();
	        setTimeout(function () {
	          $("#water-you").hide();
	        }, 1500);
	      } else if (a.typing === "dark") {
	        $("#bite-you").show();
	        setTimeout(function () {
	          $("#bite-you").hide();
	          $("#bite-you2").show();
	        }, 700);
	        setTimeout(function () {
	          $("#bite-you2").hide();
	        }, 1200);
	      }
	
	      document.getElementById("attack-sound").play();
	
	      for (var _i3 = 0; _i3 < 3; _i3++) {
	        setTimeout(function () {
	          $("." + f2.name + "-front").hide();
	        }, 700 * _i3);
	        setTimeout(function () {
	          $("." + f2.name + "-front").show();
	        }, 700 * _i3 + 200);
	      }
	
	      setTimeout(function () {
	        if (d === 0) {
	          ctx.fillText("Your " + a.name + " missed!", 50, 550);
	        } else {
	          var hpwidth = 200 * (f2.stats.hp / f2.maxHP);
	          $(".opp-hp-bar").animate({ width: hpwidth }, 500);
	          ctx.fillText("Your " + a.name + " dealt " + d + " damage!", 50, 550);
	          if (hpwidth === 0) {
	            //render victory
	            var victorysong = document.getElementById("victory-sound");
	            var battlesong = document.getElementById("battle");
	            battlesong.muted = true;
	            victorysong.currentTime = 11;
	            victorysong.play();
	            finished(1);
	          }
	        }
	      }, 1500);
	      //opponent attacks me
	    } else {
	      if (a.name === "firefang") {
	        $("#fire-me").animate({ height: "60px" }, 1000);
	        $("#bite-me").show();
	        setTimeout(function () {
	          $("#bite-me").hide();
	          $("#bite-me2").show();
	        }, 700);
	        $("#fire-me").animate({ height: "0" }, 500);
	        setTimeout(function () {
	          $("#bite-me2").hide();
	        }, 1200);
	      } else if (a.typing === "fire") {
	        $("#fire-me").animate({ height: "60px" }, 1000);
	        $("#fire-me").animate({ height: "0" }, 500);
	      } else if (a.name === "scratch") {
	        var _scratch = $("#scratch-me");
	        _scratch[0].style.width = "150px";
	        _scratch.animate({ width: "240px" }, 1000);
	        _scratch.animate({ width: "0" }, 200);
	      } else if (a.typing === "normal") {
	        for (var _i4 = 0; _i4 < 3; _i4++) {
	          $("#tackle-me").animate({ width: "120" }, 200);
	          $("#tackle-me").animate({ width: "0" }, 100);
	        }
	      } else if (a.typing === "grass") {
	        $("#leaves-me").animate({ height: "60" }, 300);
	        for (var _i5 = 0; _i5 < 4; _i5++) {
	          $("#leaves-me").animate({ left: "130" }, 100);
	          $("#leaves-me").animate({ left: "140" }, 100);
	        }
	        $("#leaves-me").animate({ height: "0" }, 500);
	      } else if (a.typing === "water") {
	        $("#water-me").show();
	        setTimeout(function () {
	          $("#water-me").hide();
	        }, 1500);
	      } else if (a.typing === "dark") {
	        $("#bite-me").show();
	        setTimeout(function () {
	          $("#bite-me").hide();
	          $("#bite-me2").show();
	        }, 700);
	        setTimeout(function () {
	          $("#bite-me2").hide();
	        }, 1200);
	      }
	      document.getElementById("attack-sound").play();
	      for (var _i6 = 0; _i6 < 3; _i6++) {
	        setTimeout(function () {
	          $("." + f2.name + "-back").hide();
	        }, 400 * _i6);
	        setTimeout(function () {
	          $("." + f2.name + "-back").show();
	        }, 400 * _i6 + 200);
	      }
	
	      setTimeout(function () {
	        if (d === 0) {
	          ctx.fillText("Opponent's " + a.name + " missed!", 50, 550);
	        } else {
	          var hpwidth = 200 * (f2.stats.hp / f2.maxHP);
	          $(".my-hp-bar").animate({ width: hpwidth }, 500);
	          ctx.fillText("Opponent's " + a.name + " dealt " + d + " damage!", 50, 550);
	          if (hpwidth === 0) {
	            //render defeat
	            var defeatsong = document.getElementById("defeat-sound");
	            var battlesong = document.getElementById("battle");
	            battlesong.muted = true;
	            defeatsong.currentTime = 11;
	            defeatsong.play();
	            finished(0);
	          }
	        }
	      }, 1500);
	    }
	  }
	
	  function finished(p) {
	    if (p === 1) {
	      $("button").hide();
	      var victory = new Image();
	      victory.src = "lib/pics/victory.png";
	      ctx.clearRect(0, 0, 800, 600);
	      ctx.drawImage(victory, 0, 0, 800, 600);
	    } else {
	      $("button").hide();
	      var defeat = new Image();
	      defeat.src = "lib/pics/defeat.png";
	      ctx.clearRect(0, 0, 800, 600);
	      ctx.drawImage(defeat, 0, 0, 800, 600);
	    }
	  }
	})); //https://codeshare.io/wbEIH
	
	var Scratch = new _attack2.default("scratch", 40, "normal", 100, "att", null);
	var Ember = new _attack2.default("ember", 40, "fire", 100, "matt", null);
	var FireFang = new _attack2.default("firefang", 65, "fire", 95, "att", null);
	var Inferno = new _attack2.default("inferno", 100, "fire", 50, "matt", null);
	
	var Tackle = new _attack2.default("tackle", 50, "normal", 100, "att", null);
	var VineWhip = new _attack2.default("vinewhip", 45, "grass", 100, "att", null);
	var TakeDown = new _attack2.default("takedown", 90, "normal", 85, "att", null);
	var RazorLeaf = new _attack2.default("razorleaf", 55, "grass", 95, "att", null);
	
	var WaterGun = new _attack2.default("watergun", 40, "water", 100, "matt", null);
	var Bite = new _attack2.default("bite", 60, "dark", 100, "att", null);
	var WaterPulse = new _attack2.default("waterpulse", 60, "water", 100, "matt", null);
	
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
	
	var Charmander = new _monster2.default("Charmander", {
	  hp: 62,
	  att: 38,
	  matt: 42,
	  def: 34,
	  mdef: 37,
	  speed: 45
	}, [Scratch, Ember, FireFang, Inferno], "fire", "water", "grass", false);
	
	var Bulbasaur = new _monster2.default("Bulbasaur", {
	  hp: 65,
	  att: 37,
	  matt: 45,
	  def: 37,
	  mdef: 45,
	  speed: 35
	}, [Tackle, VineWhip, TakeDown, RazorLeaf], "grass", "fire", "water", false);
	
	var Squirtle = new _monster2.default("Squirtle", {
	  hp: 64,
	  att: 36,
	  matt: 37,
	  def: 45,
	  mdef: 44,
	  speed: 34
	}, [Tackle, WaterGun, Bite, WaterPulse], "water", "grass", "fire", false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// gameplay logic
	
	var Battle = function () {
	  function Battle(m1, m2) {
	    _classCallCheck(this, Battle);
	
	    this.player = m1;
	    this.comp = m2;
	    this.rendering = false;
	  }
	
	  _createClass(Battle, [{
	    key: "genSequence",
	    value: function genSequence(pA) {
	      // Prevent user from spamming button while animation is going on
	      if (this.rendering) {
	        return;
	      }
	      this.rendering = true;
	
	      var firstAttacker = void 0;
	      var secondAttacker = void 0;
	      var firstAttackerAttack = void 0;
	      var secondAttackerAttack = void 0;
	      var f1 = void 0;
	      var f2 = void 0;
	      var d1 = void 0;
	      var d2 = void 0;
	      var a1 = void 0;
	      var a2 = void 0;
	      //determine first attacker
	      if (this.player.stats.speed < this.comp.stats.speed) {
	        firstAttacker = this.comp;
	        secondAttacker = this.player;
	        firstAttackerAttack = Math.floor(Math.random() * 4);
	        secondAttackerAttack = pA;
	        f1 = this.comp;
	        f2 = this.player;
	        a1 = this.comp.attacks[firstAttackerAttack];
	        a2 = this.player.attacks[secondAttackerAttack];
	      } else {
	        firstAttacker = this.player;
	        secondAttacker = this.comp;
	        firstAttackerAttack = pA;
	        secondAttackerAttack = Math.floor(Math.random() * 4);
	        f1 = this.player;
	        f2 = this.comp;
	        a1 = this.player.attacks[firstAttackerAttack];
	        a2 = this.comp.attacks[secondAttackerAttack];
	      };
	
	      //first attacker attacks
	      d1 = this.attack(firstAttacker, secondAttacker, firstAttackerAttack);
	
	      if (secondAttacker.stats.hp <= 0) {
	        this.gameOver(firstAttacker);
	        this.rendering = false;
	        return { f1: f1, f2: f2, a1: a1, a2: a2, d1: d1, d2: d2 };
	      }
	      //check if second attacker is still alive to attack, and attack
	      d2 = this.attack(secondAttacker, firstAttacker, secondAttackerAttack);
	
	      if (firstAttacker.stats.hp <= 0) {
	        this.gameOver(secondAttacker);
	        return { f1: f1, f2: f2, a1: a1, a2: a2, d1: d1, d2: d2 };
	      }
	
	      this.rendering = false;
	      return { f1: f1, f2: f2, a1: a1, a2: a2, d1: d1, d2: d2 };
	    }
	  }, {
	    key: "attack",
	    value: function attack(offender, defender, attNum) {
	      // Determine how to proceed depending if attack is a damager or buffer
	      var attPower = void 0;
	      var defPower = void 0;
	      var modifier = 1;
	      var att = offender.attacks[attNum];
	      if (att.attType == "matt") {
	        attPower = offender.stats.matt;
	        defPower = defender.stats.mdef;
	      } else {
	        attPower = offender.stats.att;
	        defPower = defender.stats.def;
	      };
	
	      if (att.typing === defender.weakness) {
	        modifier = 2;
	      } else if (att.typing === defender.strength) {
	        modifier = 0.75;
	      };
	
	      var damage = Math.floor((50 / 7 * attPower * att.damage / (defPower * 50) + 2) * modifier * (Math.floor(Math.random() * 38 + 217) / 255));
	      if (Math.random() * 100 >= att.accuracy) {
	        damage = 0;
	      };
	
	      defender.stats.hp -= damage;
	      if (defender.stats.hp < 0) {
	        defender.stats.hp = 0;
	      }
	      return damage;
	    }
	  }, {
	    key: "gameOver",
	    value: function gameOver(winner) {
	      if (winner === this.player) {
	        console.log("Victory");
	      } else {
	        console.log("Defeat");
	      };
	    }
	  }]);
	
	  return Battle;
	}();
	
	exports.default = Battle;
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//Attacks class
	
	var Attacks = function Attacks(name, damage, typing, accuracy, attType, pic) {
	  _classCallCheck(this, Attacks);
	
	  this.name = name;
	  this.damage = damage;
	  this.typing = typing;
	  this.accuracy = accuracy;
	  this.pic = pic;
	  this.attType = attType;
	};
	
	exports.default = Attacks;
	;
	
	// export default class Buffs extends Attacks {
	//  	constructor(){
	//     super;
	//     this.effects = effects;
	
	//   }
	// }

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// monster class
	
	var Monster = function () {
	  function Monster(name, stats, attacks, typing, weakness, strength, human) {
	    _classCallCheck(this, Monster);
	
	    this.stats = stats;
	    this.attacks = attacks;
	    this.typing = typing;
	    this.name = name;
	    this.weakness = weakness;
	    this.strength = strength;
	    this.human = human;
	    this.maxHP = stats.hp;
	  }
	
	  _createClass(Monster, [{
	    key: "getNewInstanceOfMonster",
	    value: function getNewInstanceOfMonster(human) {
	      var newMonster = new Monster(this.name, Object.assign({}, this.stats), Object.assign([], this.attacks), this.typing, this.weakness, this.strength, human);
	      return newMonster;
	    }
	  }]);
	
	  return Monster;
	}();
	
	exports.default = Monster;
	;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map