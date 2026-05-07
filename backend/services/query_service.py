# Academic DSA Project
# No ML / AI / NLP
# Pure deterministic, intent-based query processing

from services.session_store import session_store
from services.mongo_client import get_database


class QueryService:
    def __init__(self):
        self.db = get_database()
        self._disease_info = self._load_disease_info()

    # -----------------------------
    # LOAD DISEASE INFO FROM MONGODB
    # -----------------------------
    def _load_disease_info(self):
        info = {}
        records = list(self.db.disease_info.find({}))

        for row in records:
            disease = (row.get("disease") or "").strip()
            desc = (row.get("description") or "").strip()
            if disease:
                info[disease.lower()] = desc
        return info

    def _get_description(self, disease: str):
        return self._disease_info.get(disease.lower())

    # -----------------------------
    # INTENT-BASED QUERY HANDLER
    # -----------------------------
    def answer(self, question: str):
        q = question.lower().strip()

        # ✅ Always read from cached analysis
        diseases = session_store.disease_results

        if not diseases:
            return {
                "answer": "No disease data available yet. Please run disease analysis first."
            }

        # -----------------------------
        # BLOCK RISK / SEVERITY QUESTIONS
        # -----------------------------
        if any(w in q for w in ["risk", "severity", "priority", "danger"]):
            return {
                "answer": "Risk and severity details are available in the Priority Alerts section."
            }

        # -----------------------------
        # COLLECT DISEASE NAMES
        # -----------------------------
        all_diseases = [d["disease"] for d in diseases if d.get("disease")]

        mentioned = None
        for d in diseases:
            if d["disease"].lower() in q:
                mentioned = d
                break

        # -----------------------------
        # LIST DETECTED DISEASES
        # -----------------------------
        if any(w in q for w in [
            "list", "show", "detected", "what diseases", "which diseases"
        ]):
            return {
                "answer": "Detected diseases: " +
                ", ".join(sorted(set(all_diseases)))
            }

        # -----------------------------
        # INHERITANCE QUERY
        # -----------------------------
        if any(w in q for w in ["inherit", "from whom", "source"]):
            if mentioned:
                return {
                    "answer": f"{mentioned['disease']} was inherited from {mentioned['source']}."
                }
            return {
                "answer": "Please specify a disease name to trace inheritance."
            }

        # -----------------------------
        # DISEASE DESCRIPTION
        # -----------------------------
        if any(w in q for w in ["what is", "explain", "tell me about"]):
            if mentioned:
                desc = self._get_description(mentioned["disease"])
                return {
                    "answer": f"{mentioned['disease']}: {desc or 'Detected via genomic markers.'}"
                }
            return {
                "answer": "Please mention a detected disease name."
            }

        # -----------------------------
        # FALLBACK RESPONSE
        # -----------------------------
        if mentioned:
            return {
                "answer": f"{mentioned['disease']} is associated via {mentioned['source']}."
            }

        return {
            "answer": "Ask about detected diseases, inheritance, or 'what is <disease>'."
        }
