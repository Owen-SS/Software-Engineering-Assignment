from flask import Flask, render_template, jsonify, request, make_response, session
import sys, json, os, csv
import pandas as pd
app = Flask('app')
#This secret key is needed for session
app.secret_key = "oiahjds9fuhaushdfuygasducnjxzn"

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

# Uploading data - - -

@app.route("/student/upload", methods=['PUT']) # Student details uploader - - -
def studentUpload():
  file_csv = "data/student/accounts/student-account.csv"
  messageOK = jsonify(data="Account created!", message= 200)
  messageFail = jsonify(data="None", message=500)
  
  req = request.get_json()

  try:
    df = pd.read_csv(file_csv)
  except Exception:
    print("Create a file!")

  df.loc[len(df)] = req

  if request.is_json:
    df.to_csv(file_csv, encoding='utf-8', index=False)
    return messageOK

  else:
    return messageFail

@app.route("/company/upload", methods=['PUT']) # Company details uploader - - -
def companyUpload():
  print("company upload")
  file_csv = "data/company/accounts/company-account.csv"

  messageOK = jsonify(data="Account created!", message= 200)
  messageFail = jsonify(data="None", message=500)
  
  req = request.get_json()

  try:
    df = pd.read_csv(file_csv)
  except Exception:
    print("Create a file!")

  df.loc[len(df)] = req

  if request.is_json:
    df.to_csv(file_csv, encoding='utf-8', index=False)
    return messageOK

  else:
    return messageFail

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
    username_check = row[10]
    password_check = row[11]

    if username_check == username:
      if password_check == password:
        session['ID'] = row[0]
        messageOK = jsonify(message="Welcome - " + str(row[3]))
        return messageOK


  return messageFail


@app.route("/displaydetails", methods =['PUT'])
def getdetails():
  found = False
  file_csv = "data/student/accounts/student-account.csv"

  messageFail = jsonify(data='None', message=404)

  req = request.get_json()

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  id = session.get('ID')

  data_send = []

  for row in data:
    id_check = row[0]

    if id_check == id:
      found = True

      i = 1
      while i <= 10:
        data_app = row[i]
        data_send.append(data_app)
        i+=1
        

  if found == True:

    return jsonify(data = data_send)
  else:
    return messageFail

@app.route("/student/update", methods =['PUT'])
def updateDetails():
  found = False
  file_csv = "data/student/accounts/student-account.csv"

  messageOK = jsonify(message="Update complete!")
  messageFail = jsonify(message="Update failed...")

  req = request.get_json()

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  print("req")
  print(req)

  id = session.get('ID')
  index = 0
  replace = []
  for row in data:
    id_check = row[0]

    if id_check == id:
      found = True
      df = df.drop([index])
      i = 0
      x = 1
      while i <=11:
        if i >=1 and i <=9:
          replace.append(req[i])
        else:
          data_edit = row[i]
          replace.append(data_edit)
        i+=1
    index+=1
  print(replace)

  df.loc[len(df)] = replace

  if found == True:
    df.to_csv(file_csv, encoding='utf-8', index=False)
    return messageOK
  else:
    return messageFail

@app.route("/delete/account", methods =['PUT'])
def deleteAccount():
  found = False
  file_csv = "data/student/accounts/student-account.csv"

  messageOK = jsonify(data="Deleted account",message=200)
  messageFail = jsonify(data='None', message=404)

  req = request.get_json()

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  id = session.get('ID')
  index = 0
  replace = []
  for row in data:
    id_check = row[0]

    if id_check == id:
      found = True
      df = df.drop([index])
    index+=1

  if found == True:
    df.to_csv(file_csv, encoding='utf-8', index=False)
    return messageOK
  else:
    return messageFail


app.run(host='0.0.0.0', port=8080)