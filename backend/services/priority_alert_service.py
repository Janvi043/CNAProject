from services.session_store import session_store


class PriorityAlertService:
    def generate_alerts(self):
        priority = {
            "high": [],
            "medium": [],
            "low": []
        }

        diseases = session_store.disease_results
        if not diseases:
            return priority

        for entry in diseases:
            disease = entry.get("disease")
            source = entry.get("source", "").lower()

            has_father = "father" in source
            has_mother = "mother" in source

            father_side_relative = any(
                rel in source
                for rel in ["father's", "paternal"]
            )

            mother_side_relative = any(
                rel in source
                for rel in ["mother's", "maternal"]
            )

            # 🔴 HIGH → Father AND Mother
            if has_father and has_mother:
                priority["high"].append(disease)

            # 🟢 LOW → Parent + same-side relative
            elif (has_father and father_side_relative) or (
                has_mother and mother_side_relative
            ):
                priority["low"].append(disease)

            # 🟡 MEDIUM → Only one parent
            elif has_father or has_mother:
                priority["medium"].append(disease)

            # (Anything else is ignored safely)

        # Remove duplicates
        for key in priority:
            priority[key] = sorted(set(priority[key]))

        return priority
