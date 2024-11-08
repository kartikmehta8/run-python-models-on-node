const express = require('express');
const { runPythonScript } = require('./utils');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  const data = req.body; // Customize this to match the expected data format.

  try {
    // Use the utility function to run the Python script and get the result.
    const result = await runPythonScript('process_prompt.py', data);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
