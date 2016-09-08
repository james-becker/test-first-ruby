/*TO DO

- Implement Long Click for "un-strict mode";

*/
/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(document).ready(function () {
	console.log("JS initialized...");
	var speed		= 1,
		level		= 1,
		playMode	= "off",
		strictMode  = true,
		foo			= "https://s3.amazonaws.com/freecodecamp/simonSound",
		sounds = {
			'pad1': new Audio(foo + "1.mp3"),
			'pad2': new Audio(foo + "2.mp3"),
			'pad3': new Audio(foo + "3.mp3"),
			'pad4': new Audio(foo + "4.mp3"),
			'lose': new Audio("https://www.dropbox.com/s/chztwstrs37jq6p/simonLose.mp3?raw=1"),
			'win': new Audio("https://www.dropbox.com/s/gx7sd0nwxqlp8i1/simonWin.mp3?raw=1")
		},

	// Pads -------------------------------------------------------------

		pad1 = {
			num: 1,
			id: "#pad1",
			sound: new Audio(sounds[0])
		},
		pad2 = {
			num: 2,
			id: "#pad2",
			sound: new Audio(sounds[1])
		},
		pad3 = {
			num: 3,
			id: "#pad3",
			sound: new Audio(sounds[2])
		},
		pad4 = {
			num: 4,
			id: "#pad4",
			sound: new Audio(sounds[3])
		},

	// Generate Sequence -------------------------------------------------------------
		
		seqOut = [],

		genSeq = function () {
		seqOut = [];										// Empty current sequence
		var genNum = function () {							// Generate random number
			var number = Math.floor(Math.random() * 4) + 1;
			return number;
		};
		for (i = 0; i < 20; i ++) {
			seqOut.push("pad" + genNum(i));					// Push 20 random pad nums
		}
		return seqOut;										// Return sequence
		};

	// Run Sequence -------------------------------------------------------------
	
	var seqIn = [],
	
		subSeq = [];

	var runSubSeqForLevel = function (seq) {
		subSeq = seq.slice(0, level);						// Define subSeq as level-length slice of seqOut,
		seqIn = [];											// reset seqIn, and
		playMode = "listen";								// set playMode to Listen
		$('.go').text(level);
		$(".go").switchClass("go-play", "go-listen", 0, null);
		$('.pad').switchClass(null, 'off');
		var counter = 0;
		var interval = setInterval(function () {
			$("#" + subSeq[counter]).switchClass(null, subSeq[counter] + '-lit', 0, null);
			sounds[subSeq[counter]].play();
			setTimeout(function () {
				$("#" + subSeq[counter - 1]).switchClass(subSeq[counter - 1] + '-lit', null, 0, 'easeOutQuart'); //Why counter-1?
			}, 500 - (speed * 30));
			counter++;
			if (counter === subSeq.length) {
				clearInterval(interval);
				$('.go').switchClass('go-listen', 'go-play', 0, null);
				playMode = 'play';
				console.log('playMode is ' + playMode);
				$('.pad').switchClass('off', null, 0, null);
			}
		}, 800 - (speed * 30));
	};
	
	// Flash Pads -----------------------------------------------------------
	
	var flashAll = function (classToFlash) {
		console.log("flashAll " + classToFlash);
		$('.pad, .display, .go').switchClass("pad1-lit pad2-lit pad3-lit pad4-lit go-play go-listen", 'off ' + classToFlash, 0						//Dim pads, deactivate, and activate Flash class
		);
		var counter = 0;
		var alertInterval = setInterval(function() {			//Flash interval
			setTimeout(function() {
				$('.pad, .display, .go').toggleClass(classToFlash);
			}, 200);
			counter++
			if (counter == 5) {
				clearInterval(alertInterval);
			}
		}, 400);
	};
	
	// Hit Pad -------------------------------------------------------------

	var hitPad = function (pad) {
		if (playMode === "off" || playMode === "listen") {
			return;
		} else if (playMode === "play") {
			sounds[pad].play();
			seqIn.push(pad);
			console.log(seqIn);
			console.log(seqOut);
			for (i = 0; i < seqIn.length; i++) {
				if (seqIn[i] !== subSeq[i]) {					// If input and output sequences match,
					console.log('lose');
					sounds['lose'].play();						// play losing sound and
					flashAll('alert-red');						// flash all pads red.
					if (strictMode === true) {					// If strictMode is true,
							level = 1;							// reset level to 1 and
							genSeq();							// generate new sequence.
							console.log(seqOut);
						};
					setTimeout(function () {					// Set timer to
						runSubSeqForLevel(seqOut)				// rerun subsequence for current level
					}, 3000);									// after pads finish flashing.
				};	
			};
			if (seqIn.length == subSeq.length && seqIn.every(
				function(element, index) {
					return element === subSeq[index]; 
				})) {
				level += 1; console.log("level = " + level);
				speed += 1; console.log("speed = " + speed);
				console.log('win');
				sounds['win'].play();
				flashAll('alert-green ');
				setTimeout(function () {runSubSeqForLevel(seqOut)}, 3000);
			};
		}
	};

	// Pad Click Event -------------------------------------------------------------

	$(".pad").click(function() {
		var that = this.id;
		hitPad(that);
	});
	
	$(".go").click(function () {
		if (playMode === "off") {
			playMode = "listen";
			level = 1;
			$(".go").switchClass("go-play", "go-listen", 0, null);
			$('.pad').switchClass('off', null, 0, null); //allow user clicks
			console.log("Generating sequence...");
			genSeq();
			console.log(seqOut);
			runSubSeqForLevel(seqOut);
		} else if (playMode === "listen") {
			playMode = "off";
			$(".go").switchClass("go-listen go-play", null, 0, null);
		} else if (playMode === "play") {
			playMode = "off";
			$('.go').switchClass('go-listen go-play', null, 0, null);
			$('.pad').switchClass('off', null, 0, null);
		}
		console.log("playMode is " + playMode);
	});
	
});