import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import time
import json
import pandas as pd

from utils.variables import PATH_workforce, PATH_nationality, PATH_geoscheme

def correct_nationality_area(data):
    #  congo could be drc or congo, but we deems as congo here - 258
    # Korean could be south or north korean, likely to drop afterwards
    # channel islands - 2 island 4.92 FTE. not sure how to draw yet
    # Netherlands Antilles - 8.57
    # Korean 25.52

    correction_list =   pd.DataFrame([{'Nationality':'Anguillan', 'id_code': 'AI', 'Name': 'Anguilla', 'Territory':'British'},
    {'Nationality':'Antiguan', 'id_code': 'AG', 'Name': 'Antigua and Barbuda'},
    {'Nationality':'Aruban', 'id_code': 'AW', 'Name': 'Aruba', 'Territory':'Netherlands'},
    {'Nationality':'Basotho', 'id_code': 'LS', 'Name': 'Lesotho'},
    {'Nationality':'Bermudian', 'id_code': 'BM', 'Name': 'Bermuda', 'Territory':'British'},
    {'Nationality':'Bissau-Guinean', 'id_code': 'GW', 'Name': 'Guinea-Bissau'},
    {'Nationality':'Bosnian', 'id_code': 'BA', 'Name': 'Bosnia and Herzegovina'},
    {'Nationality':'United Kingdom', 'id_code': 'GB', 'Name': 'United Kingdom'},
    {'Nationality':'British Virgin Islander', 'id_code': 'VG', 'Name': 'British Virgin Islands', 'Territory':'British'},
    {'Nationality':'Burkinabe', 'id_code': 'BF', 'Name': 'Burkina Faso'},
    {'Nationality':'Burundi', 'id_code': 'BI', 'Name': 'Burundi'},
    {'Nationality':'Caymanian', 'id_code': 'KY', 'Name': 'Cayman Islands', 'Territory':'British'},
    {'Nationality':'Channel Islander', 'id_code': 'GG/JE', 'Name':'Channel Islands', 'Territory':'Kind of British'},
    {'Nationality':'Cocos Islander', 'id_code': 'CC', 'Name': 'Cocos Islands', 'Territory':'Australian'},
    {'Nationality':'Congolese', 'id_code': 'CD', 'Name': 'Congo'},
    {'Nationality':'Dutch Antillean', 'id_code': 'NONE', 'Name': 'Netherlands Antilles', 'Territory':'Dutch'},
    {'Nationality':'Ecuadorian', 'id_code': 'EC', 'Name': 'Ecuador'},
    {'Nationality':'Emirati', 'id_code': 'AE', 'Name': 'United Arab Emirates'},
    {'Nationality':'Falkland Islander', 'id_code': 'FK', 'Name':'Falkland Islands', 'Territory':'British'},
    {'Nationality':'Faroese', 'id_code': 'FO', 'Name':'Faroe Islands', 'Territory':'Denmark'},
    {'Nationality':'French Guianese', 'id_code': 'GF', 'Name':'French Guiana', 'Territory':'French'},
    {'Nationality':'Gibraltar', 'id_code': 'GI', 'Name':'Gibraltar', 'Territory':'British'},
    {'Nationality':'Greenlandic', 'id_code': 'GL', 'Name':'Greenland', 'Territory':'Denmark'},
    {'Nationality':'Guadeloupian', 'id_code': 'GP', 'Name':'Guadeloupe', 'Territory':'French'},
    {'Nationality':'Guamanian', 'id_code': 'GU', 'Name':'Guadeloupe', 'Territory':'French'},
    {'Nationality':'Hong Kong (British/Chinese)', 'id_code': 'HK', 'Name':'Hong Kong', 'Territory':'Chinese'},
    {'Nationality':'Kazakhstani', 'id_code': 'KZ', 'Name': 'Kazakhstan'},
    {'Nationality':'Kittitian', 'id_code': 'KN', 'Name': 'Saint Kitts and Nevis'},
    {'Nationality':'Korean', 'id_code': 'NONE', 'Name': 'North or South Korea'},
    {'Nationality':'Kyrgyzstani', 'id_code': 'KG', 'Name': 'Kyrgyzstan'},
    {'Nationality':'Laotian', 'id_code': 'LA', 'Name': 'Laos'},
    {'Nationality':'Liswati', 'id_code': 'SZ', 'Name': 'Eswatini'},
    {'Nationality':'Luxembourg', 'id_code': 'LU', 'Name': 'Luxembourg'},
    {'Nationality':'Macanese', 'id_code': 'MO', 'Name': 'Macao','Territory':'Chinese'},
    {'Nationality':'Malagasy', 'id_code': 'MG', 'Name': 'Madagascar'},
    {'Nationality':'Liswati', 'id_code': 'SZ', 'Name': 'Eswatini'},
    {'Nationality':'Manx', 'id_code': 'IM', 'Name': 'Isle of Man','Territory':'British'},
    {'Nationality':'Montserratian', 'id_code': 'MS', 'Name': 'Montserrat','Territory':'British'},
    {'Nationality':'New Caledonian', 'id_code': 'NC', 'Name': 'New Caledonia','Territory':'French'},
    {'Nationality':'Motswana', 'id_code': 'BW', 'Name': 'Botswana'},
    {'Nationality':'Myanmar', 'id_code': 'MM', 'Name': 'Myanmar'},
    {'Nationality':'Ni-Vanuatu', 'id_code': 'VU', 'Name': 'Vanuatu'},
    {'Nationality':'Niuean', 'id_code': 'NU', 'Name': 'Niue'},
    {'Nationality':'Norfolk Islander', 'id_code': 'NF', 'Name': 'Norfolk Island','Territory':'Australia'},
    {'Nationality':'Pitcairn Islander', 'id_code': 'PN', 'Name': 'Pitcairn','Territory':'British'},
    {'Nationality':'Puerto Rican', 'id_code': 'PR', 'Name': 'Puerto Rico','Territory':'United States'},
    {'Nationality':'Reunionese', 'id_code': 'RE', 'Name': 'Reunion','Territory':'French'},
    {'Nationality':'Saint Helenian', 'id_code': 'SH', 'Name': 'Saint Helena, Ascension and Tristan da Cunha','Territory':'British'},
    {'Nationality':'Saint Lucian', 'id_code': 'LC', 'Name': 'Saint Lucia','Territory':'British'},
    {'Nationality':'Saint Vincentian', 'id_code': 'VC', 'Name': 'Saint Vincent and the Grenadines','Territory':'United States'},
    {'Nationality':'Salvadoran','id_code': 'SV', 'Name': 'El Salvador'},
    {'Nationality':'Seychellois','id_code': 'SC', 'Name': 'Seychelles'},
    {'Nationality':'Taiwanese','id_code': 'TW', 'Name': 'Taiwan'},
    {'Nationality':'Timorese','id_code': 'TL', 'Name': 'Timor-Leste'},
    {'Nationality':'Tajikistani','id_code': 'TJ', 'Name': 'Tajikistan'},
    {'Nationality':'Tobagonian','id_code': 'TT', 'Name': 'Trinidad and Tobago'},
    {'Nationality':'Trinidadian','id_code': 'TT', 'Name': 'Trinidad and Tobago'},
    {'Nationality':'Turkish','id_code': 'TR', 'Name': 'Turkey'},
    {'Nationality':'Uzbekistani','id_code': 'UZ', 'Name': 'Uzbekistan'},
    {'Nationality':'Namibian','id_code': 'NA', 'Name': 'Namibia'},
    {'Nationality':'Uzbekistani','id_code': 'UZ', 'Name': 'Uzbekistan'},
    {'Nationality':'Virgin Islander', 'id_code': 'VI', 'Name': 'United States Virgin Islands','Territory':'United States'},
    ])
    
    correction_list = correction_list[['Nationality','id_code','Name']]

    merged_df = pd.merge(data, correction_list, on='Nationality',how='left')
    merged_df['id_code']= merged_df['id_code_x'].combine_first(merged_df['id_code_y'])
    merged_df['Name']= merged_df['Name_x'].combine_first(merged_df['Name_y'])

    merged_df = merged_df.drop(columns = ['id_code_x','id_code_y','Name_x','Name_y'])
    return merged_df

