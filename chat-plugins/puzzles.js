/**
* Puzzle Page Helper Commands
* Multiple commands with the object of helping with parameters, anagrams, and the like.
* Credits: AWailOfATail
*/

'use strict';

exports.commands = {

	//Parameter Functions
	//~~~~~~~~~~~~~~~~~~~
	
	//provides combinations within given categories
	aw: 'anagramwhole',
	anagramwhole: function (target, room, user, connection, cmd, message) {
		let exact = false;
		let endArray = [];
		let categoriesArray = [];
		let parameters = target.split(",");
		for (let z = 0; z < parameters.length; z++) {
			parameters[z] = parameters[z].trim();
			if (z > 0) categoriesArray.push([parameters[z], []]);
		}
		//inside categoriesArray is now ready to be set up as:
		//[category, [failed, failed, ...]], [category, [failed, failed, ...]], ...
		//will take longer, but have function run through all data in Dex until it fails for ALL of them
		if (parameters[0].indexOf('$') === 0) {
			parameters[0] = parameters[0].slice(1);
			exact = true;
		} 
		let anagramArray = parameters[0].split("");
		
		for (let i = 0; i < categoriesArray.length; i++) {
			
		}
	},
	anagramwholehelp: [
		"/aw [anagram], [category], [category], [category], ... returns a combination of words in those categories that fit within the anagram.",
		"Categories must be one of the following: ability, item, move, pokemon",
	],
	
	//provides list of possible moves
	am: 'anagrammove',
	anagrammove: function (target, room, user, connection, cmd, message) {
		let showAll = true;
		let anagramArray = target.split("");
		let nameArray = [];
		for (let move in Dex.data.Movedex) {
			let moveData = Dex.getMove(move);
			let name = moveData.id;
			for (let k = 0; k < name.length; k++){
				let currLetter = name.slice(k, k+1);
				if (anagramArray.indexOf(currLetter) < 0) {
					k = name.length + 2;
				}
				if (k === name.length - 1){
					nameArray.push(name);
				}
				anagramArray[anagramArray.indexOf(currLetter)] = "";
			}
			anagramArray = target.split("");
		}
		this.sendReplyBox(nameArray);
	},
	anagrammovehelp: [
		"/am [anagram] returns a list of moves that can be formed by rearranging the letters in [anagram].",
	],

	//provides list of possible pokemon
	ap: 'anagrampokemon',
	anagrampokemon: function (target, room, user, connection, cmd, message) {
		let showAll = true;
		let anagramArray = target.split("");
		let nameArray = [];
		for (let pokemon in Dex.data.Pokedex) {
			let template = Dex.getTemplate(pokemon);
			let name = template.id;
			for (let k = 0; k < name.length; k++){
				let currLetter = name.slice(k, k+1);
				if (anagramArray.indexOf(currLetter) < 0) {
					k = name.length + 2;
				}
				if (k === name.length - 1){
					nameArray.push(name);
				}
				anagramArray[anagramArray.indexOf(currLetter)] = "";
			}
			anagramArray = target.split("");
		}
		this.sendReplyBox(nameArray);
	},
	anagrampokemonhelp: [
		"/ap [anagram] returns a list of Pokemon that can be formed by rearranging the letters in [anagram].",
	],

	//provides list of possible items
	ai: 'anagramitem',
	anagramitem: function (target, room, user, connection, cmd, message) {
		let showAll = true;
		let anagramArray = target.split("");
		let nameArray = [];
		for (let n in Dex.data.Items) {
			let item = Dex.getItem(n);
			let name = item.id;
			for (let k = 0; k < name.length; k++){
				let currLetter = name.slice(k, k+1);
				if (anagramArray.indexOf(currLetter) < 0) {
					k = name.length + 2;
				}
				if (k === name.length - 1){
					nameArray.push(name);
				}
				anagramArray[anagramArray.indexOf(currLetter)] = "";
			}
			anagramArray = target.split("");
		}
		this.sendReplyBox(nameArray);
	},
	anagramitemhelp: [
		"/ai [anagram] returns a list of items that can be formed by rearranging the letters in [anagram].",
		"Reminder that some Key Items and others may not be in the Showdown list and therefore not be accounted for.",
	],

	//provides list of possible abilities
	aa: 'anagramability',
	anagramability: function (target, room, user, connection, cmd, message) {
		let showAll = true;
		let anagramArray = target.split("");
		let nameArray = [];
		for (let n in Dex.data.Abilities) {
			let ability = Dex.getAbility(n);
			let name = ability.id;
			for (let k = 0; k < name.length; k++){
				let currLetter = name.slice(k, k+1);
				if (anagramArray.indexOf(currLetter) < 0) {
					k = name.length + 2;
				}
				if (k === name.length - 1){
					nameArray.push(name);
				}
				anagramArray[anagramArray.indexOf(currLetter)] = "";
			}
			anagramArray = target.split("");
		}
		this.sendReplyBox(nameArray);
	},
	anagramabilityhelp: [
		"/aa [anagram] returns a list of abilities that can be formed by rearranging the letters in [anagram].",
	],


	//need way to see what doesn't work
	ar: 'anagramreduce',
	anagramreduce: function (target, room, user, connection, cmd, message) {
		let endArray = [];
		let parameters = target.split(",");
		for (let z = 0; z < parameters.length; z++){
			parameters[z] = parameters[z].trim();
		}
		let anagramArray = parameters[0].split("");
		for (let i = 1; i < parameters.length; i++) {
			let firstArg = parameters[i].split("");
			for (let j = i + 1; j < parameters.length; j++) {
				anagramArray = parameters[0].split("");
				let secondArg = parameters[j].split("");
				let argArray = firstArg.concat(secondArg)
				for (let k = 0; k < argArray.length; k++) {
					if (anagramArray.indexOf(argArray[k]) < 0) {
						endArray.push(parameters[i] + " + " + parameters[j]);
						k = 100000;
					} else {
						anagramArray[anagramArray.indexOf(argArray[k])] = "";
					}
				}
			}
		}
		this.sendReplyBox(endArray);
	},
	anagramreducehelp: [
		"/ar [anagram], [parameter], [parameter], [parameter], ... returns combinations of parameters that do not work together in the anagram.",
		"What was this for again?",
	],

	//provides combinations that work together within the anagram
	as: 'anagramsolve',
	anagramsolve: function (target, room, user, connection, cmd, message) {
		let endArray = [];
		let parameters = target.split(",");
		for (let z = 0; z < parameters.length; z++){
			parameters[z] = parameters[z].trim();
		}
		let anagramArray = parameters[0].split("");
		for (let i = 1; i < parameters.length; i++) {
			let firstArg = parameters[i].split("");
			for (let j = i + 1; j < parameters.length; j++) {
				anagramArray = parameters[0].split("");
				let secondArg = parameters[j].split("");
				let argArray = firstArg.concat(secondArg)
				for (let k = 0; k < argArray.length; k++) {
					if (anagramArray.indexOf(argArray[k]) < 0) {
						k = 100000;
					} else {
						anagramArray[anagramArray.indexOf(argArray[k])] = "";
						if (k === argArray.length - 1) {
							endArray.push(parameters[i] + " + " + parameters[j]);
							k = 100000;
						}
					}
				}
			}
		}
		this.sendReplyBox(endArray);
	},
	anagramsolvehelp: [
		"/as [anagram], [parameter], [parameter], [parameter], ... returns combinations of parameters that work together in the anagram.",
	],
	
	minus: function (target, room, user, connection, cmd, message) {
		let endStr = '';
		let parameters = target.split(',');
		for (let z = 0; z < parameters.length; z++){
			parameters[z] = parameters[z].trim();
		}
		endStr = parameters[0];
		for (let i = 1; i < parameters.length; i++) {
			let arg = parameters[i].split('');
			for (let j = 0; j < arg.length; j++) {
				if (endStr.indexOf(arg[j]) !== -1) {
					endStr = endStr.slice(0, endStr.indexOf(arg[j])) + endStr.slice(1 + endStr.indexOf(arg[j]), endStr.length);
				} else {
					i = 999;
					j = 999;
					endStr = 'nope!!!';
				}
			}
		}
		this.sendReplyBox(endStr);
	},
	minushelp: [
		"/minus [anagram], [parameter], [parameter], ... returns anagram with letters from all parameters removed."
	],
	
	

	//used for Pokemon Countdown
	longest: function (target, room, user, connection, cmd, message) {
		let endArray = [];
		let parameters = target.split(",");
		for (let i = 0; i < parameters.length; i++){
			parameters[i] = parameters[i].trim();
			if (i === 0) {
				endArray.push(parameters[0]);
			} else {
				if (parameters[i].length >= endArray[endArray.length - 1].length) {
					endArray.push(parameters[i]);
				}
			}
		}
		this.sendReplyBox(endArray);
	},
	longesthelp: [
		"/longest [parameter], [parameter], [parameter], ... returns the longest parameter(s) in the form of an array.",
		"The last parameter in the answer will be the longest or tied for the longest.",
	],

	//Portmanteau Functions
	//~~~~~~~~~~~~~~~~~~~~~

	//use dexsearch with | to get list of possible pokemon
	port: 'portmanteau',
	portmanteau: function (target, room, user, connection, cmd, message) {
		let endArray = [];
		let pokemonArray = target.split(",");
		for (let i = 0; i < pokemonArray.length; i++){
			pokemonArray[i] = pokemonArray[i].trim().toLowerCase();
		}
		//pokemonArray is now all lowercase with no spaces

		for(let i = 0; i < pokemonArray.length; i++) {
			endArray = [];
			let pokemonMain = pokemonArray[i];
			for (let j = 0; j < pokemonArray.length; j++) {
				if (j !== i) {
					let pokemonTrial = pokemonArray[j];
					for (let k = 2; k < pokemonMain.length + 1; k++){
						if (pokemonMain.slice(pokemonMain.length - k) === pokemonTrial.slice(0,k)) {
							endArray.push(pokemonTrial);
							k = 100;
						}
					}
				}
			}
			if (endArray.length !== 0) {
				this.sendReplyBox(pokemonMain.toUpperCase() + ": " + endArray);
			}
		}
	},
};
