
// index page js
let trendingArtists = document.getElementById("trend-artists");
let artistNames = fetch("../js/json/artist.json");
// console.log(artistNames)
artistNames
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    for (var i = 0; i < Math.min(data.length, 20); i++) {
      trendingArtists.innerHTML += ` <div class="col-lg-3 col-md-4 text-light " >
      <a class="artistbtn" onclick="viewSongs(${data[i].id})">
        <div class="trend-artists" data-aos="fade-up">
          <img src="${data[i].image}" class="image-fluid" alt="" >
          <h4 class="mt-2 trendingname">${data[i].name}</h4>
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
          playSong(index); // You need to define playSong function separately
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
    // artist by id
    let artist = data.find((artist) => artist.id === getQueryParams);

    if (artist) {
      // Set artist information
      document.getElementById("heading").innerText = artist.heading;
      document.getElementById("artistTitle").innerText = artist.name;
      document.getElementById("artistImg").src = artist.image;

      // songs array with objects containing songName and filePath
      let songs = artist.songs.map((song, index) => ({
        songName: artist.songnames[index], //  songnames display
        filePath: `../songs/${artist.name.toLowerCase()}/${song}`, 
      }));

      // Setup initial song list
      setupSongList(songs);

      // Function  initial song list
      function setupSongList(songs) {
        let songItemsContainer = document.getElementById("songItemContainer");
        songItemsContainer.innerHTML = ""; // Clear existing content

        songs.forEach((song, index) => {
          let songItem = document.createElement("div");
          songItem.classList.add("songItem");
          songItem.innerHTML = `
            <span class="songName">${song.songName}</span>
                          <span class="songlistplay">
                          <i id="${index}" class="far fa fa-plus add-to-playlist mx-3" data-index="${index}"></i>
                          <i id="${index}" class="far songItemPlay fa-play-circle"></i>
              </span>
          `;
          songItemsContainer.appendChild(songItem);
        });

        // Set up click event listeners for song play buttons
        document.querySelectorAll(".songItemPlay").forEach((playButton) => {
          playButton.addEventListener("click", (e) => {
            let index = parseInt(e.target.id);
            playSong(index);
          });
        });

        // Set up click event listeners for Add to Playlist buttons
        document.querySelectorAll(".add-to-playlist").forEach((button) => {
          button.addEventListener("click", (e) => {
            let index = parseInt(e.target.getAttribute("data-index"));
            addToPlaylist(index);
          });
        });
      }

      function addToPlaylist(index) {
        let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
        let song = songs[index]; // Use the songs array defined earlier

        if (!playlist.some((item) => item.songName === song.songName)) {
          playlist.push(song);
          localStorage.setItem("playlist", JSON.stringify(playlist));
          Swal.fire({
            position: "center",
            icon: "success", 
            title: "Song added to playlist!", 
            showConfirmButton: false,
            timer: 2000
          });        } else {
            Swal.fire({
              position: "center",
              icon: "error", 
              title: "song already exist in playlist", 
              showConfirmButton: false,
              timer: 2000
            });            }
      }

      // function removeFromPlaylist(index) {
      //   let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
      //   let songName = songs[index].songName; // Use the songs array defined earlier

      //   playlist = playlist.filter(song => song.songName !== songName);
      //   localStorage.setItem("playlist", JSON.stringify(playlist));
      //   alert("Song removed from playlist!");
      // }

      // Initialize the Audio Element and Variables
      let audioElement = new Audio();
      let player = document.getElementById("player");
      let masterPlay = document.getElementById("masterPlay");
      let myProgressBar = document.getElementById("myProgressBar");
      let gif = document.getElementById("gif");
      let masterSongName = document.getElementById("masterSongName");
      let songIndex = 0;
      let iconss = document.getElementById("iconplayer");

      // Function to play songs by index
      function playSong(index) {
        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[index].songName;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        player.style.opacity = 1;
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
    
        if (songIndex !== null) {
            const currentSongIcon = document.querySelector(`.songItemPlay[id="${songIndex}"]`);
            if (currentSongIcon) {
                currentSongIcon.classList.remove("fa-play-circle");
                currentSongIcon.classList.add("fa-pause-circle");
            }
        }
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
  
let genre = document.getElementById("genre");
// console.log(genre)
let genreArtist = fetch("../js/json/artist.json");
// console.log(artistNames)
genreArtist
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    for (var i = 20; i < Math.min(data.length, 26); i++) {
      genre.innerHTML += `<div class="col-lg-2 col-md-4 text-light">
      <a class="artistbtn" onclick="viewSongs(${data[i].id})">
        <div class="trend-artists genrecol">
          <img src="${data[i].image}" class="image-fluid" alt="" >
          <h4 class="mt-2 trendingname">${data[i].name}</h4>
        </div>
      </a>
    </div>
    `;
    }
  });
function viewSongs(e) {
  window.location.href = `./artist.html?id=${e}`;
}

// /sign up local storage
let firstName = document.getElementById("FirstName");
let lastname = document.getElementById("LastName");
let signUpEmail = document.getElementById("SignUpEmail");
let signUpPassword = document.getElementById("SignUpPassword");
let signUpBtn = document.getElementById("formSubmit");

signUpBtn.addEventListener("submit", function (event) {
  event.preventDefault();
  let userValues = {
    firstName: firstName.value,
    lastname: lastname.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };

  let allUsers = localStorage.getItem("userDetails");
  if (allUsers) {
    let parsedData = JSON.parse(allUsers);
    let isEmailExist = parsedData.find((a) => a.email === userValues.email);

    if (isEmailExist) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "User already exist!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      parsedData.push(userValues);
      localStorage.setItem("userDetails", JSON.stringify(parsedData));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been registered!",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
            title: 'custom-title'}
      }).then(() => {
        location.href="../html/login.html"
      });
    }
  } else {
    localStorage.setItem("userDetails", JSON.stringify([userValues]));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "User has been registered!",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      console.log("HELLI");
    });
  }
});
/* For Search bar js */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("searchResults");
  const songList = []; // Example songs

  console.log("DOM fully loaded and parsed");

  /* connection to artist.json */
  fetch("../js/json/artist.json")
    .then((r) => {
      console.log("Fetched artist data", r);
      return r.json();
    })
    /* fetching data from artist.json */
    .then((data) => {
      console.log("Parsed artist data", data);
      data.forEach((artist) => {
        artist.songs.forEach((songPath, index) => {
          songList.push({
            name: artist.songnames[index],
            artistId: artist.id,
          });
        });
      });
      console.log("Compiled song list", songList);
    })
    .catch((error) => {
      console.error("The Data did not fetch from artist.json", error);
    });

  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    console.log("User is typing:", filter);

    if (filter) {
      const filteredSongs = songList.filter((song) =>
        song.name.toLowerCase().includes(filter)
      );
      console.log("Filtered songs", filteredSongs);

      if (filteredSongs.length > 0) {
        searchResults.style.display = "block";
        filteredSongs.forEach((song) => {
          const li = document.createElement("li");
          li.textContent = song.name;
          li.addEventListener("click", () => {
            window.location.href = `./artist.html?id=${song.artistId}`;
          });
          searchResults.appendChild(li);
        });
      } else {
        searchResults.style.display = "block";
        const li = document.createElement("li");
        li.textContent = "Not found";
        searchResults.appendChild(li);
      }
    } else {
      searchResults.style.display = "none";
    }
  });

  // Hide the search results when clicking outside of it
  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !searchResults.contains(event.target)
    ) {
      searchResults.style.display = "none";
    }
  });
});
