	const Discord = require('discord.js');
	const config = require('./config.json');
	const bot = new Discord.Client();

	bot.login(config.token);

	bot.on('ready', () => {
		console.log('DiscordDungeonBot ready!');
	});

	//Variables
	var HP = 0;
	var maxHP = 0;
	var petHP = 0;
	var maxPetHP = 0;
	var doSides = true;
	var usedPots = 0;
	
	bot.on('message', message => {
		if (message.channel.name === "leaguerpg" && message.author.username === "DiscordRPG") {
			// Replace "Maxxxel's adven" with the corresponding value to you, you can get it if you do console.log(message.content) and do write #!adv 2
			// then you should see the message the Bot is sending, now copy the value like: KitzuMEME's Adv. and insert it here

			if (message.content.includes("Maxxxel's adven")) {
				//Auto Adventure
					var RNG = getRandomIntInclusive(14500, 25000);
					setTimeout(() => message.channel.send('#!adv 2'), RNG);
					//Debug
						console.log("Next Attack in " + RNG + "ms.");
				//Auto Side Quests
					if (doSides == true) {
						doSides = false;
						var RNG2 = getRandomIntInclusive(300500, 310000);
						setTimeout(() => message.channel.send('#!mine'), RNG2);
						setTimeout(() => message.channel.send('#!forage'), RNG2 + getRandomIntInclusive(100, 200));
						setTimeout(() => message.channel.send('#!chop'), RNG2 + getRandomIntInclusive(200, 300));
						setTimeout(() => message.channel.send('#!fish'), RNG2 + getRandomIntInclusive(300, 400));
						setTimeout(() => doSides = true, RNG2 + getRandomIntInclusive(400, 500));
						//Debug
							console.log("Next Sides in " + RNG2 + "ms.");
					}
				//Auto Heal
					// replace Maxxxel has with the value of your username
					// Replace all 12's with the number of letters in then name: "Maxxxel has " = 12 for example
					var HPMessageStart = message.content.search("Maxxxel has ");
					// console.log(message.content)
					var HPSplit1 = message.content.substr(HPMessageStart, 200);
					// console.log("'Maxxxel has ' at Position: " + HPSplit1);
					var HPMessageSplit = HPSplit1.search("/");
					// console.log("'/' found at Position: " + HPMessageSplit);
					HP = message.content.substr(HPMessageStart + 12, HPMessageSplit - 12);
					HP = HP.replace(",", "");
					HP = parseInt(HP);
					// console.log("Hp: " + HP);
					var HPMessageEnd = HPSplit1.search(" HP") - HPMessageSplit;
					// console.log("' HP' found at Position: " + HPMessageEnd);
					maxHP = message.content.substr(HPMessageStart + HPMessageSplit + 1, HPMessageEnd - 1);
					maxHP = maxHP.replace(",", "");
					maxHP = parseInt(maxHP);
					// console.log("maxHP: " + maxHP);
					//Check if Heal is needed
					if (HP * 100 / maxHP <= 25) {
						var numberOfPots = Math.round((maxHP - HP) / 50);
						usedPots = usedPots + numberOfPots;
						message.channel.send('#!heal ' + numberOfPots);
					}
				//Auto Pet Heal
					// Replace "LOPHT h" with your Pet name, the h comes from the "has xyz HP", if you do console.log(message.content) you will see that sometimes
					// there are spaces, thats why i made "lopht h" and not "lopht has"
					// replace the 11's with the value you got on top - 1, like i had 12 on top, so 12 - 1 = 11.
					var petHPMessageStart = message.content.search("Lopht h");
					var petHPSplit1 = message.content.substr(petHPMessageStart, 100);
					var petHPMessageSplit = petHPSplit1.search("/");
					petHP = message.content.substr(petHPMessageStart + 11, petHPMessageSplit - 11);
					petHP = petHP.replace(",", "");
					petHP = parseInt(petHP);
					var petHPMessageEnd = petHPSplit1.search(" HP") - petHPMessageSplit;
					maxPetHP = message.content.substr(petHPMessageStart + petHPMessageSplit + 1, petHPMessageEnd - 1);
					maxPetHP = maxPetHP.replace(",", "");
					maxPetHP = parseInt(maxPetHP);
					//Check if Heal is needed
					if (petHP * 100 / maxPetHP <= 25) {
						var numberOfPots = Math.round((maxPetHP - petHP) / 50);
						usedPots = usedPots + numberOfPots;
						message.channel.send('#!pheal ' + numberOfPots);
					}
				//Auto Pot Buy
					if (usedPots >= 50) {
						message.channel.send('#!buy health potion ' + usedPots);
						usedPots = 0;
					}
			}
		}
	});

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
