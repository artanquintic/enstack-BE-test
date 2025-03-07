from random import random
from math import floor

def construct_tuple():
  tupleList = []
  for y in range(0,4):
    for x in range(0,14):
      tupleList.append((x,y))
  return tupleList

# Fisher-Yates shuffle: O(n) time complexity
def shuffle(list):
  for i in range(len(list)-1, 0, -1):
    rand = floor(random() * (i + 1))
    [list[i], list[rand]] = [list[rand], list[i]]


tupleList = construct_tuple()
print(f"Before shuffle: {tupleList}" )
shuffle(tupleList)
print(f"After shuffle: {tupleList}" )