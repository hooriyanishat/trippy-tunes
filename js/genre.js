//  genres js 
let genre = document.getElementById("genre")
// console.log(genre)
let genreArtist = fetch("../js/json/artist.json");
// console.log(artistNames)
genreArtist
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    for (var i = 20; i < Math.min(data.length, 25); i++) {
      genre.innerHTML += `<div class="col-lg-3 col-md-4 text-light">
      <a class="artistbtn" onclick="viewSongs(${data[i].id})">
        <div class="trend-artists genrecol">
          <img src="${data[i].image}" class="image-fluid" alt="" >
          <h4 class="mt-2">${data[i].name}</h4>
        </div>
      </a>
    </div>
    `;
    }
  });
function viewSongs(e) {
  window.location.href = `./artist.html?id=${e}`;
}

let url = new URLSearchParams(location.search);
let getQueryParams = parseInt(url.get("id"));
let artistData = fetch("../js/json/artist.json");

artistData
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Find the artist by id
    let artist = data.find((artist) => artist.id === getQueryParams);

    if (artist) {
      // Set artist information
      document.getElementById("heading").innerText = artist.heading;
      document.getElementById("artistTitle").innerText = artist.name;
      document.getElementById("artistImg").src = artist.image;

      // Populate songs
      let songItemContainer = document.getElementById("songItemContainer");
      artist.songs.forEach((song, index) => {
        // Create a new div for each song
        let songItem = document.createElement("div");
        songItem.classList.add("songItem");

        // Construct the inner HTML for each song
        songItem.innerHTML = `
                <span class="songName">${artist.songnames[index]}</span>
                <span class="songlistplay"> <i id="${index}" class="far songItemPlay fa-play-circle"></i> </span>
            `;

        // Append the song item to the container
        songItemContainer.appendChild(songItem);
      });

      // Set up click event listeners for song play buttons
      document.querySelectorAll(".songItemPlay").forEach((playButton) => {
        playButton.addEventListener("click", (e) => {
          let index = parseInt(e.target.id);
          playSong(index); 
        });
      });
    }
  });

let Url = new URLSearchParams(location.search);
let GetQueryParams = parseInt(url.get("id")); // Parse id from URL params
let artistSongs = fetch("../js/json/artist.json");

artistSongs
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Find the artist by id
    let artist = data.find((artist) => artist.id === getQueryParams);

    if (artist) {
      // Set artist information
      document.getElementById("heading").innerText = artist.heading;
      document.getElementById("artistTitle").innerText = artist.name;
      document.getElementById("artistImg").src = artist.image;

      // songs array with objects containing songName and filePath
      let songs = artist.songs.map((song, index) => ({
        songName: artist.songnames[index], //  songnames display
        filePath: `../songs/${artist.name.toLowerCase()}/${song}`, // Adjust path as needed
      }));

      // Setup initial song list
      setupSongList(songs);

      // Function to setup initial song list
      function setupSongList(songs) {
        let songItemsContainer = document.getElementById("songItemContainer");
        songItemsContainer.innerHTML = ""; // Clear existing content

        songs.forEach((song, index) => {
          let songItem = document.createElement("div");
          songItem.classList.add("songItem");
          songItem.innerHTML = `
                    <span class="songName">${song.songName}</span>
                    <span class="songlistplay"> <i id="${index}" class="far songItemPlay fa-play-circle"></i> </span>
                `;
          songItemsContainer.appendChild(songItem);
        });

        // Set up click event listeners for song play buttons
        document
          .querySelectorAll(".songItemPlay")
          .forEach((playButton, index) => {
            playButton.addEventListener("click", () => {
              playSong(index);
            });
          });
      }

      // Initialize the Audio Element and Variables
      let audioElement = new Audio();
      let masterPlay = document.getElementById("masterPlay");
      let myProgressBar = document.getElementById("myProgressBar");
      let gif = document.getElementById("gif");
      let masterSongName = document.getElementById("masterSongName");
      let songIndex = 0;

      // Function to play songs by index
      function playSong(index) {
        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[index].songName;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        songIndex = index;
        makeAllPlays();
      }

      // Function to reset all play icons
      function makeAllPlays() {
        document.querySelectorAll(".songItemPlay").forEach((element) => {
          element.classList.remove("fa-pause-circle");
          element.classList.add("fa-play-circle");
        });
        document.getElementById(songIndex).classList.remove("fa-play-circle");
        document.getElementById(songIndex).classList.add("fa-pause-circle");
      }

      // Handle play/pause click
      masterPlay.addEventListener("click", () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
          audioElement.play();
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          gif.style.opacity = 1;
        } else {
          audioElement.pause();
          masterPlay.classList.remove("fa-pause-circle");
          masterPlay.classList.add("fa-play-circle");
          gif.style.opacity = 0;
        }
      });

      // Listen to timeupdate event to update progress bar
      audioElement.addEventListener("timeupdate", () => {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
      });

      // Update song position based on progress bar
      myProgressBar.addEventListener("input", () => {
        audioElement.currentTime =
          (myProgressBar.value * audioElement.duration) / 100;
      });

      // Handle next song click
      document.getElementById("next").addEventListener("click", () => {
        songIndex = (songIndex + 1) % songs.length;
        playSong(songIndex);
      });

      // Handle previous song click
      document.getElementById("previous").addEventListener("click", () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        playSong(songIndex);
      });
    }
  });