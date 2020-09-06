# Chat App

Chat App is a basic chat application where multiple users can interact and exchange messages through socket-io.

# Get started

You'll need `Docker`, `nodeJS` (12+) and `yarn` to use the app. Make sure to have a `.env` file to configure the environment variables of your app. You can follow `.env.tpl` file as reference to achieve this.

## Build and serving UI

First you'll need to install the front-end dependencies to build the app.

Open a tab an execute the commands below:
- `cd ui`
- `yarn` // equivalent to yarn install
- `yarn dev`

in another tab:
- `cd ui`
- `yarn start`

Then open a browser following link below:
- `http://localhost:5000/html`

## Starting Server stack

- `docker-compose up` at the root of the project


# Roadmap

## Pre-requisites
 - [x] React with Babel/TypeScript
 - [x] SocketIO server
 - [x] Redis cache configuration

## Application
 - [x] UI/UX - Container
 - [x] UI/UX MessageTile
 - [x] UI/UX Responsive Design
 - [x] UI/UX Modal Overlay
 - [x] Display all users connected
 - [x] Display messages per Chat room
 - [x] Keyboard Events
 - [x] Display Date format (12h-24h)
 - [x] Sending Message through SocketIO
 - [x] Text and Image (URI) messages support

## Misc
 - [x] User Heartbeat
 - [x] Redux Configuration
 - [x] Docker-compose definition

## Next steps
- Mocking SocketIO
- Integration Jest
- Integration Storybook
- Persisting Messages into appropriated data store
- Subscribing to messages outside of Chat room
- Revisiting UI for new features
- Adding docker configuration for front-end
- Configuring Prettier

# Application Walk-through

## Landing Page

Once the application is started, you'll see a screen similar to the one below:

<img src="https://i.ibb.co/QKZm7dS/welcome.png" alt="welcome" border="0" width="400">

Pick a username, this username will be visible to other users.

## Connected Users

Once you've selected a username, you'll land on a screen similar to the one below:

<img src="https://i.ibb.co/X21vrQW/chat-rooms.png" alt="chat-rooms" border="0" width="400">

Once another user will connect, you'll see appearing the name in the list automatically.

## Chat Room

Once a user select your name (and you select the user's name), you'll be able to communicate.
To activate the Input message box, you'll need to click on the Red Float Action Button with a Chat icon (bottom right).

If some text is added to the box, you can send message to the user by pressing the "Send message" button, or pressing Enter if that option is Active.
Note that if you add a picture link, such as `https://d2toaicwmkfk0u.cloudfront.net/wp-content/uploads/2019/01/02132842/backdrop31.jpg`, the recipient will see an image instead of the link.

<img src="https://i.ibb.co/VLGHMH8/chat-room.png" alt="chat-room" border="0" width="400">

## Settings Overlay

Clicking on Settings in the navbar area will open a Modal view similar as below, where you'll be able to configure couple of options and reset them.

<img src="https://i.ibb.co/0j8JB7t/settings-overlay.png" alt="settings-overlay" border="0" width="400">
