## Notes


- the code for this whole lecture is available at https://github.com/mluukkai/example_app
- https://studies.cs.helsinki.fi/exampleapp/
- F12 -> Developer console
- most important tab is the *Console*, however in the introduction the *Network* tab is used a lot
- server and web brower communicate with each other using the [HTTP protocol](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
---
- click Network tab and press f5 to reload
- click on exampleapp/ to see more information (Request URL, Request Method, Status Code: 200)
- the request and the server response have several headers (response header: content-type: text/html, so the browser knows that he has to render "like a web page" etc.)
- response tab shows the response data, a regualar HTML-page
- because of the img tag, the browser does a second HTTP-request (GET) to fetch the image kuva.png from the server (response header: content-type: image/png)
- even though it is difficult to notice, the HTML page begins to render before the image has been fetched from the server
- this example application works like a **traditional web application**
- the document can be a static text file saved into the server's directory
- the server can also form the document dynamically according to the application code using e.g. data from a database which is the case here (information about number of created notes is contained here)
- traditional web application: when entering the page, the browser fetches the HTML document detailing the structure and the textual content of the page from the server. In traditional web applications the browser is "dumb". It only fetches HTML data from the server, and all application logic is on the server.
---
- **running application logic on the browser**: using javascript
- click on *notes* to go to the notes page: the browser does 4 HTTP requests (notes, main.css, main.js, data.json)
- first request is the notes document
- then in the notes document is a link tag that determines that the browser must fetch a CSS style sheet from the address main.css
- then immediately after fetching the script tag, the browser begins to execute the main.js file
- in the main.js file the data.json file is requested first which is the fourth and last file loaded. Then (event handler: state changes) if it is loaded successfully (readyState==4 and status==200) the notes (unordered list) will be appended to the div element
- the application code does not invoke the functions itself, but the runtime environment - the browser, invokes the function at an appropriate time, when the event has occurred.
---
- **forms and HTTP POST (traditional web application)**: with action="/new_note" and method="POST"
- server adds note and responds with a URL redirect (server asks browser to do a new HTTP GET requeset to the address defined in the respons header's Location -> /notes) (the code on the server fo that is quite simple)
---
- **AJAX**: approach that enables the fetching of content to web pages using JavaScript included within the HTML, without the need to rerender the page. All we saw before are traditional web applications, only the notes page uses AJAX to fetch the notes data, but submitting the form still uses the traditional mechanism of submitting web-forms
- The application URLs reflect the old, carefree times. JSON data is fetched from the url https://studies.cs.helsinki.fi/exampleapp/data.json and new notes are sent to the URL https://studies.cs.helsinki.fi/exampleapp/new_note.
Nowadays URLs like these would not be considered acceptable, as they don't follow the generally acknowledged conventions of RESTful APIs, which we'll look into more in part 3
---
- **Single page application**: In recent years, the Single-page application (SPA) style of creating web-applications has emerged. SPA-style websites don't fetch all of their pages separately from the server like our sample application does, but instead comprise only one HTML page fetched from the server, the contents of which are manipulated with JavaScript that executes in the browser. The Notes page of our application bears some resemblance to SPA-style apps, but it's not quite there yet. Even though the logic for rendering the notes is run on the browser, the page still uses the traditional way of adding new notes. The data is sent to the server with form submit, and the server instructs the browser to reload the Notes page with a redirect.
- SPA-style version of notes page: https://studies.cs.helsinki.fi/exampleapp/spa
- this time the form has no action or method attributes to define how and where to send the input data
- when you now create a new note, you'll notice that the browser sends only one request to the server
- The POST request to the address new_note_spa contains the new note as JSON-data containing both the content of the note (content) and the timestamp (date)
- the server responds with status code 201 created. This time the server does not ask for a redirect, the browser stays on the same page, and it sends no further HTTP requests
- The command document.getElementById('notes_form') instructs the code to fetch the form-element from the page, and to register an event handler to handle the form submit event. The event handler immediately calls the method e.preventDefault() to prevent the default handling of form submit. The default method would send the data to the server and cause a new GET request, which we don't want to happen. Then the event handler creates a new note, adds it to the notes list with the command notes.push(note), rerenders the note list on the page and sends the new note to the server
- the code follows a poor style of development in some measure, and should not be used as an example when creating your own applications. The same is true for the URLs used. The URL new_note_spa, which new notes are sent to, does not adhere to current best practices -> just for demonstration purposes
---

The rise of the single page app brought several more "modern" ways of web development than jQuery. The favorite of the first wave of developers was BackboneJS. After its launch in 2012, Google's AngularJS quickly became almost the de facto standard of modern web development.

However, the popularity of Angular plummeted after the Angular team announced in October 2014 that support for version 1 will end, and Angular 2 will not be backwards compatible with the first version. Angular 2 and the newer versions have not gotten too warm of a welcome.

Currently the most popular tool for implementing the browser-side logic of web-applications is Facebook's React library. During this course, we will get familiar with React and the Redux library, which are frequently used together.

The status of React seems strong, but the world of JavaScript is ever changing. For example, recently a newcomer - VueJS - has been capturing some interest.

## Exercises

Diagrams created with https://www.websequencediagrams.com/

