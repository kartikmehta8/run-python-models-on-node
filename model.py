from transformers import pipeline

def text_summarizer_llm(article, max_length, min_length):
    """
    Summarize a given article using a pre-trained language model (BART).

    Parameters:
    - article (str): The text content to summarize.
    - max_length (int): The maximum length (in tokens) of the summary.
    - min_length (int): The minimum length (in tokens) of the summary.

    Returns:
    - dict: A dictionary containing the summarized text with keys `summary_text`.
    """
    # Initialize the summarization pipeline with BART model.
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    # Generate summary with specified length constraints and no sampling for deterministic output.
    summary = summarizer(article, max_length=max_length, min_length=min_length, do_sample=False)[0]

    return summary