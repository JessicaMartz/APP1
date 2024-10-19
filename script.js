let currentSong = null;
let audio = new Audio();
let rentalTime = 0; // Tiempo de alquiler en segundos
let rentalInterval = null;

function selectSong(songId, songTitle, songUrl) {
  // Pausar cualquier canción en reproducción
  if (audio.src !== "") {
    audio.pause();
    clearInterval(rentalInterval);
  }

  // Establecer los detalles de la canción seleccionada
  currentSong = { songId, songTitle, songUrl };
  document.getElementById("songTitle").innerText = songTitle;
  document.getElementById("timeLeft").innerText = "Tiempo restante: 00:00";
}

function playSong() {
  if (currentSong === null) {
    alert("Por favor, selecciona una canción primero.");
    return;
  }

  audio.src = currentSong.songUrl;
  audio.play();
  
  // Establecemos el tiempo de alquiler (ejemplo: 5 minutos)
  rentalTime = 5 * 60; // 5 minutos en segundos
  
  // Actualizar el estado del botón y la canción
  document.getElementById("playButton").disabled = true;
  document.getElementById("stopButton").disabled = false;
  
  // Iniciar la cuenta atrás
  rentalInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  if (rentalTime > 0) {
    rentalTime--;
    let minutes = Math.floor(rentalTime / 60);
    let seconds = rentalTime % 60;
    document.getElementById("timeLeft").innerText = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  } else {
    clearInterval(rentalInterval);
    document.getElementById("timeLeft").innerText = "El tiempo de alquiler ha expirado.";
    stopSong();
  }
}

function stopSong() {
  if (audio.src !== "") {
    audio.pause();
    clearInterval(rentalInterval);
  }

  document.getElementById("playButton").disabled = false;
  document.getElementById("stopButton").disabled = true;
  document.getElementById("timeLeft").innerText = "Tiempo restante: 00:00";
}
