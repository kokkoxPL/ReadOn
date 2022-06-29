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
    var am = document.getElementById("am");
    am.style.fontSize = "20px";
    var pm = document.getElementById("pm");
    pm.style.fontSize = "20px";

    var hours = document.getElementById("hours");
    var h = new Date().getHours();
    hours.innerHTML = h + ":";

    var minutes = document.getElementById("minutes");
    var m = new Date().getMinutes();
    minutes.innerHTML = m;

    if (h > 12) {
        hours.innerHTML = h - 12 + ":";

        if (m < 10 || m == 0) {
            minutes.innerHTML = "0" + m;
        }

        var PM = (pm.style.display = "block");
    }
    else if (h <= 12) {
        hours.innerHTML = h + ":";
        if (h < 10 || h == 0) {
            hours.innerHTML = "0" + h + ":";
        }

        if (m < 10 || m == 0) {
            minutes.innerHTML = "0" + m;
        }
        var AM = (am.style.display = "block");
    }
};

setInterval(watch, 1000);
watch();
