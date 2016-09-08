/*TO DO

- Implement Long Click for "un-strict mode";

*/
/*jslint browser: true*/
/*global $, jQuery, console, alert*/

$(document).ready(function () {
	var speed		= 1,
		level		= 1,
		playMode	= "off",
		strictMode  = false,
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

		pad1 = {												// Define pads,
			num: 1,												// assigning number,
			id: "#pad1",										// pad name, and
			sound: new Audio(sounds[0])							// audio.
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

	// Generate Sequence ----------------------------------------------------
		
		seqOut = [],

		genSeq = function () {
			seqOut = [];										// Empty current sequence;
			var genNum = function () {							// Generate random number.
				var number = Math.floor(Math.random() * 4) + 1;
				return number;
			};
			for (i = 0; i < 20; i ++) {
				seqOut.push("pad" + genNum(i));					// Push 20 random pad nums;
			}
			return seqOut;										// Return sequence.
		};

	// Run SubSequence for Level --------------------------------------------
	
	var seqIn = [],												// Define empty sequence In;
	
		subSeq = [];											// Define empty sub sequence.

	var runSubSeqForLevel = function (seq) {
			subSeq = seq.slice(0, level);						// Define subSeq as level-length slice of seqOut;
			seqIn = [];											// reset seqIn;
			playMode = "listen";								// set playMode to Listen.
			$('.go').text(level);
			$('.go').switchClass('go-play', 'go-listen', 0, null);
			$('.pad').switchClass(null, 'off');
			var counter = 0;
			var interval = setInterval(function () {
				$("#" + subSeq[counter]).switchClass(
					null, subSeq[counter] + '-lit', 0, null
				);
				sounds[subSeq[counter]].play();
				setTimeout(function () {
					$("#" + subSeq[counter - 1]).switchClass(
						subSeq[counter - 1] + '-lit', null, 0, 'easeOutQuart'	// Why counter - 1?
					);
				}, 500 - (speed * 30));
				counter++;
				if (counter === subSeq.length) {
					clearInterval(interval);
					playMode = 'play';
					$('.go').switchClass('go-listen off', 'go-play', 0, null);
					$('.pad').switchClass('off', null, 0, null);
				}
			}, 800 - (speed * 30));
	};
	
	// Flash Pads -----------------------------------------------------------
	
	var flashAll = function (firstClassToFlash, secondClassToFlash) {
		$('.pad').switchClass(
			"pad1-lit pad2-lit pad3-lit pad4-lit go-play go-listen", 'off ' + firstClassToFlash, 0						
		);
		$('.mode, .go').switchClass(
			"go-play go-listen", 'off go-depress ' + secondClassToFlash, 0						
		);
		var counter = 0;
		var alertInterval = setInterval(function() {			//Flash interval
			setTimeout(function() {
				$('.pad').toggleClass(firstClassToFlash);
			}, 200);
			setTimeout(function() {
				$('.mode, .go').toggleClass(secondClassToFlash);
			}, 200);
			counter++;
			if (counter == 5) {
				clearInterval(alertInterval);
			}
		}, 400);
		$('.mode').switchClass('off');							// Enable Mode button
	};
	
	// Hit Pad -------------------------------------------------------------

	var hitPad = function (pad) {
		if (playMode === "off" || playMode === "listen") {
			return;
		} else if (playMode === "play") {
			sounds[pad].play();
			seqIn.push(pad);
			for (i = 0; i < seqIn.length; i++) {
				if (seqIn[i] !== subSeq[i]) {					// If input and output sequences match,
					$('.go').text("?!");
					sounds['lose'].play();						// play Lose sound and
					flashAll('alert-red', 'alert-red-inner');	// flash Lose alert.
					if (strictMode === true) {					// If strictMode is true,
							level = 1;							// reset level to 1 and
							genSeq();							// generate new sequence.
						};
					setTimeout(function () {					// Set timer to
						runSubSeqForLevel(seqOut)				// rerun subsequence for current level
					}, 3000);									// after pads finish flashing.
				};	
			};
			if (seqIn.length == subSeq.length && seqIn.every(	// If seqIn and seqOut are equal,
				function(element, index) {
					return element === subSeq[index]; 
				})) {
				$('.go').text("!");
				sounds['win'].play();							// play Win Sound and
				flashAll('alert-green', 'alert-green-inner');		// flash Win alert.
				level += 1;
				speed += 1;
				setTimeout(function () {runSubSeqForLevel(seqOut)}, 3000);
			};
		}
	};
	
	// Turn Off --------------------------------------------------------------------
	
	function turnOff () {
		playMode = "off";
		strictMode = false;
		level = 1;
		speed = 1;
		$('.go').switchClass('go-listen go-play', null, 0, null);
		$('.pad').switchClass(null, 'off', 0, null);
		$('.go').text("");
	};

	// Pad Click Event -------------------------------------------------------------

	$(".pad").click(function() {
		var that = this.id;
		hitPad(that);
	});
	
	// "Go" Button Click Event -----------------------------------------------------
	
	$(".go").click(function () {
		if (playMode === "off") {
			playMode = "listen";
			$(".go").switchClass("go-play", "go-listen", 0, null);
			$('.pad').switchClass('off', null, 0, null);		//allow user clicks
			genSeq();
			runSubSeqForLevel(seqOut);
		} else if (playMode === "listen") {
			turnOff();
		} else if (playMode === "play") {
			turnOff();
		}
		console.log(playMode);
	});
	
	// "Strict Mode" Button Click Event --------------------------------------------
	
	$('.mode').click(function () {
		$('.mode').toggleClass("mode-active");
		if (strictMode === false) {
			strictMode = true;
			$('.mode').text("");
			console.log(strictMode);
		} else {
			strictMode = false;
			$('.mode').text("strict");
			console.log(strictMode);
		}
	});
	
});