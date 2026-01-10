# Chat Application

## Overview
Open Line is a simple realtime chat applicaton. It allows users to register, log in, and exchange messages seamlessley in a public server. Built with Express.js, Vue.js, Prisma ORM, and MySQL. 
This project is inspired by <a href="chat.ponkis.xyz">chat.ponkis.xyz</a>, I took the opportunity to develop a similar one from scratch for learning on implementing chat features for web development.

## Features
-  <strong>User authentication</strong>: Session based login and registration system.
-  <strong>Realtime messaging</strong>: Implemented websocket with socket.io library for realtime message updates.
-  <strong>Posting</strong>: User can share their thoughts on their profile.
-  <strong>Profile Customization</strong>: User can edit their profile picture, username, and other information.
-  <strong>2000's vibe UI</strong>: The UI is primarily inspired by Facebook's old UI in their early release.

## Screenshots
### Login Page
<img width="1837" height="970" alt="image" src="https://github.com/user-attachments/assets/a931001a-47c9-4528-967c-a0dc5de273d9" />

### Chat Page
<img width="1839" height="973" alt="image" src="https://github.com/user-attachments/assets/872dc68a-121d-469f-a2d9-cfd9c958711e" />

### User Timeline Page
<img width="1815" height="971" alt="image" src="https://github.com/user-attachments/assets/e3a5ca67-741e-4ec8-84e6-6ff3f05872e6" />

## Installation
1. Clone the repository
   
   ```bash
     git clone https://github.com/dojimori/open-line.git
   ```
   
2. Navigate to project's directory
   
   ```bash
     cd open-line
   ```

3. Install dependencies for server and client
   ```bash
     cd server && npm install
   ```
   
   ```bash
     cd client && npm install
   ```

4. Run each server
    ```bash
     open-line/server > yarn dev
   ```
   
   ```bash
     open-line/client > yarn dev
   ```
   -  Access the the app on http://localhost:5173

## Development
-  Frontend: Vue.js
-  Backend: Express.js
-  Websocket: socket.io
-  ORM: Prisma ORM
-  Database: MySQL

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.
