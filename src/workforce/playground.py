import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import numpy as np
import pandas as pd
import altair as alt
import json
from utils.data import load_full_data
from utils.eda_plot import set_up_altair_browser
# 'All staff total','Professional qualified total','Support staff total'
VARIABLES_TOTAL = ['HCHS doctors - All grades',
             'Non doctor clinical staff total','Support to clinical staff total','Infrastructure support total']

VARIABLES_DOCTORS = ['All grades','Consultant','Associate Specialist','Specialty Doctor'
,'Staff Grade'
,'Specialty Registrar'
,'Core Training'
,'Foundation Doctor Year 2'
,'Foundation Doctor Year 1'
,'Hospital Practitioner / Clinical Assistant'
,'Other HCHS Doctor Grades']

VARIABLES_DOCTORS = ['HCHS doctors - ' + x for x in VARIABLES_DOCTORS]
VARIABLES_CLINICAL = ['Nurses & health visitors',
       'Midwives', 'Ambulance staff',
       'Scientific, therapeutic & technical staff']
VARIABLES_SUPPORT = [
       'Support to clinical staff total',
       'Support to doctors, nurses & midwives', 'Support to ambulance staff',
       'Support to ST&T staff',
       'Senior managers', 'Managers', 'Central functions',
       'Hotel, property & estates'
       ]

def reduce_data(data,variable):
    df = data[['Country or Area', variable]]
    total = df[variable].sum()
    df['percentage']=(df[variable]/total)
    df_above_1_per = df[(df['percentage']>0.005) & (df['Country or Area'].isna()==False)]
    df_other = df[(df['percentage']<0.005) | df['Country or Area'].isna()]
    df_new = df_above_1_per
    df_new.sort_values(by=variable, ascending = False,inplace=True)

    df_new.loc[len(df_new)]={'Country or Area':"Other",variable:round(df_other[variable].sum(),2),'percentage':df_other['percentage'].sum()}
    return df_new

def create_full_chart_data(data,variables):
    dict_list = []
    for variable in variables:
        df = reduce_data(data,variable)
        dict = create_dict(df, variable)
        dict_list.append(dict)

    return dict_list

def create_dict(df,variable):
    dict = {'staff': variable}
    dict['total']=round(df[variable].sum(),2)
    dict['data']=[]
    df_other = df[df['Country or Area']=='Other'] 
    df = df[df['Country or Area']!='Other'] 
    df.sort_values(by=variable,ascending=False,inplace=True)
    df = pd.concat([df,df_other])
    for index, row in df.iterrows():
        dict['data'].append({'Country or Area':row['Country or Area'],'number':row[variable]})            
    
    return dict

def pie_chart(data,variable):
    title=variable
    # title = create_title(data,variable)
    df = reduce_data(data,variable)
    chart = alt.Chart(df,title=alt.Title(title,anchor='start')).mark_arc().encode(
        theta=alt.Theta(field=variable, type="quantitative"),
        color = alt.Color('Country or Area').legend(orient="left") ,
        order = alt.Order(variable,sort='descending'),
        tooltip = alt.Tooltip(['Country or Area', variable])

    )
    return chart

def multiple_pie_chart(data,variables):
    chart_list=[]
    for variable in variables:
        chart_list.append(pie_chart(data,variable))
    chart = alt.vconcat(*chart_list)
    return chart

def calculate_percentage(data,VARIABLES_TOTAL):
    df = data[VARIABLES_TOTAL]
    df.set_index(data['Country or Area'], inplace=True)

    for variable in VARIABLES_TOTAL:
        total = data[variable].sum()
        df[variable]=df[variable]/total

    return df

def main():
    set_up_altair_browser()
    data = load_full_data()
    json_list = create_full_chart_data(data,VARIABLES_TOTAL)
    with open('marimekko_data.json','w') as file:
        json.dump(json_list,file)


    multiple_pie_chart(data,VARIABLES_TOTAL).show()
    df = calculate_percentage(data,VARIABLES_TOTAL)
    print('finish')
main()