document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("searchResults");
    const songList = []; // Example songs
  
  
    /* connection to artist.json */
    fetch("../js/json/artist.json")
      .then((r) => {
        return r.json();
      })
      /* fetching data from artist.json */
      .then((data) => {
        data.forEach((artist) => {
          artist.songs.forEach((songPath, index) => {
            songList.push({
              name: artist.songnames[index],
              artistId: artist.id
            });
          });
        });
      })
      .catch((error) => {
        console.error("The Data did not fetch from artist.json", error);
      });
  
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      searchResults.innerHTML = "";
  
  
      if (filter) {
        const filteredSongs = songList.filter((song) =>
          song.name.toLowerCase().includes(filter)
        );
  
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
      if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.style.display = "none";
      }
    });
  });