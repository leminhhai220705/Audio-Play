function MusicPlay() {
  // attr normal values
  this._songsList = [
    {
      id: 0,
      path: "./public/audio/Ascence - About You  Trap  NCS - Copyright Free Music.mp3",
      image_rep: "./src/img/aboutyou.jpg",
      song_name: "About You",
      author_name: "Ascence",
      album_name: "About You",
      music_time: "3:04",
    },

    {
      id: 1,
      path: "./public/audio/NEFFEX - Grateful [Copyright Free] No.54.mp3",
      image_rep: "./src/img/grateful.jpg",
      song_name: "Grateful",
      author_name: "NEFFEX",
      album_name: "Grateful",
      music_time: "3:02",
    },

    {
      id: 2,
      path: "./public/audio/In The End [Official HD Music Video] - Linkin Park.mp3",
      image_rep: "./src/img/intheend.jpg",
      song_name: "In the End",
      author_name: "Linkin Park",
      album_name: "Hybrid Theory",
      music_time: "3:38",
    },

    {
      id: 3,
      path: "./public/audio/Warriyo - Mortals (ft. Laura Brehm).mp3",
      image_rep: "./src/img/mortals.jpg",
      song_name: "Mortals",
      author_name: "Warriyo",
      album_name: "Mortals",
      music_time: "3:48",
    },

    {
      id: 4,
      path: "./public/audio/Fall Out Boy - Centuries (Lyrics).mp3",
      image_rep: "./src/img/centuries.jpg",
      song_name: "Centuries",
      author_name: "Fall Out Boy",
      album_name: "Believers Never Die",
      music_time: "3:46",
    },

    {
      id: 5,
      path: "./public/audio/Lost Sky - Fearless pt.II (feat. Chris Linton)  Trap  NCS - Copyright Free Music.mp3",
      image_rep: "./src/img/fearless.jpg",
      song_name: "Fearless",
      author_name: "Lost Sky",
      album_name: "Fearless",
      music_time: "3:14",
    },

    {
      id: 6,
      path: "./public/audio/Cartoon, Jéja - C U Again ft. Mikk Mäe (Cartoon, Jéja, Futuristik VIP)  NCS - Copyright Free Music.mp3",
      image_rep: "./src/img/seeyouagain.jpeg",
      song_name: "C U Again",
      author_name: "Mikk Mäe, Cartoon, Jéja, Futuristik",
      album_name: "NCS",
      music_time: "3:23",
    },

    {
      id: 7,
      path: "./public/audio/Egzod & Maestro Chives - Royalty (Lyrics) ft. Neoni.mp3",
      image_rep: "./src/img/royalty.png",
      song_name: "Royalty",
      author_name: "Egzod & Maestro Chives",
      album_name: "Royalty",
      music_time: "3:41",
    },

    {
      id: 8,
      path: "./public/audio/Eternxlkz - BRODYAGA FUNK (Official Audio).mp3",
      image_rep: "./src/img/brodyaga.jpeg",
      song_name: "BRODYAGA FUNK",
      author_name: "Eternxlkz",
      album_name: "BRODYAGA FUNK",
      music_time: "2:15",
    },

    {
      id: 9,
      path: "./public/audio/Unknown Brain x Rival - Control (ft. Jex) [Lyric Video].mp3",
      image_rep: "./src/img/control.jpeg",
      song_name: "Control",
      author_name: "Unknown Brain x Rival",
      album_name: "Control",
      music_time: "2:47",
    },

    {
      id: 10,
      path: "./public/audio/Thousand Foot Krutch_ Courtesy Call (Official Audio).mp3",
      image_rep: "./src/img/coutersycall.jpeg",
      song_name: "Courtesy Call",
      author_name: "Thousand Foot Krutch",
      album_name: "Courtesy Call",
      music_time: "3:56",
    },
  ];

  //   DOM Elements
  this._audio = document.querySelector("#audio");
  this._playBtn = document.querySelector("#play-btn");
  this._footerPlayBtn = document.querySelector("#footer-play");
  this._footerPrevBtn = document.querySelector("#footer-prev");
  this._footerNextBtn = document.querySelector("#footer-next");
  this._playCircleIcon = document.querySelector("#play-circle-icon");
  this._playIcon = document.querySelector("#play-icon");
  this._shuffleBtn = document.querySelector("#shuffle-btn");
  this._footerShuffleBtn = document.querySelector("#footer-shuffle-btn");
  this._songs = document.querySelector("#list-render");
  this._repeatBtn = document.querySelector("#repeat-btn");
  this._slideSeeking = document.querySelector("#slider");
  this._timeStart = document.querySelector("#time-start");
  this._timeEnd = document.querySelector("#time-end");
  this._volumeBar = document.querySelector("#volume-bar");
  this._musicAvatar = document.querySelector("#music-avatar");
  this._songName = document.querySelector("#music-name");
  this._authorName = document.querySelector("#author-name");

  //   attr metrics
  this._currentSongIndex = 0;
  this._isPlaying = false;
  this._isShuffle = false;
  this._isLoop = false;
  this.PREV_STEP = -1;
  this.NEXT_STEP = 1;
  this.RESET_TIME = 2;

  //   attr localStorage
  this.STORAGE_KEY = {
    LOOP_MODE: "loop_mode",
    SHUFFLE_MODE: "shuffle_mode",
  };

  //   methods
  this._loadByStorage = () => {
    this._isShuffle =
      localStorage.getItem(this.STORAGE_KEY.SHUFFLE_MODE) === "true";
    this._isLoop = localStorage.getItem(this.STORAGE_KEY.LOOP_MODE) === "true";
  };

  this._renderSong = () => {
    const listRender = document.querySelector("#list-render");
    listRender.innerHTML = "";

    this._songsList.forEach((song, index) => {
      // Create Structure
      const musicContainer = document.createElement("div");
      musicContainer.className =
        index === this._currentSongIndex ? "active" : "";
      musicContainer.classList.add("musics-table__child", "music-item");
      musicContainer.setAttribute("data-index", index);

      const musicIndex = document.createElement("div");
      musicIndex.className = "music-index";
      musicIndex.textContent = `${song.id + 1}`;

      const musicInfoWrapper = document.createElement("div");
      musicInfoWrapper.className = "music-name";

      const imgRep = document.createElement("img");
      imgRep.src = `${song.image_rep}`;
      imgRep.alt = `${song.song_name}`;

      const songAuthorName = document.createElement("div");
      songAuthorName.className = "song-author";

      const songName = document.createElement("p");
      songName.className = "song-name";
      songName.textContent = song.song_name;

      const authorName = document.createElement("p");
      authorName.className = "author-name";
      authorName.textContent = song.author_name;

      const albumWrapper = document.createElement("div");
      albumWrapper.className = "album-name";

      const albumName = document.createElement("a");
      albumName.href = "#!";
      albumName.textContent = song.album_name;

      const dateAddedWrapper = document.createElement("div");
      dateAddedWrapper.className = "music-date";

      const dateTime = document.createElement("time");
      dateTime.dateTime = "2025-06-29";
      dateTime.textContent = "29 Jun 2025";

      const musicDurationWrapper = document.createElement("div");
      musicDurationWrapper.className = "music-time";

      const duration = document.createElement("time");
      duration.dateTime = "";
      duration.textContent = song.music_time;

      //   Append

      songAuthorName.append(songName, authorName);

      musicInfoWrapper.append(imgRep, songAuthorName);

      albumWrapper.appendChild(albumName);

      dateAddedWrapper.appendChild(dateTime);

      musicDurationWrapper.appendChild(duration);

      musicContainer.append(
        musicIndex,
        musicInfoWrapper,
        albumWrapper,
        dateAddedWrapper,
        musicDurationWrapper,
      );

      listRender.appendChild(musicContainer);
    });
  };

  this.initialize = () => {
    this._loadByStorage();
    this._renderSong();
    this._setupCurrentSong();
    this._setVolume();
  };

  this._updateDuration = () => {
    const currentSong = this._getCurrentSong();
    const duration = currentSong.music_time;
    const padStartDura = duration[0];
    const padEndDura = duration[2] + duration[3];
    this._timeEnd.textContent = duration;
    this._timeEnd.dateTime = `PT${padStartDura}M${padEndDura}S`;
  };

  this._updateShuffleActive = () => {
    if (this._isShuffle) {
      this._shuffleBtn.classList.add("shuffle");
      this._footerShuffleBtn.classList.add("shuffle");
    } else {
      this._shuffleBtn.classList.remove("shuffle");
      this._footerShuffleBtn.classList.remove("shuffle");
    }
  };

  this._updateLoopActive = () => {
    if (this._isLoop) {
      this._repeatBtn.classList.add("repeat");
    } else {
      this._repeatBtn.classList.remove("repeat");
    }
  };

  this._updatePlayPauseIcon = () => {
    if (this._isPlaying) {
      this._playIcon.classList.replace("fa-play", "fa-pause");
      this._playCircleIcon.classList.replace(
        "fa-circle-play",
        "fa-circle-pause",
      );
    } else {
      this._playIcon.classList.replace("fa-pause", "fa-play");
      this._playCircleIcon.classList.replace(
        "fa-circle-pause",
        "fa-circle-play",
      );
    }
  };

  this._getCurrentSong = () => {
    return this._songsList[this._currentSongIndex];
  };

  this._setupCurrentSong = () => {
    const currentSong = this._getCurrentSong();
    this._audio.src = currentSong.path;
    this._updateShuffleActive();
    this._updateLoopActive();
    this._audio.loop = this._isLoop;
    this._updateDuration();
    this._renderSong();
    this._renderFooter();
  };

  this._togglePlayAudio = () => {
    this._isPlaying = !this._isPlaying;
  };

  this._playAudio = () => {
    this._audio.play();
  };

  this._pauseAudio = () => {
    this._audio.pause();
  };

  this._handlePlayPause = () => {
    this._togglePlayAudio();
    if (this._isPlaying) {
      this._playAudio();
    } else {
      this._pauseAudio();
    }
  };

  this._handleLoopSongs = (step) => {
    this._currentSongIndex += step;
    this._currentSongIndex =
      (this._currentSongIndex + this._songsList.length) %
      this._songsList.length;
  };

  this._renderFooter = () => {
    this._songsList.forEach((song) => {
      if (song.id === this._currentSongIndex) {
        this._musicAvatar.src = song.image_rep;
        this._songName.textContent = song.song_name;
        this._authorName.textContent = song.author_name;
      }
    });
  };

  this._handlePrevNext = (step) => {
    this._isPlaying = true;
    if (this._isShuffle) {
      this._currentSongIndex = this._handleRandom();
    } else {
      this._handleLoopSongs(step);
    }
    this._setupCurrentSong();

    if (this._isPlaying) {
      this._updatePlayPauseIcon();
      this._playAudio();
    }
  };

  this._handleRandom = () => {
    if (this._songsList.length === 1) return this._currentSongIndex;
    let newIndex = null;
    do {
      newIndex = Math.floor(Math.random() * this._songsList.length);
    } while (this._currentSongIndex === newIndex);

    return newIndex;
  };

  this._handleShuffle = () => {
    this._isShuffle = !this._isShuffle;
    this._updateShuffleActive();
    localStorage.setItem(this.STORAGE_KEY.SHUFFLE_MODE, this._isShuffle);
  };

  this._getNewTime = (percentage) => {
    return (percentage / 100) * this._audio.duration;
  };

  this._updateCurrentTime = (percentage) => {
    const newCurrentTime = this._getNewTime(percentage);
    this._updateCurrentTime(newCurrentTime);
  };

  this._handlePercentageBar = (progressBar) => {
    const min = progressBar.min;
    const max = progressBar.max;
    const value = progressBar.value;
    const percentage = ((value - min) / (max - min)) * 100;
    if (typeof percentage !== "number" && isNaN(percentage)) return;
    if (progressBar.seeking) {
      progressBar.style.background = `linear-gradient(90deg, #1ed760 0%, #1ed760 ${percentage}%, rgba(83, 83, 83, 1) ${percentage}%, rgba(83, 83, 83, 1) 100%)`;
    } else {
      progressBar.style.background = `linear-gradient(90deg, #fff 0%, #fff ${percentage}%, rgba(83, 83, 83, 1) ${percentage}%, rgba(83, 83, 83, 1) 100%)`;
    }

    return percentage;
  };

  this._setGradientAndTime = () => {
    this._slideSeeking.oninput = () => {
      this._handlePercentageBar(this._slideSeeking);
      this._updateCurrentTime(this._handlePercentageBar(this._slideSeeking));
    };
  };

  this._handleSeekingDown = () => {
    this._slideSeeking.seeking = true;
    this._setGradientAndTime();
  };

  this._handleSeekingUp = () => {
    this._isPlaying = true;
    const currentPercent = this._slideSeeking.value;
    const newCurrentTime = this._getNewTime(currentPercent);
    this._audio.currentTime = newCurrentTime;
    if (this._isPlaying && this._audio.currentTime > 0) {
      this._playAudio();
      this._updatePlayPauseIcon();
    }
    this._setGradientAndTime();
    this._slideSeeking.seeking = false;
  };

  this._updateCurrentTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const newDuration = `${minute}:${String(second).padStart(2, "0")}`;
    this._timeStart.textContent = newDuration;
  };

  this._setVolume = () => {
    const min = this._volumeBar.min;
    const max = this._volumeBar.max;
    const value = this._volumeBar.value;
    const percentage = ((value - min) / (max - min)) * 100;
    const volume = percentage / 100;
    this._audio.volume = volume;
    if (this._volumeBar.seeking) {
      this._volumeBar.style.background = `linear-gradient(90deg, #1ed760 0%, #1ed760 ${percentage}%, rgba(83, 83, 83, 1) ${percentage}%, rgba(83, 83, 83, 1) 100%)`;
    } else {
      this._volumeBar.style.background = `linear-gradient(90deg, #fff 0%, #fff ${percentage}%, rgba(83, 83, 83, 1) ${percentage}%, rgba(83, 83, 83, 1) 100%)`;
    }
  };

  this._handlePlayByEnter = (e) => {
    if (
      (e.key === " " && !this._isPlaying) ||
      (e.key !== " " && this._isPlaying)
    ) {
      this._isPlaying = true;
      this._playAudio();
      this._updatePlayPauseIcon();
    } else if (e.key === " " && this._isPlaying) {
      this._isPlaying = false;
      this._pauseAudio();
      this._updatePlayPauseIcon();
    }
  };

  //   DOM Events

  this._songs.onclick = (e) => {
    this._isPlaying = true;
    const songPanel = e.target.closest(".music-item");
    if (!songPanel) return;
    const songIndex = songPanel.dataset.index;
    if (isNaN(songIndex)) return;
    this._currentSongIndex = +songIndex;
    this._setupCurrentSong();
    this._updatePlayPauseIcon();

    this._audio.play();
  };

  this._playBtn.onclick = () => {
    this._handlePlayPause();
    this._updatePlayPauseIcon();
  };
  this._footerPlayBtn.onclick = () => {
    this._handlePlayPause();
    this._updatePlayPauseIcon();
  };

  document.addEventListener("keydown", this._handlePlayByEnter);
  this._footerPrevBtn.onclick = () => {
    if (this._audio.currentTime >= this.RESET_TIME) {
      this._audio.currentTime = 0;
      return;
    }
    this._handlePrevNext(this.PREV_STEP);
  };
  this._footerNextBtn.onclick = () => {
    this._handlePrevNext(this.NEXT_STEP);
  };

  this._audio.onended = () => {
    if (this._isLoop) return;
    this._handlePrevNext(this.NEXT_STEP);
  };

  this._shuffleBtn.onclick = () => {
    this._handleShuffle();
  };

  this._footerShuffleBtn.onclick = () => {
    this._handleShuffle();
  };

  this._repeatBtn.onclick = () => {
    this._isLoop = !this._isLoop;
    this._audio.loop = this._isLoop;
    this._updateLoopActive();
    localStorage.setItem(this.STORAGE_KEY.LOOP_MODE, this._isLoop);
  };

  this._slideSeeking.onmousedown = () => {
    this._handleSeekingDown();
  };

  this._slideSeeking.onmouseup = () => {
    this._handleSeekingUp();
  };

  this._audio.ontimeupdate = () => {
    if (this._slideSeeking.seeking) return;

    let currentPercent = (this._audio.currentTime / this._audio.duration) * 100;

    if (typeof currentPercent === "number" && isNaN(currentPercent)) {
      currentPercent = 0;
    }
    this._slideSeeking.value = currentPercent;

    this._slideSeeking.onmousedown = () => {
      this._handleSeekingDown();
    };

    this._slideSeeking.onmouseup = () => {
      this._handleSeekingUp();
    };

    this._updateCurrentTime(this._audio.currentTime);

    if (this._isHover) {
      this._slideSeeking.style.background = `linear-gradient(90deg, #1ed760 0%, #1ed760 ${currentPercent}%, rgba(83, 83, 83, 1) ${currentPercent}%, rgba(83, 83, 83, 1) 100%)`;
    } else {
      this._slideSeeking.style.background = `linear-gradient(90deg,  #fff 0%,  #fff ${currentPercent}%, rgba(83, 83, 83, 1) ${currentPercent}%, rgba(83, 83, 83, 1) 100%)`;
    }

    this._slideSeeking.onmouseenter = () => {
      this._isHover = true;
    };

    this._slideSeeking.onmouseleave = () => {
      this._isHover = false;
    };
  };

  this._volumeBar.onmouseenter = () => {
    this._volumeBar.seeking = true;
    this._setVolume();
  };

  this._volumeBar.onmouseleave = () => {
    this._volumeBar.seeking = false;
    this._setVolume();
  };

  this._volumeBar.oninput = () => {
    this._setVolume();
  };
}

const audio = new MusicPlay();
audio.initialize();
