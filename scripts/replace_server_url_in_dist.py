#!/usr/bin/python3

# This scripts replaces the url to lookup radio servers in the 
# js file present in the 'dist' folder. This is needed because the
# server is on 'http', instead of 'https'.

# ------------------------------------------
# In order to install the dependencies, type: 
# => pip3 install -r requirements.txt
# ------------------------------------------

import requests
import random
import glob

# Stores mirrors to all radio api browsers servers
RADIO_MIRRORS = "http://all.api.radio-browser.info/json/servers"

# Request mirror servers
headers = {'Accept': 'application/json'}
all_servers = requests.get(RADIO_MIRRORS, headers=headers).json()

# Choose a random server name and format it
random_server_name = all_servers[random.randint(0, len(all_servers) - 1)]["name"]
server_filename = f"https://{random_server_name}/json/servers"

# Get the bundled js filename
[js_filename] = glob.glob('dist/assets/index-*.js')

# Get file content and replace it
with open(js_filename) as file:
    contents = file.read()
    contents = contents.replace(RADIO_MIRRORS, f"https://{random_server_name}/json/servers")

# Write the replaced contents
with open(js_filename, "w") as file:
    file.write(contents)

print("------>> REPLACE SERVER URL <<------")
print(f"Replace: {RADIO_MIRRORS}")
print(f"By: {server_filename}")
print(f"In: {js_filename}")
print("------------------------------------")