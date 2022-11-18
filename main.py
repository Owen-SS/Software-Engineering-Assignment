from flask import Flask, render_template, jsonify, request, make_response, session
import sys, json, os, csv
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pandas as pd



app = Flask('app')
#This secret key is needed for session
app.secret_key = "oiahjds9fuhaushdfuygasducnjxzn"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class User(db.Model):
  id = db.Column(db.Integer, primary_key= True)
  username = db.Column(db.String(20), unique = True, nullable = False )
  email = db.Column(db.String(120), unique = True, nullable = False )
  image_file = db.Column(db.String(20), nullable = False, default= 'default.jpg')
  password = db.Column(db.String(60), nullable = False)
  posts = db.relationship('Post', backref='author',lazy= True)


  def __repr__(self):
    return f"User ('{self.username}', '{self.email}', '{self.image_file}')"

class Post(db.Model):
  id = db.Column(db.Integer, primary_key= True)
  title = db.Column(db.String(100), nullable = False)
  date_posted = db.Column(db.DateTime,nullable=False, default = datetime.utcnow)
  content = db.Column(db.Text, nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

  def __repr__(self):
    return f"Post ('{self.title}', '{self.date_posted}', '{self.content}')"




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

@app.route("/login", methods=['PUT']) # Device uploader - - -
def login():

  file_csv = ["data/student/accounts/student-account.csv", "data/company/accounts/company-account.csv"]
  accounts = ['student', 'company']
  messageFail = jsonify(data="login failed", message=200)

  req = request.get_json()
  i = 0
  for x in file_csv:
    df = pd.read_csv(x)
    data = df.to_numpy()

    username = req[0]
    password = req[1]

    for row in data:
      username_check = row[1]
      password_check = row[2]

      if username_check == username:
        if password_check == password:
          session['ID'] = row[0]
          session['account'] = accounts[i]
          messageOK = jsonify(data="Welcome - " + str(row[5]), message=200)
          return messageOK
    i+=1


  return messageFail


@app.route("/displaydetails", methods =['PUT'])
def getdetails():
  found = False
  account = session.get('account')
  file_path = ["data/student/accounts/student-account.csv", "data/company/accounts/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  messageFail = jsonify(data='None', message=404)

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  id = session.get('ID')

  data_send = []

  for row in data:
    id_check = row[0]

    if id_check == id:
      found = True

      for i in row:
        data_send.append(i)

  if found == True:

    return jsonify(data = data_send)
  else:
    return messageFail

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
  found = False

  account = session.get('account')
  id = session.get('ID')
  
  file_path = ["data/student/accounts/student-account.csv", "data/company/accounts/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  messageOK = jsonify(data="Deleted account",message=200)
  messageFail = jsonify(data='None', message=404)

  index = 0
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