#!/usr/bin/env python3
import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.query_service import QueryService
from services.session_store import session_store

if __name__ == "__main__":
    # Read input from stdin (JSON with sequences and question)
    input_data = json.load(sys.stdin)
    if 'father' in input_data:
        session_store.store_father(input_data['father'])
    if 'mother' in input_data:
        session_store.store_mother(input_data['mother'])
    if 'relative' in input_data:
        session_store.store_relative(input_data['relative']['relation'], input_data['relative']['sequence'])
    
    question = input_data.get('question', '')
    service = QueryService()
    result = service.answer(question)
    print(json.dumps(result))</content>
<parameter name="filePath">c:\Users\subas\OneDrive\Desktop\CNA App\genomics_detector\backend\scripts\query.py