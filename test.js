const assert = require("assert");
const fs = require("fs");

// A function that runs a test case and compares the output with the expected output
function runTest(testCase) {
    return new Promise(async (resolve, reject) => {
        try {
            // Reset the Responce object
            Responce = new StringBuilder();
            // Read the expected output from a file
            let expectedOutput = fs.readFileSync(testCase + ".out").toString();
            // Send the HTML file path to the parent port
            parentPort.postMessage(testCase + ".html");
            // Wait for the response from the worker thread
            parentPort.on("message", (msg) => {
                // Compare the response with the expected output using assert
                assert.strictEqual(msg, expectedOutput);
                // Resolve the promise if the test passes
                resolve();
            });
        } catch (error) {
            // Reject the promise if the test fails
            reject(error);
        }
    })
}

// An array of test cases
let testCases = ["test1", "test2", "test3", "test4", "test5"];

// A function that runs all the test cases and reports the results
async function runAllTests() {
    try {
        // Iterate over the test cases
        for (let testCase of testCases) {
            // Run each test case and wait for the result
            await runTest(testCase);
            // Log a success message if the test passes
            console.log(testCase + " passed");
        }
        // Log a final message if all tests pass
        console.log("All tests passed");
    } catch (error) {
        // Log an error message if any test fails
        console.error(error);
    }
}

// Run all tests
runAllTests();