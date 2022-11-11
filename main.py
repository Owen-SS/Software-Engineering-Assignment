from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os, csv
import pandas as pd
app = Flask('app')

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route('/employer')
def render_employer():
  return render_template('employer.html')

@app.route('/student')
def render_student():
  return render_template('student.html')

@app.route('/login')
def render_loginpage():
  return render_template('login.html')

@app.route('/signup')
def render_signuppage():
  return render_template('signup.html')

@app.route('/error')
def render_error():
  return render_template('error.html')

# - - - - Json update - - - -
  
def jsonUpdate(file_csv, file_json, req): # Update Json - - -
  print("jsonUpdate")
  
  jsonArray = []
  
  with open(file_csv, 'a') as fd:
    fd.write(str(req) + "\n")
  
  with open(file_csv, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)
    
    for row in csvReader:
      jsonArray.append(row)
      
    with open(file_json, 'w', encoding='utf-8') as jsonf:
      jsonString = json.dumps(jsonArray, indent=4)
      jsonf.write(jsonString)
      
  return

# Uploading data - - -

@app.route("/student/upload", methods=['PUT']) # Device uploader - - -
def studentUpload():
  file_csv = "data/student/accounts/student-account.csv"
  file_json = "data/student/accounts/student-account.json"
  messageOK = jsonify(message="Upload complete!")
  messageFail = jsonify(message="Uploading failed...")
  print('saving upload')
  
  req = request.get_json()

  if request.is_json:
    jsonUpdate(file_csv, file_json, req)
    return messageOK, 200

  else:
    return messageFail, 400

@app.route("/company/upload", methods=['PUT']) # Device uploader - - -
def companyUpload():
  file_csv = "data/company/accounts/company-account.csv"
  file_json = "data/company/accounts/company-account.json"
  messageOK = jsonify(message="Upload complete!")
  messageFail = jsonify(message="Uploading failed...")
  print('saving upload')
  
  req = request.get_json()

  if request.is_json:
    jsonUpdate(file_csv, file_json, req)
    return messageOK, 200

  else:
    return messageFail, 400

@app.route("/checkDetails", methods=['PUT']) # Device uploader - - -
def checkDetails():
  file_csv = "data/student/accounts/student-account.csv"

  messageOK = jsonify(message="Error")
  messageFail = jsonify(message="login failed")

  req = request.get_json()

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  username = req[0]
  password = req[1]

  for row in data:
    username_raw = row[10]
    password_raw = row[11]

    username_check = username_raw[2:-1]
    password_check = password_raw[2:-2]

    if username_check == username:
      if password_check == password:
        messageOK = jsonify(message="Welcome - " + str(row[3]))
        return messageOK


  return messageFail

@app.route("/displayDetails", methods=['PUT']) # Display details - - -
def displayDetails():
  None

app.run(host='0.0.0.0', port=8080)