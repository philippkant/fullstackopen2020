### Deploying a Node.js app to Heroku
0. to allow requests from other origins:
- 1. "npm install cors"
- 2. in index.js of backend:
```javascript
const cors = require('cors')

app.use(cors())
```
0. tutorial: https://devcenter.heroku.com/articles/getting-started-with-nodejs
1. Have a Node.js app (repository) with git
2. change in the terminal to that repository
3. "heroku login" in terminal
4. "heroku create" in root of app
5. Have port = process.env.PORT:
```javascript
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```
6. create .gitignore with "node_modules" as content
7. "vim Procfile: "web: npm start""
8. "git push heroku main" in root of app
9. How do we deploy the frontend to the internet?:
- 1. create production build of react app (frontend app): "npm run build"
- 2. Copy the build folder of the frontend app to the root of the heroku app
- 3. "app.use(express.static('build'))" in index.js of heroku app
10. make baseUrl relative: "/api/notes" because both frontend and backend are in the same folder now
11. git commit and git push heroku master
12. Streamlining deploying of the frontend (part2 is the frontend react app, backend is the heroku backend app):

```javascript
{
  "scripts": {
    //...
    "build:ui": "rm -rf build && cd ../part2/ && npm run build --prod && cp -r build ../backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```
So e.g. "npm run build:ui" builds now the frontend and copies the production version under the background repo.
13. (Frontend doesn't work if it is started on its own in dev mode (npm start) because relative url goes to localhost:3000) -> add proxy in package.json:
```javascript
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```
14. Now the frontend is also fine, working with the server both in development- and production mode.

####From Tutorial (not relevant)
9. "heroku ps:scale web=1" in root of app, to ensure that at least one instance of the app is running
10. "heroku open" in root of app
11. "heroku logs --tail" (View information about your running app using one of the logging commands)
12. A Procfile (text file at root) was automatically created
13. "heroku local (web?)" to run Heroku app locally
14. When you make local changes in the app and want to push it to the web app, you do it normal as with every other repository: git add *, git commit -m "Add cool face API", git push heroku main
15. Check changes: "heroku open cool"
