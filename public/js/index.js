var title = [
    '"Czytanie dobrych książek jest niczym rozmowa z najwspanialszymi ludźmi minionych czasów"',
    '"Ludzie mówią, że życie to jest to, ale ja wolę sobie poczytać"',
    '"Książka jest niczym ogród, który można włożyć do kieszeni"',
    '"Książka i możliwość czytania, to jeden z największych cudów ludzkiej cywilizacji."',
];

//jak ktos to zmieni zajebie

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

const watch = () => {
    var hours = document.getElementById('hours');
    var h = new Date().getHours();
    hours.innerHTML = h + ":";


    var minutes = document.getElementById('minutes');
    var m = new Date().getMinutes();
    minutes.innerHTML = m + ":";


    var seconds = document.getElementById('seconds');
    var s = new Date().getSeconds();

    if (s < 10) {
        seconds.innerHTML = "0" + s;
    }
    else {
        seconds.innerHTML = s;
    }
}

setInterval(watch, 1000);
watch();