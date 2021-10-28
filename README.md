<br />
<p align="center">
    <img src="images/discourse-logo.png" alt="Logo" width="90" height="90">

  <h3 align="center">Discourse</h3>

  <p align="center">
    A portfolio clone of <a target="_blank" href="https://discord.com/">Discord.com</a>
    <br />
    <a href="https://discourse-aa.herokuapp.com/" target="_blank"><strong>Explore the website »</strong></a>
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#interesting-issues">Interesting Issues</a>
      <ul>
        <li><a href="#cascade-deleting-servers">Cascade Deleting Servers</a></li>
        <li><a href="#real-time-message-crud">Real Time Message CRUD</a></li>
      </ul>
    </li>
    <li>
      <a href="#features-to-implement-next">Features to Implement Next</a>
      <ul>
        <li><a href="#private-servers">Private Servers</a></li>
        <li><a href="#voice-chat">Voice Chat</a></li>
      </ul>
    <li><a href="#contact">Contact</a></li>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project 
[Back to top](#table-of-contents)
[![Product Name Screen Shot][product-screenshot]](https://finstagram-project.herokuapp.com/)

Discourse is a full stack PERN application which is made to look like the browser version of the popular chat app Discord. Discourse allows users to create public servers and text channels on those servers. Channels are individual chat rooms which users can use to message each other in real time. Discourse is a real single-page application--once you login, every server and channel view is handled through React state!

### Built With 
[Back to top](#table-of-contents)
* [Socket.io](https://socket.io/)
* [AWS - Amazon Web Services](https://aws.amazon.com/)
* [PostgreSQL](https://www.postgresql.org/docs/)
* [Sequelize](https://sequelize.org/)
* [ExpressJS](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

<!-- USAGE EXAMPLES -->
## Usage
[Back to top](#table-of-contents)

Users can signup with an optional profile picture. The signup form includes full error handling.

[![Product Name Screen Shot][signup]](https://discourse-aa.herokuapp.com/login)

<br>
<br>

Users can login with an option to choose between two Demo users, in order to test the chat feature.

[![Product Name Screen Shot][login]](https://discourse-aa.herokuapp.com/login)


# Servers

## Server List and Dashboard Home
Once logged in, users will see the dashboard of Discourse, with servers listed on the left side of the screen. Clicking a server will open its text channel list
[![Product Name Screen Shot][dashboard-home]](https://discourse-aa.herokuapp.com)


## Adding a Server
Users can create a server, as well as edit and delete the server they created.
[![Product Name Screen Shot][adding-server]](https://discourse-aa.herokuapp.com)

## Editing a Server
Users can edit their servers, remove/add server pictures and titles. Full error handling exists here as well.
[![Product Name Screen Shot][editing-server]](https://discourse-aa.herokuapp.com)

## Deleting a Server
Users can delete their servers
[![Product Name Screen Shot][deleting-server]](https://discourse-aa.herokuapp.com)

<br/>
<br/>

# Channels

## Adding a Channel
Users can create channels on servers they own
[![Product Name Screen Shot][adding-channel]](https://discourse-aa.herokuapp.com)

## Editing a Channel
Users can edit channel names and add an optional topic that appears at the top
[![Product Name Screen Shot][editing-channel]](https://discourse-aa.herokuapp.com)

## Deleting a Channel
Users can delete channels on servers they own
[![Product Name Screen Shot][deleting-channel]](https://discourse-aa.herokuapp.com)

# Messages

## Adding a Message (with Emojis!)
Users can create messages on any server's channel
[![Product Name Screen Shot][adding-message]](https://discourse-aa.herokuapp.com)

## Editing a message
Users can edit messages, pressing escape to cancel, and enter to submit the edit
[![Product Name Screen Shot][editing-message]](https://discourse-aa.herokuapp.com)

## Deleting a message
Users can delete messages by either clicking the delete icon, or saving an edited message after deleting all content
[![Product Name Screen Shot][deleting-message]](https://discourse-aa.herokuapp.com)

# Socket Demo

## Adding, editing, and deleting messages are all done with sockets, so other users can see these actions occur in real time!
[![Product Name Screen Shot][socket-demo]](https://discourse-aa.herokuapp.com)

# Interesting Issues:
## Cascade Deleting Servers
[Back to top](#table-of-contents) 

Issue: When creating the database schema and relationships in Sequelize, I realized that there were nested ownerships between tables. Users owned Servers, Servers owned Channels, and Channels owned Messages. So, deleting Servers should result in all of its channels being deleted, which should result in all of those channels' messages also being deleted. I wanted to ensure this functionality existed before building out the website so I wouldn't have to deal with the issue while building out the Delete Servers and Delete Channels CRUD functionality.

Solution: To fix it, I added the below code to each foreign key that existed in the nested table that points towards the dependent entity being deleted:

```js
// On create-channel.js migration file
serverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: "Servers" }
      },
```

```js
// On create-message.js migration file
channelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: "Channels" }
      },
```

This made it so that deleting a server would also delete any channel rows with serverId columns pointing towards that specific server, which then cascaded onto any message rows with channelIds pointing towards those specific channels.


## Real Time Message CRUD
[Back to top](#table-of-contents) 

Issue: When adding, editing, and deleting messages, the message would be changed on the current user's screen, but any other user logged in wouldn't see the change unless they refreshed the page.

Solution: This was an interesting addition to the project which was the inclusion of the socket.io library to allow for real-time communication between users. By adding a socket connection to the backend and connecting it to the frontend react dashboard component, I was able to make every user start a socket connection upon connecting to the website. I then made each action to add/edit/delete a message have a socket.emit method sent to the backend. The backend receives this method, then uses the information sent with it to make the necessary changes to the database. After the database has been updated, the backend sends a socket method back to the front end, which is listened to inside of a useEffect in the channel component. Finally, the useEffect calls the action creators to update Redux state appropriately for every user currently connected to the website via sockets.

# Features to Implement Next
## Private Servers
[Back to top](#table-of-contents)

An interesting addition to the project would be private servers. Users would make a server that is not public, then invite specific users to be able to see/interact with that server.

How I would do it: I would add a column to the servers table in the database indicating if the server is public or private. I would also add a joins table between the Servers and Users tables that indicates which Users are members of specific Servers. I would then change the dashboard page so that each user will only see a list of Servers that are public, and private Servers that have their user id's listed in the joins table for that specific Server. Lastly, I would add invite functionality so that a user that owns a private server can search for other users and invite them. When that user accepts the invite, their user Id and that private server Id will get added to the joins table, which updates their server list to include the newly joined private server.

## Voice Chat
[Back to top](#table-of-contents)

A functionality I would really like to add is the ability to use voice/video chat. Ideally it would be like discord, where clicking a voice channel will join an environment that would make you audible to anyone else in that environment who joined that voice channel.

How I would do it: I would use Web RTC, an open-source software that provides real-time voice/video communication, in order to create voice chat sessions between users. I would need to figure out how to make it more like a private voice chat room that only allows users that have joined that room (by clicking on the voice channel) to hear other users in that same voice channel, rather than the typical voice call between two users that is the most basic implementation of Web RTC.

<!-- CONTACT -->
## Contact
[Back to top](#table-of-contents)

Jason Cahela:
 - LinkedIn: https://www.linkedin.com/in/jason-cahela/
 - Email: jpacahela@gmail.com

Project Repo Link: https://github.com/jcahela/Discourse

Project Link: https://discourse-aa.herokuapp.com/


<!-- ACKNOWLEDGEMENTS --

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/landing-page.PNG
[signup]: images/signup.gif
[login]: images/login-demo.gif
[dashboard-home]: images/dashboard-home.gif
[adding-server]: images/adding-server.gif
[editing-server]: images/editing-server.gif
[deleting-server]: images/deleting-server.gif
[adding-channel]: images/adding-channel.gif
[editing-channel]: images/editing-channel.gif
[deleting-channel]: images/deleting-channel.gif
[adding-message]: images/adding-message.gif
[editing-message]: images/editing-message.gif
[deleting-message]: images/deleting-message.gif
[socket-demo]: images/socket-demo.gif
