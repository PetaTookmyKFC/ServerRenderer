const fs = require("fs");
const { Worker } = require("worker_threads");

exports.Render = function (filepath) {
    console.log("Rendering File ", filepath);

    return new Promise((resolve, reject) => {
        try {
            let render = new Worker("./render_worker.js");

            render.on("message", (message) => {
                console.log("Get Message from Worker! ", message);
                resolve(message);
                render.terminate();
            });

            render.on("exit", (data) => {
                console.log("Thread Exited with ", data);
            });

            render.on("error", (message) => {
                console.log("Error in thread!", message);
                reject(message);
                render.terminate();
            });
            render.postMessage(filepath);
        } catch (error) {
            reject(error);
        }
    })
}