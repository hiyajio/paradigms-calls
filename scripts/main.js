console.log("page load - entered main.js for js-other api");

var submitButton = document.getElementById("bsr-submit-button");
var clearButton = document.getElementById("bsr-clear-button");
submitButton.onmouseup = getFormInfo;
clearButton.onmouseup = clearFormInfo;

function getFormInfo() {
	console.log("entered getFormInfo!");
	// call displayinfo
	var name = document.getElementById("name-text").value;
	console.log("Number you entered is " + name);
	makeNetworkCallToAgeApi(name);
} // end of get form info

function makeNetworkCallToAgeApi(name) {
	console.log("entered make nw call" + name);
	// set up url
	var xhr = new XMLHttpRequest(); // 1 - creating request object
	var url = "https://api.agify.io/?name=" + name;
	xhr.open("GET", url, true); // 2 - associates request attributes with xhr

	// set up onload
	xhr.onload = function (e) {
		// triggered when response is received
		// must be written before send
		console.log(xhr.responseText);
		// do something
		updateAgeWithResponse(name, xhr.responseText);
	};

	// set up onerror
	xhr.onerror = function (e) {
		// triggered when error response is received and must be before send
		console.error(xhr.statusText);
	};

	// actually make the network call
	xhr.send(null); // last step - this actually makes the request
} // end of make nw call

function updateAgeWithResponse(name, response_text) {
	console.log("entered updateAgeWithResponse!");

	var response_json = JSON.parse(response_text);
	// update a label
	var label1 = document.getElementById("response-line1");

	if (response_json["age"] == null) {
		label1.innerHTML = "Apologies, we could not find your name.";
		resetLabels(1);
	} else {
		var age = parseInt(response_json["age"]);
		makeNetworkCallToPokeAPI(name, age);
		resetLabels(2);
	}
} // end of updateAgeWithResponse

function makeNetworkCallToPokeAPI(name, age) {
	console.log("entered make nw call" + age);
	// set up url
	var xhr = new XMLHttpRequest(); // 1 - creating request object
	var url = "https://pokeapi.co/api/v2/pokemon/" + age;
	xhr.open("GET", url, true); // 2 - associates request attributes with xhr

	// set up onload
	xhr.onload = function (e) {
		// triggered when response is received
		// must be written before send
		console.log(xhr.responseText);
		// do something
		updatePokemonWithResponse(name, age, xhr.responseText);
	};

	// set up onerror
	xhr.onerror = function (e) {
		// triggered when error response is received and must be before send
		console.error(xhr.statusText);
	};

	// actually make the network call
	xhr.send(null); // last step - this actually makes the request
} // end of make nw call

function updatePokemonWithResponse(name, age, response_text) {
	console.log("entered updatePokemonWithResponse!");

	var response_json = JSON.parse(response_text);
	// update a label
	var label2 = document.getElementById("response-line2");
	var img1 = document.getElementById("pokemon-img");

	label2.innerHTML =
		name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()) +
		", you are a " +
		response_json["name"].replace(/\b\w/g, (l) => l.toUpperCase());

	img1.src = "https://pokeres.bastionbot.org/images/pokemon/" + age + ".png";
} // end of updateTriviaWithResponse

function resetLabels(number) {
	console.log("entered resetLabels!");

	if (number == 2) {
		var resetLabel = document.getElementById("response-line1");
		resetLabel.innerHTML = "";
	} else {
		var resetLabel = document.getElementById("response-line2");
		resetLabel.innerHTML = "";
		var img1 = document.getElementById("pokemon-img");
		img1.src = "https://pokeres.bastionbot.org/images/pokemon/1.png";
	}
}

function clearFormInfo() {
	console.log("entered clearFormInfo!");

	var resetLabel1 = document.getElementById("response-line1");
	resetLabel1.innerHTML = "";

	var resetLabel2 = document.getElementById("response-line2");
	resetLabel2.innerHTML = "";

	var img1 = document.getElementById("pokemon-img");
	img1.src = "https://pokeres.bastionbot.org/images/pokemon/1.png";
}
