let outer = ["Ai", "Anar", "Andvar", "Astri", "Balin", "Bari", "Beli", 
	"Bifur", "Bildur", "Bilin", "Billing", "Blain", "Bogi", "Bofur", "Bombur", 
	"Borin", "Bor", "Bori", "Bragi", "Brimir", "Bruni", "Bur", "Buri",
	"Burin", "Dagir", "Dain", "Dis", "Dori", "Dufur", "Durin", "Durni",
	"Dwalin", "Elli", "Etri", "Falar", "Farin", "Fili", "Finar", "Floi",
	"Forgun", "Frar", "Frer", "Frerin", "Fror", "Fundin", "Galar", "Gilin", 
	"Gilling","Gimli", "Ginar", "Gladur", "Gloin", "Grani", "Grithur", 
	"Groin", "Gror","Gumir", "Haki", "Hanar", "Har", "Heid", "Hepti", 
	"Himur", "Hodur", "Hon", "Honir", "Hornbor", "Iari", "Idi", "Ilmir", 
	"Kili", "Kona", "Litir", "Lodun", "Lodur", "Lofar", "Lofi", "Lofun", 
	"Logi", "Loni","Mani", "Mar", "Moin", "Nain", "Nali", "Nar", "Narvi", 
	"Nidi", "Nipin", "Niping","Nodi", "Nodri", "Noi", "Nori", "Nur", 
	"Nyrad", "Oin", "Onar", "Ori","Otur", "Pori", "Regin", "Sigun", "Sindri", 
	"Skadi", "Skirfir", "Sudri", "Sumar", "Thegur", "Thorin", "Thrain", 
	"Thror", "Thrumir", "Vali", "Vani", "Vedir", "Veig", "Vestri", "Vidar", 
	"Vili",	"Vimur", "Virfir", "Vitir", "Ymir", "Yngvi"
];

let locative = [" of the Grey Mountains", " of the Blue Mountains", 
	" of the Iron Hills"," of the Kingdom Under the Mountain", " of Dale", 
	" of Belegost", " of Dunland", " of Moria"
];

let patronymic = [" son of ", " daughter of ", " heir of ", " of the house of ", 
	" of the line of "];

//let bynameEle1 = [];

//let bynameEle2 = [];

function chooseRandInt(range) {
	//return random integer in range == number of formats
	let randInt = Math.floor((Math.random() * range));
	return randInt;
};

function remUsed(name, from) {
	//remove a name that was just used to avoid doubles
	from.splice(from.indexOf(name), 1);
	//return list minus specified name
	return from;
};

function rhyme(name) {
	//takes outer name, returns list of outer names that share last 2 letters
	let rhymeAncestors = [];
	let end = name.slice(-2); //test last 3 letters? 
	for (let i=0; i<outer.length; i++) {
		if (outer[i].endsWith(end)) {
			rhymeAncestors.push(outer[i]);
		};
	};
	return remUsed(name, rhymeAncestors);
};

function alliterate(name) {
	//takes outer name, returns list of outer names that share 1st letter
	//no special treatment of T, since all T also Th
	let allitAncestors = [];
	let initial  = name[0];
	for (let i=0; i<outer.length; i++) {
		if (outer[i].startsWith(initial)) {
			allitAncestors.push(outer[i]);
		};
	};
	return remUsed(name, allitAncestors);
};

function choosePattern(name) {
	let rhymes = rhyme(name);
	let allits = alliterate(name);
	let ancestors = [];
	if (rhymes.length > 2) {
		if (allits.length > 2) { //if rhymes and allits both support grandparent
			let pattern = chooseRandInt(2);
			switch (pattern) {
				case 0: 
					ancestors = alliterate(name);
					break;
				case 1: 
					ancestors = rhyme(name);
					break;
			};
		} else {ancestors = rhymes;} //rhymes supports but allits does not
	} else {ancestors = allits;} //rhymes does not so allits must
	return ancestors;
};

function outerPatr() {
	let outer1 = outer[chooseRandInt(outer.length)];
	let pickFrom = choosePattern(outer1); 
	let outer2 = pickFrom[chooseRandInt(pickFrom.length)];
	let connector = patronymic[chooseRandInt(patronymic.length)];
	return outer1 + connector + outer2;
};

function outerPatrPatr() {
	let outer1 = outer[chooseRandInt(outer.length)];
	let pickFrom = choosePattern(outer1); 
	let outer2 = pickFrom[chooseRandInt(pickFrom.length)];
	remUsed(outer2, pickFrom);
	let outer3 = pickFrom[chooseRandInt(pickFrom.length)];
	let connector1 = patronymic[chooseRandInt(3)];
	let connector2 = patronymic[chooseRandInt(patronymic.length)];
	return outer1 + connector1 + outer2 + connector2 + outer3;
};

function outerLoc() {
	let outer1 = outer[chooseRandInt(outer.length)];
	let loc = locative[chooseRandInt(locative.length)];
	return outer1 + loc;
};

function outerPatrLoc() {
	let outer1 = outer[chooseRandInt(outer.length)];
	let pickFrom = choosePattern(outer1); 
	let outer2 = pickFrom[chooseRandInt(pickFrom.length)];
	let connector1 = patronymic[chooseRandInt(patronymic.length)];
	let loc = locative[chooseRandInt(locative.length)];
	return outer1 + connector1 + outer2 + loc;
};

function getFirst(name) {
	//slice string at first space
	return name.slice(0, name.indexOf(" "));
};

function writeRunes(name) {
	//use only first outer name
	let origin = getFirst(name);
	//lowercase
	let target = origin.toLowerCase();
	//check for exceptions
	if (target.includes("nd")) {
		target = target.replace("nd", "D")
	};
	if (target.includes("ng")) {
		target = target.replace("ng", "N")
	};
	if (target.includes("mb")) {
		target = target.replace("mb", "M")
	};
	if (target.includes("th")) {
		target = target.replace("th", "þ")
	};
	return target;
};

function display(name, runes) {
	document.getElementById("name").textContent = name;
	document.getElementById("runes").textContent = runes;
};

function generate() {
	let format = chooseRandInt(4);
	//integer designates function
	let name = "";
	switch(format) {
		case 0: 
			name = outerPatr();
			break;
		case 1: 
			name = outerPatrPatr();
			break;
		case 2: 
			name = outerLoc();
			break;
		case 3: 
			name = outerPatrLoc();
			break;
	};
	let runes = writeRunes(name);
	//display string
	display(name, runes);
};

