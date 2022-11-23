from flask import Flask, render_template, jsonify, request, make_response, session
import sys, json, os, csv
#from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pandas as pd

#Makes other file accessible for import
#THIS_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
#sys.path.append(THIS_DIRECTORY + "\static\sql")

from database import *


app = Flask('app')

#This secret key is needed for session
app.secret_key = "oiahjds9fuhaushdfuygasducnjxzn"


#Our database connection variables
HOST = "aws-database.cwjsojfqpy2s.eu-west-2.rds.amazonaws.com" #Server endpoint
USER = "SE_DB" 
PASSWORD = "software-database" #Need to reset password lol
DATABASE = 'assignment'

db = Database(HOST,USER,PASSWORD,DATABASE)

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

@app.route("/student/upload", methods=['PUT']) # Student details uploader - - -
def studentUpload():
  print("Student upload")
  messageOK = jsonify(data="Account created!", message=200, error="None")
  messageFail = jsonify(data="None", message=500, error="None")

  try:
    req = request.get_json()
    # print("Adding student account: \n", req)
    dbMessage = db.addStudent(req)

    #Account added successfully
    if dbMessage[0]:
      return messageOK
    #Account failed to add
    else:
      messageFail = jsonify(data="None", message=500, error=dbMessage[2])
      return messageFail

  except Exception as e:
    messageFail = jsonify(data="None", message=500, error=str(e))
    return messageFail


@app.route("/company/upload", methods=['PUT']) # Company details uploader - - -
def companyUpload():
  messageOK = jsonify(data="Account created!", message=200, error="None")
  messageFail = jsonify(data="None", message=500, error="None")


  try:
    req = request.get_json()
    dbMessage = db.addEmployer(req)

  except Exception as e:
    messageFail = jsonify(data="None", message=500, error=str(e))
    return messageFail
  
  if dbMessage[0]:
    return messageOK
  else:
    messageFail = jsonify(data="None", message=500, error=dbMessage[2])
    return messageFail


    


@app.route("/login", methods=['PUT']) # Device uploader - - -
def login():
  messageOK = jsonify(data="Login success", message=200)
  messageFail = jsonify(data="login failed", message=404)

  #Have database
  #Read accounts data
  #Search through accounts for mathcing username
  #Check if password matches
  #Set current user or display incorrect login details message

  req = request.get_json()

  #caching currentUserID var so can be accessed on all web pages
  id = db.login(req[0], req[1], req[2])
  session['ID'] = id

  if id != -1:
    return messageOK
  else:
    return messageFail



@app.route("/displaydetails", methods =['PUT'])
def getdetails():

  id = session.get('ID') #Also need to cache accountType
  accountType = "student" #Need to find account type from cache

  try:
    #Get user's data from correlating userID
    account_data = db.getAccountData(id, accountType)
    account_data = account_data[0]
    data_list = []

    for x in account_data:
      data_list.append(x)

    if accountType == "student":
      dob = datefix(data_list[7])
      data_list[7] = dob
    
    #This sends account data website
    return jsonify(data = data_list)
  except Exception as e:
    return jsonify(data='failed to load account data', message=404, error = str(e))


@app.route("/update/details", methods =['PUT'])
def updateDetails():
  found = False

  account = session.get('account')
  file_path = ["data/student/accounts/student-account.csv", "data/company/accounts/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  messageOK = jsonify(message="Update complete!")
  messageFail = jsonify(message="Update failed...")

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
  messageOK = jsonify(message="Account deleted!")
  messageFail = jsonify(message="Account deletion failed...")

  id = session.get('ID')
  accountType = "student" #Need to find account type from cache
  
  try:
    db.deleteAccount(id, accountType)

    return messageOK
  except:
    return messageFail



app.run(host='0.0.0.0', port=8080)