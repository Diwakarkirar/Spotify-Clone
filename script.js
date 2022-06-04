let audioElement = new Audio("song1.mp3");
let progressbar = document.querySelector(".progressbar");
let masterPlaybtn = document.querySelector(".masterPlaybtn");
let index = 0;
let numberOfSongs = document.querySelectorAll(".playbtn").length;
let songName = document.querySelector(".bottom-container .songname h4");

//MasterPlay Button Click
masterPlaybtn.addEventListener('click', () => {

    if (masterPlaybtn.innerHTML.includes("play_circle")) {
        masterPlaybtn.innerHTML = "pause_circle";
        audioElement.play();
        if (index == 0) index = 1;
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";

    } else {
        masterPlaybtn.innerHTML = "play_circle";
        audioElement.pause();
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "play_circle";
    }

});

//On Clicking PlayButton of Songs
Array.from(document.getElementsByClassName("playbtn")).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (e.target.innerHTML.includes("play_circle")) {
            e.target.innerHTML = "pause_circle";


            if (e.target.id != index) audioElement.src = "song" + e.target.id + ".mp3";
            index = parseInt(e.target.id);
            for (var i = 0; i < numberOfSongs; i++) {
                if (index - 1 !== i) document.getElementsByClassName("playbtn")[i].innerHTML = "play_circle";
            }
            someBasicUpdates();
        } else {
            e.target.innerHTML = "play_circle";
            audioElement.pause();
            masterPlaybtn.innerHTML = "play_circle";
        }
    })
})

//Changing ProgressBar With Audio
progressbar.addEventListener('change', () => {
    audioElement.currentTime = progressbar.value * audioElement.duration / 100;
})

//Changing AudioCurrent Time On Updating Progress Bar
audioElement.addEventListener("timeupdate", () => {
    progressbar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (progressbar.value == 100) {

        if (index < numberOfSongs) {
            index++;
            audioElement.src = "song" + index + ".mp3";
            document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
            document.getElementsByClassName("playbtn")[index - 2].innerHTML = "play_circle";

        } else {
            audioElement.src = "song" + 1 + ".mp3";
            index = 1;
            document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
            document.getElementsByClassName("playbtn")[numberOfSongs - 1].innerHTML = "play_circle";
        }
        someBasicUpdates();
    }
    songTimings();
})

//On Clicking Next Button 
document.querySelector(".nextbtn").addEventListener("click", () => {
    if (index < numberOfSongs) {
        index++;
        audioElement.src = "song" + index + ".mp3";
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
        document.getElementsByClassName("playbtn")[index - 2].innerHTML = "play_circle";

    } else {
        audioElement.src = "song" + 1 + ".mp3";
        index = 1;
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
        document.getElementsByClassName("playbtn")[numberOfSongs - 1].innerHTML = "play_circle";
    }
    someBasicUpdates();
})
//On Clicking Previous Button
document.querySelector(".prevbtn").addEventListener("click", () => {
    if (index <= 1) {
        index = 10;
        audioElement.src = "song" + index + ".mp3";
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
        document.getElementsByClassName("playbtn")[0].innerHTML = "play_circle";

    } else {
        index--;
        audioElement.src = "song" + index + ".mp3";
        document.getElementsByClassName("playbtn")[index - 1].innerHTML = "pause_circle";
        document.getElementsByClassName("playbtn")[index].innerHTML = "play_circle";
    }
    someBasicUpdates();
})

function songTimings() {
    //Updating Current Time of the Playing Song
    let csec = Math.floor(audioElement.currentTime % 60);
    let cmin = Math.floor(audioElement.currentTime / 60);
    if (csec < 10) {
        document.querySelector(".currentTime p").innerHTML = "0" + cmin + ":" + "0" + csec;
    } else {
        document.querySelector(".currentTime p").innerHTML = "0" + cmin + ":" + csec;
    }
    //Updating Duration of the Playing Song
    let dsec = Math.floor(audioElement.duration % 60);
    let dmin = Math.floor(audioElement.duration / 60);
    if (dsec < 10) {
        document.querySelector(".songDuration p").innerHTML = "0" + dmin + ":" + "0" + dsec;
    } else {
        document.querySelector(".songDuration p").innerHTML = "0" + dmin + ":" + dsec;
    }
}

function someBasicUpdates() {
    songName.innerHTML = document.getElementsByTagName("p")[index - 1].innerHTML;
    masterPlaybtn.innerHTML = "pause_circle";
    audioElement.play();
}
