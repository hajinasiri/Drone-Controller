# "Simdrone" - Group Final Project (Lighthouse Labs)

Group Members: Esha, Sh, Hannah

This is the final project for ligthouse labs web developing deploma.
The app is deployed on AWS and can be found on
http://ec2-18-221-12-59.us-east-2.compute.amazonaws.com:3000/
A computer that is running the controlling code and is controlling the drone through bluetooth act as a client for the websocket server. Users can go on the website and watch the live stream video of the drone and request controlling the drone. They can see how many people are in the que and where their own position is. When it's the user's turn to control the drone the button changes its color and shows that it's the users turn. Then the user can control the drone through the buttons on the page and watch the drone. Users can also communicate through the chatbar that is implemented on the right side of the page. This app works as long as the drone is charged, the controlling computer is running the controlling code and the live stream video is allowed from the camera. We did this project as the final project and we will not keep things running after that, but you can download the controller_server.js form here and run it on your computer and have a parrot drone connected to it and try flying the drone through our app. 
This app is built on the chatty app project that we had done during the course and since that project was open sourced we decided to use it in our project. A few people in lighthouse labs had contributed in making the boiler plate for the app. 

### Usage
This app works as long as the drone is charged, the controlling computer is running the controlling code and the live stream video is allowed from the camera. We did this project as the final project and we will not keep things running after that, but you can download the controller_server.js form here and run it on your computer and have a parrot drone connected to it and try flying the drone through our app. 
Install the dependencies and start the server.

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Rolling-spider
* Temporal
* React Dom
* React Popup
* WS
