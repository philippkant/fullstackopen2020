### Working with json-server and axios

1. create db.json file in root of project
2. "npm install axios" in root of project
3. "npm install json-server --save-dev" in root of project
4. add "server": "json-server -p3001 --watch db.json" to the scripts part of the package.json file in root of project
5. "npm start" in root of project
6. "npm run server" in root of project
7. open http://localhost:3001/persons in the browser
8. add "import axios from 'axios'" in App.js
9. add "import React, { useState, useEffect } from 'react'" in App.js
10. add effect hook to App.js, e.g like this:
```javascript
const [persons, setPersons] = useState([])

const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
```
11. the second argument ([]) in useEffect() means:

"So by default the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render.

The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component."
