# Academic DSA Project
# No ML / AI / NLP
# Pure sliding window based streaming comparison

from services.session_store import session_store
import time


class ComparativeStreamingService:
    def __init__(self, window_size=5):
        self.window_size = window_size

        self.phase = "INIT"
        self.current_index = 0
        self.is_paused = False

    def _send(self, text: str):
        return f"data: {text}\n\n"

    def _reset_state(self):
        self.phase = "INIT"
        self.current_index = 0
        self.is_paused = False

    def pause(self):
        self.is_paused = True

    def resume(self):
        self.is_paused = False

    def stream(self):
        self._reset_state()

        father = session_store.father_dna
        mother = session_store.mother_dna
        relative = session_store.relative

        if not father or not mother:
            yield self._send("Parent DNA not uploaded")
            return

        father = father.upper()
        mother = mother.upper()

        # -----------------------------
        # FATHER vs MOTHER
        # -----------------------------
        yield self._send("=== Father vs Mother ===")
        time.sleep(0.4)

        limit = min(len(father), len(mother)) - self.window_size + 1

        while self.current_index < limit:
            while self.is_paused:
                time.sleep(0.2)

            i = self.current_index
            f = father[i:i + self.window_size]
            m = mother[i:i + self.window_size]

            yield self._send(f"Position {i}")
            yield self._send(f"Father: {f}")
            yield self._send(f"Mother: {m}")
            yield self._send("")

            time.sleep(0.2)
            self.current_index += 1

        # Reset index
        self.current_index = 0

        # -----------------------------
        # RELATIVE vs PARENT
        # -----------------------------
        if relative:
            relation = relative.get("relation", "Relative")
            dna = relative.get("dna", "").upper()

            if "mother" in relation.lower():
                base = mother
                base_label = "Mother"
            else:
                base = father
                base_label = "Father"

            yield self._send(f"=== {relation} vs {base_label} ===")
            time.sleep(0.4)

            limit = min(len(base), len(dna)) - self.window_size + 1

            while self.current_index < limit:
                while self.is_paused:
                    time.sleep(0.2)

                i = self.current_index
                b = base[i:i + self.window_size]
                r = dna[i:i + self.window_size]

                yield self._send(f"Position {i}")
                yield self._send(f"{base_label}: {b}")
                yield self._send(f"{relation}: {r}")
                yield self._send("")

                time.sleep(0.2)
                self.current_index += 1

        yield self._send("=== Streaming completed ===")
