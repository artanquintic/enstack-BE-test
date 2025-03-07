
# BE Test - Allure Tanquintic

## 1. Shuffle pseudocode
Using the Fisher Yates Shuffle:

```
a ← array to shuffle
i ← 0
n ← length of a
for i from n−1 down to 1 do
     j ← random integer such that 0 ≤ j ≤ i
     swap a[j] and a[i]
```
Please see `shuffle.py` for the python implementation

## 2. Rewrite json data structure
Please see `restructure.js` 

## 3. Server Infrastructure Diagram
### Accelerometer 
![accelerometer-diagram](https://github.com/user-attachments/assets/584705fa-f604-4f6f-83cb-0acce6afddc7)

### Mobile Devices
![mobile-diagram](https://github.com/user-attachments/assets/3fdf2831-8f54-4669-b94a-d8c6b4dadb0e)

## 4. API server
Please see `letters-api`. To run, use `npm start`



