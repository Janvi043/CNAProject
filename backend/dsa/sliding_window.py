class SlidingWindowAnalyzer:
    def __init__(self, window_size: int = 5):
        self.window_size = window_size

    def analyze(self, sequence: str):
        """
        Generator that yields sliding windows
        """
        sequence = sequence.upper()

        for i in range(len(sequence) - self.window_size + 1):
            window = sequence[i:i + self.window_size]
            yield {
                "position": i,
                "window": window
            }
