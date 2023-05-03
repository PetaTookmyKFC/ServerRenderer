# ServerRenderer
# HTML Server-Side Code Executor

This is a Node.js program that uses worker threads to execute server-side code embedded in HTML files. The program can parse and evaluate HTML files that contain code blocks enclosed by <ser> tags. The code blocks can import and parse other HTML files using the Component function. The program can also run test cases and compare the output with the expected output.

## Installation

To install this program, you will need Node.js and npm installed on your machine. You will also need the following modules:

- worker_threads
- fs
- string-builder
- assert

You can install these modules using the following command:

```bash
npm install worker_threads fs string-builder assert
```

You will also need to download the following files from this repository and place them in the same directory:

- index.js: The main file that creates a worker thread and sends an HTML file path to it.
- worker.js: The worker file that parses and evaluates the HTML file and sends the output back to the main thread.
- AsyncFunction.js: A module that exports an AsyncFunction constructor that can create asynchronous functions from strings.
- test.js: A file that runs test cases and compares the output with the expected output.

## Usage

To use this program, you will need to create an HTML file that contains server-side code embedded in <ser> tags. For example:

```html
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>This is an example</h1>
    <p>This is a paragraph</p>
    <ser>
        // This is a code block that prints a message
        write("Hello, world!");
    </ser>
    <p>This is another paragraph</p>
</body>
</html>
```

You can also import and parse other HTML files using the Component function. For example:

```html
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>This is an example</h1>
    <p>This is a paragraph</p>
    <ser>
        // This is a code block that imports and parses another HTML file
        await Component("another.html");
    </ser>
    <p>This is another paragraph</p>
</body>
</html>
```

The Component function takes a file name as an argument and returns a promise. The file name should be relative to the current HTML file. The Component function will read, parse and evaluate the imported HTML file and append its output to the final response.

To run this program, you will need to pass the HTML file path as an argument to the index.js file. For example:

```bash
node index.js example.html
```

The program will create a worker thread and send the HTML file path to it. The worker thread will read, parse and evaluate the HTML file and send the output back to the main thread. The main thread will log the output to the console.

To run the test cases, you will need to run the test.js file. For example:

```bash
node test.js
```

The test.js file will run five test cases and compare the output with the expected output. The test cases are:

- Test case 1: The HTML file contains no <ser> tags. The expected output is the same as the input file.
- Test case 2: The HTML file contains one <ser> tag that prints a message. The expected output is the input file with the message appended to the final response.
- Test case 3: The HTML file contains multiple <ser> tags that import and parse different HTML files. The expected output is the input file with the contents of the imported files appended to the final response in the order of appearance.
- Test case 4: The HTML file contains a <ser> tag that throws an error. The expected output is an error message logged to the console and the promise rejected.
- Test case 5: The HTML file does not exist or is not readable. The expected output is an error message logged to the console and the promise rejected.

The test.js file will log a success message for each test case that passes, and an error message for each test case that fails. It will also log a final message if all tests pass.

## License

This program is licensed under MIT License. See LICENSE for more details.
