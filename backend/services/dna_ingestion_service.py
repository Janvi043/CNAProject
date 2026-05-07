from services.session_store import session_store


class DNAIngestionService:
    def ingest_father(self, sequence: str):
        session_store.store_father(sequence)

    def ingest_mother(self, sequence: str):
        session_store.store_mother(sequence)
