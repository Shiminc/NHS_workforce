import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import numpy as np
import pandas as pd
import altair as alt
from utils.data import load_full_data
from utils.eda_plot import set_up_altair_browser

VARIABLES_TOTAL = ['All staff total','Professional qualified total','HCHS doctors - All grades',
             'Non doctor clinical staff total', 'Support staff total','Support to clinical staff total','Infrastructure support total']

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

def pie_chart(data,variable):
    title=variable
    # title = create_title(data,variable)
    df = data[['Country or Area', variable]]
    df.sort_values(by=variable, ascending = False,inplace=True)
    
    # data = data[data[category]!='United Kingdom']
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
    multiple_pie_chart(data,VARIABLES_TOTAL).show()
    df = calculate_percentage(data,VARIABLES_TOTAL)
    print('finish')
main()