#!/usr/bin/env python3
import csv
import os
from services.mongo_client import get_database


def load_csv(file_path):
    with open(file_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return [row for row in reader]


def seed_disease_markers(db, base_dir):
    file_path = os.path.join(base_dir, 'data', 'clinvar_markers.csv')
    marker_docs = []
    for row in load_csv(file_path):
        disease = (row.get('disease') or '').strip()
        marker = (row.get('marker') or '').strip()
        if disease and marker:
            marker_docs.append({
                'disease': disease,
                'marker': marker.upper(),
            })

    if marker_docs:
        db.disease_markers.delete_many({})
        db.disease_markers.insert_many(marker_docs)
        print(f'Seeded {len(marker_docs)} disease markers.')
    else:
        print('No disease markers found to seed.')


def seed_disease_info(db, base_dir):
    file_path = os.path.join(base_dir, 'data', 'disease_info.csv')
    info_docs = []
    for row in load_csv(file_path):
        disease = (row.get('disease') or '').strip()
        description = (row.get('description') or '').strip()
        if disease:
            info_docs.append({
                'disease': disease,
                'description': description,
            })

    if info_docs:
        db.disease_info.delete_many({})
        db.disease_info.insert_many(info_docs)
        print(f'Seeded {len(info_docs)} disease info entries.')
    else:
        print('No disease info found to seed.')


if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db = get_database()
    seed_disease_markers(db, base_dir)
    seed_disease_info(db, base_dir)
    print('MongoDB seed completed.')
