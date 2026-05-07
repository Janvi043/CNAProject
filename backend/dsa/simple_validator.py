# Simple DNA sequence validator (DSA placeholder)

class DNAValidator:
    def __init__(self):
        self.valid_bases = {"A", "T", "G", "C"}

    def is_valid(self, sequence: str) -> bool:
        """
        Check if DNA sequence contains only A, T, G, C
        """
        sequence = sequence.upper()
        for base in sequence:
            if base not in self.valid_bases:
                return False
        return True
