# Chat App

Chat App is a basic chat application where multiple users can interact and exchange messages through socket-io

# Get started

You'll need Docker and nodeJS (12) and `yarn` to use the app. Make sure to have a `.env` file to configure the environment variables of your app. You can follow `.env.tpl` as reference to achieve this.

First you'll need to install the front-end dependencies and build the app.

Open a tab an execute the commands below:
- `cd ui`
- `yarn`
- `yarn dev`

in another tab:
- `cd ui`
- `yarn start`

Then open a browser followin:
- `http://localhost:5000/html`

# Roadmap

## Pre-requisites:
- React with Babel/TypeScript [x]
- SocketIO server [x]
- Redis cache configuration [x]

## Application
 - UI/UX - Container [x]
 - UI/UX MessageTile [x]
 - UI/UX Responsive Design [x]
 - UI/UX Modal Overlay [x]
 - Display all users connected
 - Display messages per Chat room [x]
 - Keyboard Events [x]
 - Display Date format (12h-24h) [x]
 - Sending Message through SocketIO [x]
 - Text and Image (URI) messages support [x]

## Misc
 - User Heartbeat [x]
 - Redux Configuration [x]
 - Docker-compose definition [x]

## Next steps:
- Mocking SocketIO
- Integration Jest
- Integration Storybook
- Persisting Messages into appropriated data store
- Subscribing to messages outside of Chat room
- Revisiting UI for new features
- Adding docker configuration for front-end
- Configuring Prettier

# Showcase

