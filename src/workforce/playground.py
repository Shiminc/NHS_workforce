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

def multiple_bar_chart(data,category,variables):
    chart_list=[]
    for variable in variables:
        chart_list.append(bar_chart(data,category,variable))
    chart = alt.vconcat(*chart_list)
    return chart

def create_title(data, variable):
    uk_number  = data[variable].loc[data['Country or Area']=='United Kingdom']
    the_rest = data[variable].loc[data['Country or Area']!='United Kingdom']
    sum_number = uk_number.sum() + the_rest.sum()
    title = f'From UK: {uk_number.sum():.2f} ({uk_number.sum()/sum_number:.2%}), The rest: {the_rest.sum():.2f} ({the_rest.sum()/sum_number:.2%})'
    return title

def bar_chart(data,category,variable):
    title = create_title(data,variable)
    data = data[data[category]!='United Kingdom']
    chart = alt.Chart(data,title=alt.Title(title,anchor='start')).mark_bar().encode(
        x = alt.X(category).sort('-y'),
        y = alt.Y(variable),
        color = alt.Color('Continental region').legend(orient="left") ,
        tooltip = alt.Tooltip([variable])

    )
    return chart

def report_quantile(data):
    quantile_list = np.array(range(1,10))/10
    return data['All staff total'].quantile(quantile_list)

def main():
    set_up_altair_browser()
    data = load_full_data()
    # see the log scale
    # data.iloc[:,4:-5] = data.iloc[:,4:-5].transform(np.log)
    # data.replace([np.inf, -np.inf], 0, inplace=True)
    category='Country or Area'
    category='Geographical subregion'
    category='Continental region'
    multiple_bar_chart(data,category,VARIABLES_TOTAL).show()
    multiple_bar_chart(data,category,VARIABLES_DOCTORS).show()
    multiple_bar_chart(data,category,VARIABLES_CLINICAL).show()
    multiple_bar_chart(data,category,VARIABLES_SUPPORT).show()
    print('finish')
main()