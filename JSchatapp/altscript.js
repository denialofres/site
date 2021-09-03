const chatHistoryDivSize = document.getElementById("chatHistory").clientHeight;

async function getWeatherData() {
	const url = `https://api.openweathermap.org/data/2.5/weather?id=2640729&appid=34d757f45a43d487a2fca4fbe8b04b3f`
	let response = await fetch(url)
	let data = await response.json()
	console.log(data["weather"][0]["description"])
	return data["weather"][0]["description"]
};
function parseWeatherData(weather) {
	return weather["coord"];
};
function init() {
	var input = document.getElementById("textInput");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			onSend();
		};
	});
};

function getTime() {
	unixEpoch = new Date();
	h = ('0' + unixEpoch.getHours()).slice(-2); m = ('0' + unixEpoch.getMinutes()).slice(-2);
	return `${h}:${m}`
};

function updateScroll() {
	var element = document.getElementById("chatHistory");
	element.scrollTop = element.scrollHeight;
}

async function onSend() {
	let message = document.getElementById("textInput").value;
	document.getElementById("textInput").value = "";
	let prevContent = document.getElementById("chatHistory").innerHTML;
	message = `<br><i>${getTime()} User</i>: `.concat(message);
	let newChatHistory = prevContent.concat(message);
	document.getElementById("chatHistory").innerHTML = newChatHistory;
	botReply = await findBotReply(message)
	sendBotReply(botReply);
	updateScroll
};

async function findBotReply(message) {
	let botStart = `<br><i>${getTime()} Bot</i>: `, botReply;
	message = message.toLowerCase()
	if (message.includes("hello")) {
		botReply = "Hello! I'm an automated reply system "
	}
	else if (message.includes("my name is") || message.includes("i'm called")) {
		botReply = "My name is Jonathon"
	}
	else if (message.includes("calculation: ")) {
		var calculation = message.substr(36);
		botReply = eval(calculation);
	}
	else if (message.includes("weather")) {
		botReply = await getWeatherData()
		botReply = JSON.stringify(botReply).slice(1, -1)
	}
	else {
		botReply = "I'm a bot"
	}
	return botStart.concat(botReply);
};

function sendBotReply(botReply) {
	let prevContent = document.getElementById("chatHistory").innerHTML;
	let newChatHistory = prevContent.concat(botReply);
	document.getElementById("chatHistory").innerHTML = newChatHistory;
	updateScroll()
};

window.onload = init;
