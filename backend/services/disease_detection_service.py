from services.session_store import session_store
from services.mongo_client import get_database


class DiseaseDetectionService:
    def __init__(self):
        self.db = get_database()
        self.disease_markers = self._load_markers()

        # Gender constraint (simple biological rule)
        self.gender_specific_diseases = {
            "prostate cancer": "male",
            "breast cancer": "female"
        }

    # -----------------------------
    # LOAD MARKERS FROM MONGODB
    # -----------------------------
    def _load_markers(self):
        markers = {}
        records = list(self.db.disease_markers.find({}))

        for row in records:
            disease = (row.get("disease") or "").strip()
            marker = (row.get("marker") or "").strip()
            if disease and marker:
                markers[disease] = marker.upper()

        return markers

    # -----------------------------
    # STRICT SLIDING WINDOW MATCH
    # -----------------------------
    def _exact_match(self, dna: str, marker: str) -> bool:
        window_size = len(marker)

        for i in range(len(dna) - window_size + 1):
            if dna[i:i + window_size] == marker:
                return True

        return False

    # -----------------------------
    # MAIN ANALYSIS FUNCTION
    # -----------------------------
    def analyze(self):

        father = session_store.father_dna
        mother = session_store.mother_dna
        relative = session_store.relative

        if not father or not mother:
            return []

        father = father.upper()
        mother = mother.upper()

        detected = {}

        # -----------------------------
        # STEP 1: CHECK PARENTS ONLY
        # -----------------------------
        for disease, marker in self.disease_markers.items():
            disease_lower = disease.lower()
            sources = set()

            # Father check
            if self._exact_match(father, marker):
                if not (
                    disease_lower in self.gender_specific_diseases
                    and self.gender_specific_diseases[disease_lower] == "female"
                ):
                    sources.add("Father")

            # Mother check
            if self._exact_match(mother, marker):
                if not (
                    disease_lower in self.gender_specific_diseases
                    and self.gender_specific_diseases[disease_lower] == "male"
                ):
                    sources.add("Mother")

            # Only add disease if found in at least one parent
            if sources:
                detected[disease] = sources

        # -----------------------------
        # STEP 2: ADD RELATIVE AS SUPPORT ONLY
        # -----------------------------
        if relative:
            relation = relative.get("relation", "Relative")
            dna = relative.get("dna", "").upper()

            for disease, marker in self.disease_markers.items():
                # Add relative only if disease already detected in parents
                if disease in detected:
                    if self._exact_match(dna, marker):
                        detected[disease].add(relation)

        # -----------------------------
        # FINAL RESULT FORMAT
        # -----------------------------
        results = []

        for disease, sources in detected.items():
            results.append({
                "disease": disease,
                "source": ", ".join(sorted(sources))
            })

        session_store.store_diseases(results)

        return results
