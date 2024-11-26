# CapsLock Task

This repository contains a script for a basic loader animation that moves a square shape on the screen while fetching data from a provided URL. It is built with JavaScript, Node.js, and a minimal HTTP server to serve the project files.

## Task
Please write a function in pure JavaScript that takes a URL as input and meets the following requirements:
- You can use all the features of the language that work in the latest version of Google Chrome.
- The function is called once on an empty browser page (empty body tag).
- At the time the function is invoked, a black square with a side of 100px is drawn in the top-left corner of the window.
- One second after the function is called, the square begins a smooth, uniform linear movement to the right at a constant speed of 100px per second.
- Simultaneously with the start of the square's movement, a GET request is sent to the URL provided to the function.
- One second after starting its movement, the square should stop, having traveled a total of 100px.
- If the result of the request is known by the time the square stops, then the color of the square should change at the moment of stopping (but not before).
- If the request is not yet complete by the time the square stops, the square should still stop, and its color should change as soon as the result of the request is known.
- The new color depends on the result of the request. If the server responded with "1", then the color is green; if "0" — blue. If the request was unsuccessful (status is not 200) or did not complete at all (network error), then red.

## Running Script

To run the script and start the project, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/kamplhprv/capslock-task.git
    ```

2. Navigate to the project folder:

    ```bash
    cd capslock-task
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Start the HTTP server and open the browser:

    ```bash
    npm run start
    ```

   This will start the server on `http://localhost:8080` and automatically open it in your browser.

## Generating Documentation

To generate the documentation for the code, run the following command in the root folder:

```bash
  npm run docs loader-module.js
```

   This will generate the documentation in the `docs/` folder. You can view it by opening your browser's `docs/index.html` file.

