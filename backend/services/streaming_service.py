from dsa.sliding_window import SlidingWindowAnalyzer
from services.session_store import session_store


class StreamingDNAService:
    def __init__(self, window_size: int = 5):
        self.window_size = window_size
        self.analyzer = SlidingWindowAnalyzer(window_size)

        # --- STREAMING STATE ---
        self.father_seq = None
        self.mother_seq = None
        self.current_index = 0
        self.is_paused = False

    def start(self):
        """
        Start streaming Father vs Mother DNA
        """
        self.father_seq = session_store.father_dna
        self.mother_seq = session_store.mother_dna

        if not self.father_seq or not self.mother_seq:
            raise ValueError("Father and Mother DNA must be uploaded")

        self.father_seq = self.father_seq.upper()
        self.mother_seq = self.mother_seq.upper()

        self.current_index = 0
        self.is_paused = False

    def pause(self):
        """
        Pause streaming
        """
        self.is_paused = True

    def resume(self):
        """
        Resume streaming
        """
        self.is_paused = False

    def stream(self):
        """
        Generator: sliding window comparison
        Father DNA vs Mother DNA
        """
        n = min(len(self.father_seq), len(self.mother_seq))

        while self.current_index <= n - self.window_size:
            if self.is_paused:
                break

            father_window = self.father_seq[
                self.current_index:self.current_index + self.window_size
            ]
            mother_window = self.mother_seq[
                self.current_index:self.current_index + self.window_size
            ]

            yield {
                "position": self.current_index,
                "father_window": father_window,
                "mother_window": mother_window
            }

            self.current_index += 1
