In command terminal:
1. Navigate to local directory where project files will be located
2. run: git clone https://github.com/kinzelj/CS340-Project.git
3. run: cd CS340-Project/
4. run: npm install
5. run: cd client/
6. run: npm install

To deploy as static site without backend:
1. Navigate to CS340-Project/client/
2. run: npm start

Deploy backend then run frontend with npm start. This will allow for frontend development while connected to backend server:
1. Navigate to CS340-Project/
2. run: node server.js
3. Open separate terminal and navigate to /CS340-Project/client/
4. run: npm start

To deploy production site:
1. Navigate to /CS340-Project/client/
2. run: npm run build
3. navigate to /CS340-Project/
4. run: node server.js
5. Open localhost:5000 in browser