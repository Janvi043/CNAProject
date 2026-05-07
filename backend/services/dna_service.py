# Service layer for DNA-related operations

from dsa.simple_validator import DNAValidator


class DNAService:
    def __init__(self):
        self.validator = DNAValidator()

    def validate_sequence(self, sequence: str) -> dict:
        """
        Validate a DNA sequence and return structured result
        """
        is_valid = self.validator.is_valid(sequence)

        if is_valid:
            return {
                "valid": True,
                "message": "DNA sequence is valid"
            }
        else:
            return {
                "valid": False,
                "message": "DNA sequence contains invalid characters"
            }
