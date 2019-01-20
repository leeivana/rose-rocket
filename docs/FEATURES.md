Features 
=====================
This document lists all the features implemented within the application. 
# Table of Contents
* [How does the application work?](#how-does-the-application-work)
* [RESTful Routes](#restful-routes)
* [Grid Layout](#grid)
* [Form Structure](#form-structure)
* [Changing driver position](#changing-driver-position)
  * [PUT Request](#put-request)
  * [Websockets](#websockets)

## How does the application work?
This application is made by React, Fastify and Websockets in order to visualize stops, paths and a driver's current 
location when provided a specific active legID and leg progress percentage. 

The application consist of two major components. The grid component and a selector component, which is a form where legID and a 
leg progress percentage can be inputted. All stop information is fetched on `componentDidMount` and are mapped onto the grid. 
Through the use of Websockets, when a legID and/or leg progress percentage is changed, the data is reflected
on the grid. 

## RESTful Routes
All routes are defined in `src/routes.js`. There are 4 routes: 

| Path        | HTTP Verb           | Purpose  |
| ------------- |:-------------:| :-----|
| /legs      | GET | Lists all legs from server |
| /stops      | GET      |   Lists all stops from server |
| /driver | GET      | Retrieves the driver's current position |
| /driver | PUT      | Updates driver's current position |

## Grid  
The grid is created in `Board.js`, where the board is rendered within a single `<div>` and `<div>` are also used to draw each cell. The 
component is rendered with an x and y component to help map out coordinates on the grid itself. The cell size, width and height of the grid is dependent on `window.innerHeight` and `window.innerWidth` but this can be changed in `Board.js`. 

As both stops 'A' and 'L' have the same coordinates, depending on the stop selected, the stop name will dynamically change. 
Below is a gif illustrating this change: 

*Change is on the stop at the top left*
!["Stop change"](https://github.com/leeivana/rose-rocket/blob/master/docs/stop-change.gif?raw=true)

## Form structure
The form consists of three major components: the dropdown selector for the legID, a input field for the leg process percentage and a 
submit button. In order to get all the legIDs to display on the dropdown selector, all information is passed through props and is mapped
on render in `Selector.js`. As all information is passed through props, the initial value for both the legID and leg progress percentage
is what is retrieved from the initial fetch call. 

## Changing driver position 
When a new legID and/or leg progress percentage is submitted via the selection form, the database is updated via a PUT request sent from the client
and a message sent to the Websockets upon clicking submit. 

### Put Request 
Upon clicking the submit button on the form, the `updateInfo` function in `App.js` is called. Via a fetch, a put request is sent to the 
server that sends the updated legID and leg progress percentage, which updates the information on the database. 

### Websockets 
Following the put request, a message is set through a Websocket connection containing all updated information. The websocket sends the 
information to all of the connected clients and the client calls `setState` on the payload recieved from the websocket, updating information
shown on the grid. 


