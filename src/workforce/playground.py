import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import time
import json
import pandas as pd

from utils.data import load_full_data
from utils.eda_plot import set_up_altair_browser
def main():
    set_up_altair_browser()
    data = load_full_data()
    print('finish')
main()