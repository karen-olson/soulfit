# SoulFit

SoulFit is a video library for fitness and mindfulness videos. The frontend was built with React and MUI, and the backend is a REST API built with Ruby on Rails and seeded using YouTube API.

## Video Walkthrough

Check out the [video walkthrough](https://www.loom.com/share/9adb4cd688c54d5497689071e8b25756) of this project to see its features in action.

## Packages

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Configuration was achieved using a React/Rails API template from Flatiron School.

[MUI](https://mui.com/) was used for styling.

## Installation Guide

Fork and clone this repository. Once it has been cloned onto your local machine, open the project and run `bundle install` in the root directory to install all Ruby packages. Because there is a React app nested inside of the Rails app, run `cd client` and `npm install` to install the packages for the React app. Then, run `cd ..` to return to the project's root directory.

To start the development server, run the following commands.

In one terminal window, run `rails s` to start the Rails API server.
In a separate terminal window, run `npm start --prefix client` to start the React app.

Go to (http://localhost:4000/) to see the frontend view. Use a service like Postman to view and test the API endpoints (ex. GET (http://localhost:3000/videos)), or test the GET routes in the browser. Currently, the permissions are set so that you won't be authorized to access the endpoints unless you're logged in to the app. You can temporarily disable authorization by going to soulfit/app/controllers/concerns/application_controller.rb and commenting out line 7 (`before_action authorize`). Remember to reset authorization when you're done making changes to the backend!

## Sources

Credit for the renameObjectKeys function to [30 Seconds of Code](https://www.30secondsofcode.org/js/s/rename-keys) and [Banjo Code](https://www.banjocode.com/post/javascript/rename-keys/).

## Seeds File

This project was seeded using YouTube API. In seeds.rb, the function `fetch_and_create_videos` runs helper functions which do the following tasks:

1. Fetch video data from YouTube API
2. Parse the data to match the database structure
3. Create video objects from the parsed data

A separate class was not created to handle API data fetching because users will not be interacting with YouTube API through SoulFit's interface. YouTube data is fetched only once in order to seed the database, so all of the API interaction is done within `seeds.rb`.

```

```