def read_geoscheme(path = PATH_geoscheme):
    data = pd.read_csv(os.getcwd()+ path)
    data['Country or Area'] = data['Country or Area'].str.strip()
    data['Geographical subregion'] = data['Geographical subregion'].str.strip()
    data['Continental region'] = data['Continental region'].str.strip()

    # data = data[['Country code','Name','Citizen names ']]
    # data.columns=['id_code','Name','Nationality']
    return data

def read_nationality(path = PATH_nationality):
    data = pd.read_csv(os.getcwd()+ path)
    data = data[['Country code','Name','Citizen names ']]
    data.columns=['id_code','Name','Nationality']
    return data

def read_workforce_data(path = PATH_workforce):
    data = pd.read_csv(os.getcwd()+ path)
    data = data.reset_index(drop=True)
    data = data.dropna(axis=0, how='all')
    # use FTE instead of headcount
    data = data[data['Data type']=='FTE']
    # combined unknown and unknown rest of the world to one unknown
    unknown = data[data['Nationality'].isin(['Unknown - Rest of World','Unknown'])]
    data = data[~data['Nationality'].isin(['Unknown - Rest of World','Unknown'])]
    unknown_sum = unknown.sum()
    unknown_sum['Data \nmonth'] = 'Jun-26'
    unknown_sum['Data type'] = 'FTE'
    unknown_sum['Nationality group'] = 'Unknown'
    unknown_sum['Nationality'] = 'Unknown'
    unknown_sum = pd.DataFrame([unknown_sum])
    data = pd.concat([data,unknown_sum])

    # just use united kingdom to cover all devolved nations
    data = data[~data['Nationality'].isin(['British','English','Northern Irish','Scottish','Welsh'])]
    data.loc[data['Nationality group']=='United Kingdom','Nationality']='United Kingdom'
    
    # get rid of the all nationalities summation
    data = data[data['Nationality']!='All nationalities']

    data.rename(columns={'All staff groups': 'All staff total',
                         'All staff groups.1':'Professional qualified total',
                         'All staff groups.2':'Support staff total',
                         'All staff groups.3':'Infrastructure support total'},
                         inplace=True
                         )
    data['Non doctor clinical staff total']= data['Professional qualified total'] - data['HCHS doctors - All grades']
    data['Non doctor clinical staff total']= data['Non doctor clinical staff total'].round(2)
    return data

def match_nationality_country(workforce, nationality):
    # existing_nationality = workforce['Nationality'].unique()
    # existing_nationality = existing_nationality[1:-3]
    # data = pd.DataFrame({'nationality':existing_nationality})
    data = pd.merge(workforce, nationality, on='Nationality',how='left')
     
    return data
def load_full_data():
    workforce = read_workforce_data()
    nationality = read_nationality()
    geoscheme = read_geoscheme(path = PATH_geoscheme)
    data = match_nationality_country(workforce, nationality)
    data = correct_nationality_area(data)
    data = pd.merge(data, geoscheme,left_on= 'Name', right_on='Country or Area', how='left')
    return data

def read_json(path):
    # load the json
    with open(path, 'r') as json_file:
        data = json.load(json_file)
    return data

