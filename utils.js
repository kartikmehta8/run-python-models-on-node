const { spawn } = require('child_process');

/**
 * Runs a Python script with the provided data and returns the result.
 *
 * @param {string} scriptPath - The path to the Python script.
 * @param {Object} data       - The JSON data to pass to the Python script.
 * @returns {Promise<Object>} - A Promise that resolves with the result from the Python script.
 */
function runPythonScript(scriptPath, data) {
  return new Promise((resolve, reject) => {
    // Spawn a child process to run the Python script.
    const pythonProcess = spawn('python3', [scriptPath, JSON.stringify(data)]);

    let result = '';

    // Listen for data from the Python script.
    pythonProcess.stdout.on('data', (outputData) => {
      result += outputData.toString();
    });

    // Handle when the Python script ends.
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        // Try to parse the result as JSON and resolve the promise.
        try {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } catch (error) {
          reject(new Error('Error parsing Python response'));
        }
      } else {
        reject(new Error('Error executing Python script'));
      }
    });

    // Handle errors in starting the child process.
    pythonProcess.on('error', (err) => {
      reject(new Error('Failed to start Python process'));
    });
  });
}

module.exports = { runPythonScript };
