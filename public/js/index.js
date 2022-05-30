var title = [
    "Ogres are like onions.",
    "I like that boulder. That is a nice boulder.",
    "Książka jest niczym ogród, który można włożyć do kieszeni",
    "Some of you may die, but it's a sacrifice I'm willing to make.",
    "Książka i możliwość czytania, to jeden z największych cudów ludzkiej cywilizacji.",
    "Czytanie dobrych książek jest niczym rozmowa z najwspanialszymi ludźmi minionych czasów",
    "Kiedy przeczytam nową książkę, to tak jakbym znalazł nowego przyjaciela, a gdy przeczytam książkę, którą już czytałem - to tak jakbym spotkał się ze starym przyjacielem.",
    "Shrek is love, Shrek is life.",
];

const textEl = document.getElementById("titleText");

const update = () => {
    const randomTitle = title[Math.floor(Math.random() * title.length)];
    textEl.style.opacity = 0;
    setTimeout(function () {
        document.getElementById("titleText").textContent = randomTitle;
        textEl.style.opacity = 1;
    }, 1000);
};

setInterval(update, 5000);
update();
