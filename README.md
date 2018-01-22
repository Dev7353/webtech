Web Technologies Chess
=====================================

This is a project for the lecture Web Technologies at the HTWG Konstanz. It implements the web interface for 
[the software engineering project chess](https://github.com/Dev7353/chess) and is built with Scala, 
[Play](https://github.com/playframework/playframework) and [Silhouette](https://github.com/mohiva/play-silhouette). 
It also has an alternative functional [Vue](https://github.com/vuejs/vue) view and a 
mock-up view in [Polymer](https://github.com/Polymer/polymer).

## Demo

Visit [the Heroku app](http://de-chess-htwg.herokuapp.com/) for the demo.

## Installation

1. Simply clone this repository and run this project with IntelliJ or `sbt run`.
2. Open `localhost:9000` in the browser.
3. Register with your credentials or log in via Google.
4. Play the game.

## Features

* Sign Up
* Sign In (Credentials)
* Social Auth (Google+)
* Dependency Injection with Guice
* Remember me functionality
* Password reset/change functionality
* Account activation functionality
* Email sending and auth token cleanup
* [Security headers](https://www.playframework.com/documentation/2.4.x/SecurityHeaders)
* [CSRF Protection](https://www.playframework.com/documentation/2.4.x/ScalaCsrf)

