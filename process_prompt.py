import sys
import json
from model import text_summarizer_llm

if __name__ == "__main__":
    """
    Entry point for running the script as a standalone program. 

    Expects a JSON-encoded string passed as a command-line argument.

    Outputs:
    - JSON-formatted string containing the `result` key with the result.
    """

    # Parse command-line argument as JSON.
    input_data = json.loads(sys.argv[1])

    # Extract necessary parameters from parsed JSON. [BASED UPON YOUR MODEL FUNCTION]
    article = input_data["article"]
    max_length = input_data["max_length"]
    min_length = input_data["min_length"]

    # Summarize the article using the text_summarizer_llm function.
    result = text_summarizer_llm(article, max_length, min_length) # [YOUR MODEL DEFINED IN model.py]

    # Output the result as JSON to standard output.
    print(json.dumps({"result": result}))
