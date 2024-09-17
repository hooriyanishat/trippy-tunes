document.addEventListener("DOMContentLoaded", loadPlaylist);

let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let currentSongIndex = 0;
let audioElement = new Audio();
let isPlaying = false;

function loadPlaylist() {
  let playlistContainer = document.getElementById("playlistContainer");
  playlistContainer.innerHTML = "";

  playlist.forEach((song, index) => {
    let playlistItem = document.createElement("div");
    playlistItem.classList.add("playlistItem");
    playlistItem.innerHTML = `
      <span class="songName">${song.songName}</span>
      <span class="songlistplay">
        <i class="fa fa-minus remove-from-playlist mx-3" style="cursor: pointer;" data-index="${index}"></i>
        <i id="${index}" class="far songItemPlay fa-play-circle"></i>
      </span>
    `;
    playlistContainer.appendChild(playlistItem);
  });

  // Set up click event listeners for Remove from Playlist buttons
  document.querySelectorAll(".remove-from-playlist").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = parseInt(e.target.getAttribute("data-index"));
      removeFromPlaylist(index);
      Swal.fire({
        position: "center",
        icon: "success", 
        title: "Song removed from playlist!", 
        showConfirmButton: false,
        timer: 2000
      });
    });
  });

  // Set up click event listeners for Play buttons
  document.querySelectorAll(".songItemPlay").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = parseInt(e.target.id);
      playSong(index);
    });
  });
}

function removeFromPlaylist(index) {
  playlist.splice(index, 1); // Remove the song at the specified index
  localStorage.setItem("playlist", JSON.stringify(playlist));
  loadPlaylist(); // Reload the playlist to reflect the changes
}

function playSong(index) {
  if (index >= 0 && index < playlist.length) {
    currentSongIndex = index;
    audioElement.src = playlist[currentSongIndex].filePath;
    audioElement.play();
    isPlaying = true;

    let masterSongName = document.getElementById("masterSongName");
    masterSongName.innerText = playlist[currentSongIndex].songName;

    // Update UI elements as needed, e.g., play/pause button state
    let masterPlay = document.getElementById("masterPlay");
    let gif = document.getElementById("gif");

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;

    // Change all play buttons to play state
    document.querySelectorAll(".songItemPlay").forEach((button) => {
      button.classList.remove("fa-pause-circle");
      button.classList.add("fa-play-circle");
    });

    // Change the current play button to pause state
    document.getElementById(currentSongIndex).classList.remove("fa-play-circle");
    document.getElementById(currentSongIndex).classList.add("fa-pause-circle");
  }
}

function playNextSong() {
  if (currentSongIndex < playlist.length - 1) {
    playSong(currentSongIndex + 1);
  } else {
    playSong(0); // Loop back to the first song
  }
}

function playPrevSong() {
  if (currentSongIndex > 0) {
    playSong(currentSongIndex - 1);
  } else {
    playSong(playlist.length - 1); // Loop back to the last song
  }
}

document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPrevSong);

// Play/Pause functionality
document.getElementById('masterPlay').addEventListener('click', () => {
  if (isPlaying) {
    audioElement.pause();
    document.getElementById('masterPlay').classList.remove('fa-pause-circle');
    document.getElementById('masterPlay').classList.add('fa-play-circle');
    isPlaying = false;
  } else {
    audioElement.play();
    document.getElementById('masterPlay').classList.remove('fa-play-circle');
    document.getElementById('masterPlay').classList.add('fa-pause-circle');
    isPlaying = true;
  }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  document.getElementById('myProgressBar').value = progress;
});

// Seek functionality
document.getElementById('myProgressBar').addEventListener('input', (e) => {
  audioElement.currentTime = (e.target.value / 100) * audioElement.duration;
});

// Optional: Play the first song when the page loads

////log out///////
let logoutbtn = document.getElementById("logout");
// console.log(logoutbtn);

logoutbtn.addEventListener('click',()=>{
  localStorage.removeItem('loginuser');
  window.location.href = 'login.html';
})