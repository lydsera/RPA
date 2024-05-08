import sys
import json
import os

args = json.loads(sys.stdin.read())

filepath = args[0]
print(filepath)
os.startfile(filepath)