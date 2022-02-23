# SoulFit

SoulFit is a video library for fitness and mindfulness videos. The frontend was built with React and MUI, and the backend is a REST API built with Ruby on Rails and seeded using YouTube API.

## Video Walkthrough

Check out the [video walkthrough](https://www.loom.com/share/9adb4cd688c54d5497689071e8b25756) of this project to see its features in action.

## Deployed Site

See the [deployed site](https://soul-fit.herokuapp.com/), hosted on Heroku.

## Packages

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Configuration was achieved using a React/Rails API template from Flatiron School.

[MUI](https://mui.com/) was used for styling.

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
