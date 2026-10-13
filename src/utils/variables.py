"""
In this module, global variables are declared. 
"""




# GP practice level
# SEE references Overall Definitions
PATH_gp_practice = '/data/General Practice_June 2026 Practice Level_Detailed.csv'
PATH_gp_practice_jupyter = '/../../data/General Practice_June 2026 Practice Level_Detailed.csv'
PATH_imd = '/data/GP_imd_Oct_2025.csv'
PATH_workforce = '/data/NHS_workforce.csv'
PATH_geoscheme = '/data/UN_geoscheme.csv'
PATH_nationality = '/data/FCDO_Geographical_Names_Index_July2026.csv'
GP_practice_variables = ['PRAC_CODE','PRAC_NAME','TOTAL_PATIENTS','GP_SOURCE','TOTAL_GP_HC',
                         'TOTAL_GP_FTE','TOTAL_GP_HC_COQ_UK','TOTAL_GP_HC_COQ_EEA','TOTAL_GP_HC_COQ_EUROPE_OTHER','TOTAL_GP_HC_COQ_AFRICA','TOTAL_GP_HC_COQ_ASIA_OTHER',
                         'TOTAL_GP_HC_COQ_ASIA_SOUTH','TOTAL_GP_HC_COQ_AUS_PAC','TOTAL_GP_HC_COQ_CEN_AMERICA','TOTAL_GP_HC_COQ_NORTH_AMERICA','TOTAL_GP_HC_COQ_SOUTH_AMERICA',
                         'TOTAL_GP_HC_COQ_MIDDLE_EAST','TOTAL_GP_HC_COQ_UNKNOWN']


GP_practice_variables_rename = ['PRAC_CODE','PRAC_NAME','PATIENTS','GP_HC',
                         'GP_FTE','UK','EEA','EUROPE_OTHER','AFRICA','ASIA_OTHER',
                         'ASIA_SOUTH','AUS_PAC','CEN_AMERICA','NORTH_AMERICA','SOUTH_AMERICA',
                         'MIDDLE_EAST','UNKNOWN']


GP_practice_variables_quantitative =['PATIENTS','GP_HC',
                         'GP_FTE','UK','EEA','EUROPE_OTHER','AFRICA','ASIA_OTHER',
                         'ASIA_SOUTH','AUS_PAC','CEN_AMERICA','NORTH_AMERICA','SOUTH_AMERICA',
                         'MIDDLE_EAST','UNKNOWN','patient_FTE_ratio','foreign_quali','foreign_quali_prop']

qualification_origin = ['UK','EEA','EUROPE_OTHER','AFRICA','ASIA_OTHER',
                         'ASIA_SOUTH','AUS_PAC','CEN_AMERICA','NORTH_AMERICA','SOUTH_AMERICA',
                         'MIDDLE_EAST','UNKNOWN']

workforce_variables = ['Data type', 'Nationality group', 'Nationality', 'HCHS doctors - Consultant',
                        'HCHS doctors - Associate Specialist', 'HCHS doctors - Specialty Doctor', 'HCHS doctors - Staff Grade',
                        'HCHS doctors - Specialty Registrar', 'HCHS doctors - Core Training', 'HCHS doctors - Foundation Doctor Year 2', 
                        'HCHS doctors - Foundation Doctor Year 1', 'HCHS doctors - Hospital Practitioner / Clinical Assistant', 
                        'HCHS doctors - Other HCHS Doctor Grades', 'Nurses & health visitors', 'Midwives', 'Ambulance staff',
                        'Scientific, therapeutic & technical staff', 'Support to doctors, nurses & midwives', 'Support to ambulance staff',
                        'Support to ST&T staff', 'Senior managers', 'Managers', 'Central functions', 'Hotel, property & estates', 'Unknown classification']
workforce_variable_group =[{'Professionally qualified clinical staff':['HCHS doctors - Consultant',
                        'HCHS doctors - Associate Specialist', 'HCHS doctors - Specialty Doctor', 'HCHS doctors - Staff Grade',
                        'HCHS doctors - Specialty Registrar', 'HCHS doctors - Core Training', 'HCHS doctors - Foundation Doctor Year 2', 
                        'HCHS doctors - Foundation Doctor Year 1', 'HCHS doctors - Hospital Practitioner / Clinical Assistant', 
                        'HCHS doctors - Other HCHS Doctor Grades', 'Nurses & health visitors', 'Midwives', 'Ambulance staff',
                        'Scientific, therapeutic & technical staff']},
                        {'Support to clinical staff':['Support to doctors, nurses & midwives', 'Support to ambulance staff','Support to ST&T staff']},
                        {'NHS infrastructure support':['Senior managers', 'Managers', 'Central functions', 'Hotel, property & estates']},
                        {'Unknown classification':['Unknown classification']}]
workforce_variables_quan =  ['HCHS doctors - Consultant',
                        'HCHS doctors - Associate Specialist', 'HCHS doctors - Specialty Doctor', 'HCHS doctors - Staff Grade',
                        'HCHS doctors - Specialty Registrar', 'HCHS doctors - Core Training', 'HCHS doctors - Foundation Doctor Year 2', 
                        'HCHS doctors - Foundation Doctor Year 1', 'HCHS doctors - Hospital Practitioner / Clinical Assistant', 
                        'HCHS doctors - Other HCHS Doctor Grades', 'Nurses & health visitors', 'Midwives', 'Ambulance staff',
                        'Scientific, therapeutic & technical staff', 'Support to doctors, nurses & midwives', 'Support to ambulance staff',
                        'Support to ST&T staff', 'Senior managers', 'Managers', 'Central functions', 'Hotel, property & estates', 'Unknown classification']