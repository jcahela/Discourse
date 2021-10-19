# Discourse

## Discourse First Look
Discourse is a full stack PERN application which is made to look like the browser version of the popular chat app Discord. Discourse allows users to create public servers which any user can chat in. These servers contain channels, which are the actual public chat rooms. Users can create servers with a name and an optional server picture, edit servers they own to change the name of the server or the picture of the server, and delete a server. Users can create channels in servers they own. Channels will be owned by the server they're created in, and only the user that owns that server can edit/delete that channel. Users who own servers with channels can edit the channel names, and give the channel an optional topic. Lastly, users can delete channels owned by servers they own.

## Application Architecture
Discourse is built on a React frontend, with an Express backend, and a PostgreSQL database. Socket IO is also used to allow for live chat features in channels.
