import {birdsData} from "./birds.js";

//player

let playpause_btn = document.querySelector('.play-icon');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let curr_track = document.createElement('audio');

let header = document.querySelector('.header');
let randomBirdCard = document.querySelector('.random_bird');
let rowBirds = document.querySelector('.rowBirds');
let endOfGame = document.querySelector('.end')
let countOfGame = document.querySelectorAll('.bird_item')
let spicies = document.querySelectorAll('.bird_link');
let variants = document.querySelectorAll('.list-group-item')
let buttons = document.querySelectorAll('.li-btn')
let instr = document.querySelector('.instructions');
let view = document.querySelector('.card-body')
let listOfInfo = document.querySelectorAll('.list-group-itemm')
let birdDescr = document.querySelector('.bird-description');
let birdImage = document.querySelectorAll('.bird-image');
let btnNext = document.querySelector('.btn');
let nameOfBird = document.querySelector('.nameOfBird');
let scoree = document.querySelector('.score');
let winWords = document.querySelector('.win_words');


let winSound = new Audio("/assets/sound/win.mp3");
let errorSound = new Audio("/assets/sound/error.mp3");
errorSound.volume = 0.1;


let track_index;
let isPlaying = false;
let updateTimer;
let duration = 0;
let countOfGames = 0;
let score = 0;


function start(){
    track_index = random();
    loadInfo(track_index, countOfGames);
    score = 0;
    console.log(track_index);
}
function newGame(){
    if(countOfGames !== 6)
    {   track_index = random();
        loadInfo(track_index, countOfGames);
        countOfGame[countOfGames].classList.add('active')
        countOfGame[countOfGames-1].classList.remove('active')
        instr.style.display = "block";
        view.style.display = "none";
        birdDescr.textContent = '';
        nameOfBird.textContent = '*****';
        birdImage[0].setAttribute("src","/assets/bird.jpg");
        variants.forEach(element=> element.classList.remove('win'))
        variants.forEach(element=> element.classList.remove('error'))

    }
    else{
        header.style.display = 'none';
        randomBirdCard.style.display = 'none';
        rowBirds.style.display = 'none';
        endOfGame.style.display = 'block';
        winWords.textContent = `Вы прошли игру! Ваш результат: ${score}`;
    }
}

function random(){
 return Math.floor(Math.random()*6);
}




function loadInfo(track_index, countOfGames){
    clearInterval(updateTimer);
    reset();

    curr_track.src = birdsData[countOfGames][track_index].audio;
    curr_track.load();

    updateTimer = setInterval(setUpdate, 1000);

        spicies[0].innerHTML = 'Разминка';
        spicies[1].innerHTML = 'Воробьиные';
        spicies[2].innerHTML = 'Лесные птицы';
        spicies[3].innerHTML = 'Певчие птицы';
        spicies[4].innerHTML = 'Хищные птицы';
        spicies[5].innerHTML = 'Морские птицы';
for(let i = 0; i< 6; i++)
{
    variants[i].innerHTML = '<span class="li-btn"></span>' + birdsData[countOfGames][i].name;
}
}

 variants.forEach((element, index)=> element.addEventListener('click', ()=>{
    instr.style.display = "none";
    view.style.display = "block";
if(variants[index].textContent === birdsData[countOfGames][track_index].name){
    nameOfBird.textContent = birdsData[countOfGames][track_index].name;
    variants[index].classList.add('win')
    pauseTrack();
    winSound.play();
    listOfInfo[0].textContent = birdsData[countOfGames][track_index].name;
    listOfInfo[1].textContent = birdsData[countOfGames][track_index].species;
    birdDescr.textContent = birdsData[countOfGames][track_index].description;
    birdImage.forEach(element=>element.setAttribute("src",`${birdsData[countOfGames][track_index].image}`))
    btnNext.style.backgroundColor = 'green'
    score += 5;
    scoree.textContent = `Score: ${score}`;
}
else{
    variants[index].classList.add('error')
    errorSound.play()
    listOfInfo[0].textContent = birdsData[countOfGames][index].name;
    listOfInfo[1].textContent = birdsData[countOfGames][index].species;
    birdDescr.textContent = birdsData[countOfGames][index].description;
    birdImage[1].setAttribute("src",`${birdsData[countOfGames][index].image}`);
    score--;
}
 }))

 btnNext.addEventListener('click', ()=>{
    if(btnNext.style.backgroundColor === 'green'){
        countOfGames++;
        btnNext.style.backgroundColor = '#303030';
        newGame();
    }
 })








 playpause_btn.addEventListener('click', ()=>{    
    if(isPlaying === false){
     playTrack();
     total_duration.textContent = `00:${Math.floor(curr_track.duration)}`;
    }
    else{
     pauseTrack();
    }
 })
 
 seek_slider.addEventListener('click', ()=>{
     seekTo();
 })
 
 volume_slider.addEventListener('click', ()=>{
     setVolume();
 })




function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.classList.add('pause');
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.classList.remove('pause');
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
    }
}


start();