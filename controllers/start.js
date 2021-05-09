"use strict";

// import all required modules
const logger = require("../utils/logger");
const AnimeListStore = require("../models/AnimeList-store.js");
const userStore = require("../models/user-store.js");
const accounts = require("./accounts.js");

// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");

    if (loggedInUser) {
      const AnimeLists = AnimeListStore.getAllAnimeLists();
      const users = userStore.getAllUsers();
      let numAnimeLists = AnimeLists.length;
      let numAnimes = 0;
      for (let i in AnimeLists) {
        numAnimes = numAnimes + AnimeLists[i].Animes.length;
      }

      
      //most in users AnimeLists collection
      const userAnimeListStore = AnimeListStore.getUserAnimeLists(loggedInUser.id);
      let mostAnimeLists = userAnimeListStore[0];
      for (let Anime of userAnimeListStore) {
        if (Anime.Animes.length > mostAnimeLists.Animes.length) {
          mostAnimeLists = Anime;
        }
      }
      
      //least in users AnimeLists collection
      let leastAnimeLists = userAnimeListStore[0];
      for (let Anime of userAnimeListStore) {
        if (Anime.Animes.length < leastAnimeLists.Animes.length) {
          leastAnimeLists = Anime;
        }
      }
      
      //Average in users AnimeLists collection
      let userNumAnimeLists = AnimeListStore.getUserAnimeLists(loggedInUser.id).length;
      let userNumAnimes = 0;
      for (let Anime of AnimeListStore.getUserAnimeLists(loggedInUser.id)) {
        userNumAnimes += Anime.Animes.length;
      }
      let userAvgAnimes = (userNumAnimes/userNumAnimeLists).toFixed(0);
      
      //Average in every AnimeLists collection
      let avgAnimes = (numAnimes/numAnimeLists).toFixed(0);
      let numUsers = users.length;
      let avgAnimelist = (numAnimeLists/numUsers).toFixed(0);
      
      //User with the most Animes
      let usersWithMost = users[0];
      for (let Animes of users) { 
        if (AnimeListStore.getUserAnimeLists(Animes.id).length > AnimeListStore.getUserAnimeLists(usersWithMost.id).length) {
          usersWithMost = Animes;
        }
      }
      
      //User with the least Animes
      let usersWithLeast = users[0];
      for (let Animes of users) { 
        if (AnimeListStore.getUserAnimeLists(Animes.id).length < AnimeListStore.getUserAnimeLists(usersWithLeast.id).length) {
          usersWithLeast = Animes;
        }
      }

      const viewData = {
        title: "Welcome to the AnimeList App!",
        totalAnimeLists: numAnimeLists,
        totalAnimes: numAnimes,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        mostinAnimeLists: mostAnimeLists.title,
        leastinAnimeLists: leastAnimeLists.title,
        AvgAnimes: userAvgAnimes,
        userTotalAnimes: userNumAnimes,
        userTotalAnimeLists: userNumAnimeLists,
        averageAnimes: avgAnimelist,
        largestUser: usersWithMost.firstName + " " + usersWithMost.lastName,
        smallestUser: usersWithLeast.firstName + " " + usersWithLeast.lastName,
      };

      response.render("start", viewData);
    } else response.redirect("/");
  }
};

// export the start module
module.exports = start;
