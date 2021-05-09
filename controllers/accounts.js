"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  //index function to render index page
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },
  //logout function to render logout page
  logout(request, response) {
    response.cookie("AnimeList", "");
    response.redirect("/");
  },
  //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },
  //register function to render the registration page for adding a new user
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info("registering" + user.email);
    response.redirect("/");
  },
  //authenticate function to check user credentials of the email and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.getUserBypassword(request.body.password);
    if (user && password) {
      response.cookie("AnimeList", user.email, password.password);
      logger.info("logging in" + user.email, password.password);
      response.redirect("/start");
    } else {
      response.redirect("/login");
    }
  },

  //utility function getCurrentUser to check who is currently logged in through
  getCurrentUser(request) {
    const userEmail = request.cookies.AnimeList;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;
