import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import time
import json
import pandas as pd

from utils_data import load_full_data, read_json
PATH = './data/world.json'

def add_variables_to_geo(geodf,data):
    existing_id_list = list(data['id_code'])
    vars_to_remove = ['Data \nmonth', 'Data type','Nationality group','Nationality','Name','id_code']
    vars_to_add = [x for x in list(data.columns) if x not in vars_to_remove]
    for area in geodf['features']:
        if area['id'] in existing_id_list:
           for var in vars_to_add:
               area[var]=data.loc[data['id_code']==area['id'],var].values[0]

        #    area['Geographical subregion']=data.loc[data['id_code']==area['id'],'Geographical subregion'].values[0]

    return geodf

def main():
    data = load_full_data()
    geodf = read_json(PATH)
    geodf_updated = add_variables_to_geo(geodf,data)

    with open('./data/geodata_updated.json', 'w') as f:
        f.write(json.dumps(geodf_updated))
    print('finish')
main()