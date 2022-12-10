from flask import Flask, render_template, jsonify, request, make_response, session
from datetime import datetime
import pandas as pd

#Makes other file accessible for import
#THIS_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
#sys.path.append(THIS_DIRECTORY + "\static\sql")

from database import *


app = Flask('app')

#This secret key is needed for session
app.secret_key = "oiahjds9fuhaushdfuygasducnjxzn"


def datefix(raw_dob):

  #print(raw_dob)
  ym = "{year}-{month}".format(month=raw_dob.month, year=raw_dob.year)
  d = "{day}".format(day=raw_dob.day)
  if int(d) < 10:
    d = "-0"+ str(d)
  dob = ym + d

  return dob



@app.route('/')
def hello_world():
  return render_template('login.html')

@app.route('/jobview')
def render_jobview():
  return render_template('jobview.html')

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

@app.route('/createjoblisting')
def createjoblisting():
  return render_template('jobcreation.html')

# Uploading data - - -

testData = ["Epic Job","Permanent","20th sepetember","10,000", "Poole","To be a pimp","youmum@yourdad.com"]
testDataOne = ["Tiago is gay","Permanently","1 Dec","-10,000,000", "This is a tough challenge to take on.. It takes a real fairy to do this role.","You pimp","tiago@bumbing.cum"]

@app.route("/student/upload", methods=['PUT']) # Student details uploader - - -
def studentUpload():

  file_csv = "./data/student/student-account.csv"
  print("student upload")
  messageOK = jsonify(data="Account created!", message= 200, error="None")
  messageFail = jsonify(data="None", message=500, error="Unkown")
  
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
  file_csv = "./data/company/company-account.csv"
  print("Company upload")
  messageOK = jsonify(data="Account created!", message= 200, error="None")
  messageFail = jsonify(data="None", message=500, error="Unkown")
  
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

  
@app.route("/joblisting/upload", methods=["PUT"])
def jobListingUpload():
  messageOK = jsonify(data="Job listing created!", message=200, error="None")
  messageFail = jsonify(data="None", message=500, error="None")

  print("called")

  try:
    req = request.get_json()
    print(req)
    dbMessage = db.addJobListing(req)
  except Exception as e:
    messageFail = jsonify(data="None", message=500, error=str(e))
    return messageFail
  
  if dbMessage[0]:
    return messageOK
  else:
    messageFail = jsonify(data="Failed to upload job listing", message=500, error=dbMessage[2])
    return messageFail

@app.route("/login", methods=['PUT']) # Device uploader - - -
def login():
  messageOK = jsonify(data="Login success", message=200, error = "None")
  messageFail = jsonify(data="login failed", message=500, error = "None")

  try:
    req = request.get_json()
  except Exception as e:
    return jsonify(data="Login failed", message=500, error=e)

  username = req[0]
  password = req[1]
  account = req[2]

  print(account)

  file_path = ["data/student/student-account.csv", "data/company/company-account.csv"]
  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  session['account'] = account
  try:
    for row in data:
      username_check = row[1]
      password_check = row[2]

      if username_check == username:
        if password_check == password:
          id = row[0]
          session['ID'] = id
          return messageOK
  except Exception as e:
    return jsonify(data="Login failed", message=500, error=e)
  return messageFail


@app.route("/displaydetails", methods =['PUT'])
def getdetails():

  account = session.get('account')
  print(account)
  file_path = ["data/student/student-account.csv", "data/company/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  try:
    df = pd.read_csv(file_csv)
    data = df.to_numpy()
  except Exception as e:
    return jsonify(data='failed to load account data', message=500, error = str(e))
  
  return jsonify(data=data, message=200, error="None")

@app.route("/display/jobview", methods = ['GET'])
def displayJobview():

  data = [testData, testDataOne]

  return jsonify(data=data, status=200, error="none")

@app.route("/update/details", methods =['PUT'])
def updateDetails():
  found = False

  account = session.get('account')
  file_path = ["data/student/student-account.csv", "data/company/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  try:
    df = pd.read_csv(file_csv)
    data = df.to_numpy()
  except:
    return messageFail

  messageOK = jsonify(message="Update complete", status=200)
  messageFail = jsonify(message="Update failed", status=500)

  req = request.get_json()

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
      x = 0
      for i in row:
        if x >=3 and x <=11:
          replace.append(req[x-2])
        else:
          replace.append(i)
        x+=1
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

  messageOK = jsonify(data="Account deleted", status=200, error="None")
  messageFail = jsonify(data="Account deletion failed", status=404, error="Could not find account")

  id = session.get('ID')
  account = session.get('account')

  file_path = ["data/student/student-account.csv", "data/company/company-account.csv"]
  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  try:
    df = pd.read_csv(file_csv)
    data = df.to_numpy()
  except:
    return messageFail

  index = 0
  found = False

  for row in data:
    id_check = row[0]

    if id_check == id:
      found = True
      df = df.drop([index])
    index+=1
  
  if found:
    df.to_csv(file_csv, encoding='utf-8', index=False)
    return messageOK
  
  return messageFail
  




app.run(host='0.0.0.0', port=8080)