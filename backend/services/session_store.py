class SessionStore:
    def __init__(self):
        self.reset_all()

    # -----------------------------
    # FULL RESET (IMPORTANT)
    # -----------------------------
    def reset_all(self):
        self.father_dna = None
        self.mother_dna = None
        self.relative = None  # Only ONE relative allowed per session

        self.disease_results = []
        self.marker_map = {}

        self.disease_analysis_done = False
        self.priority_generated = False

    # -----------------------------
    # DNA STORAGE
    # -----------------------------
    def store_father(self, sequence: str):
        self.reset_all()  # New parent upload = new session
        self.father_dna = sequence

    def store_mother(self, sequence: str):
        self.mother_dna = sequence

    def store_relative(self, relation: str, sequence: str):
        self.relative = {
            "relation": relation,
            "dna": sequence
        }
        self._reset_analysis()

    # -----------------------------
    # ANALYSIS STORAGE
    # -----------------------------
    def store_diseases(self, diseases):
        self.disease_results = diseases
        self.disease_analysis_done = True

    # -----------------------------
    # INTERNAL RESET (ONLY ANALYSIS)
    # -----------------------------
    def _reset_analysis(self):
        self.disease_results = []
        self.marker_map = {}
        self.disease_analysis_done = False
        self.priority_generated = False


session_store = SessionStore()
