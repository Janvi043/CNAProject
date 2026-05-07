#!/usr/bin/env python3
import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.disease_detection_service import DiseaseDetectionService
from services.priority_alert_service import PriorityAlertService
from services.session_store import session_store

if __name__ == "__main__":
    # Read input from stdin (JSON with sequences)
    input_data = json.load(sys.stdin)
    if 'father' in input_data:
        session_store.store_father(input_data['father'])
    if 'mother' in input_data:
        session_store.store_mother(input_data['mother'])
    if 'relative' in input_data:
        session_store.store_relative(input_data['relative']['relation'], input_data['relative']['sequence'])
    
    # Ensure analysis is run before alerts are generated
    DiseaseDetectionService().analyze()
    service = PriorityAlertService()
    result = service.generate_alerts()
    print(json.dumps(result))
