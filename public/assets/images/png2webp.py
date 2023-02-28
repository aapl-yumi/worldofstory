from glob import glob
import os 
import numpy as np
from PIL import Image
import PIL

def dir_scan(path):
  files = []
  for i in os.scandir(path):
    if i.is_file() and i.path.endswith(".png"):
      files.append(i.path)
    elif i.is_dir():
      for j in dir_scan(i.path):
        files.append(j)
  return files

files = dir_scan(".")

for i in files:
  im = Image.open(i)
  im = im.convert("RGB")
  im.save(i.replace("png", "webp"), "webp")
  print(i)
