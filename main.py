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

"""
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


#Added code by owen may not work
#Code does not work
#class UserStudent(db.Model):
  #id = db.Column(db.Integer, primary_key= True)
  #firstName =  db.Column(db.String(20), unique = True, nullable = False )
  #secondName = db.Column(db.String(20), unique = True, nullable = False )
  #email = db.Column(db.String(120), unique = True, nullable = False )
  #phoneNumber =  db.Column(db.String(11), unique = True, nullable = False )
  #dateOfBirth = db.Column(db.String(10), unique = True, nullable = False )
  #addressOne = db.Column(db.String(30), unique = True, nullable = False )
  #addressTwo = db.Column(db.String(30), unique = True, nullable = False )
  #addressThree = db.Column(db.String(30), unique = True, nullable = False )
  #postcode = db.Column(db.String(10), unique = True, nullable = False )

  #username = db.Column(db.String(20), unique = True, nullable = False )
  #password = db.Column(db.String(60), nullable = False)
  #passwordMatch = db.Column(db.String(60), nullable = False)


  def __repr__(self):
    return f"UserStudent('{self.firstName}', '{self.secondName}', '{self.email}', '{self.phoneNumber}', '{self.dateOfBirth}', '{self.addressOne}', '{self.addressTwo}', '{self.addressThree}', '{self.postcode}', '{self.username}', '{self.password}', '{self.passwordMatch}')"


app.route("/Userdata",methods = ["POST"])
#Code works
uname="JENER"
uemail="BBB@GMAIL.COM"
upassword = "thepassword"

user1 = User(username= uname, email= uemail,password = upassword)
app.app_context().push()
db.session.add(user1)
db.session.commit()
#code does not work below
#app.route("/Userdatafromform", methods = ["POST"])
#def userdatafromform():
  #fname= request.form.id['fName']
  #sname= request.form.id['sName']
 # uemail=request.form.id["email"]
  #pnumber=request.form["phoneNum"]
 # dateob=request.form.id["dob"]
 # add1=request.form.id["AD1"]
 # add2=request.form.id["AD2"]
 # add3=request.form.id["AD3"]
  #pc=request.form.id["postcode"] 
  #uname=request.form.id["username"] 
  #upassword=request.form.id["password"]
  #upasswordm=request.form.id["password_match"]

  #userInput = UserStudent(firstName= fname , secondName = sname, email= uemail, phoneNumber= pnumber , dateOfBirth= dateob , addressOne= add1, addressTwo = add2, addressThree = add3, postcode=pc, username=uname, password=upassword, passwordMatch=upasswordm)
  #app.app_context().push()
  #db.session.add(userInput)
  #db.session.commit()

"""

currentUserID = -1


#Our database connection variables
HOST = "10.126.188.233" #Get actual IP #Currently run locally on my laptop
USER = "Tiago" 
PASSWORD = "SKS_Accounting_148" #Need to reset password lol
DATABASE = 'Assignment'

db = Database(HOST,USER,PASSWORD,DATABASE)


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
  print("Student upload")
  messageOK = jsonify(data="Account created!", message= 200)
  messageFail = jsonify(data="None", message=500)

  try:
    req = request.get_json()
    print("Adding student account: \n", req)
    db.addStudent(req)
    return messageOK
  except:
    return messageFail


@app.route("/company/upload", methods=['PUT']) # Company details uploader - - -
def companyUpload():
  print("company upload")
  messageOK = jsonify(data="Account created!", message= 200)
  messageFail = jsonify(data="None", message=500)


  try:
    req = request.get_json()
    print("Adding employer account: \n", req)
    db.addEmployer(req)
    return messageOK
  except:
    return messageFail


@app.route("/login", methods=['PUT']) # Device uploader - - -
def login():
  messageOK = jsonify(data="Logged in!", message= 200)
  messageFail = jsonify(data="login failed", message=200)

  #Have database
  #Read accounts data
  #Search through accounts for mathcing username
  #Check if password matches
  #Set current user or display incorrect login details message

  try:
    req = request.get_json()
    print("Checking account details: ", req)
    
    #Setting global currentUserID var so can be accessed on all web pages
    global currentUserID
    currentUserID = db.login(req[0], req[1])

    if currentUserID != -1:
      #Do epic stuff here to reroute to correct account
      return messageOK
    else:
      return messageFail
  except:
    return messageFail



@app.route("/displaydetails", methods =['PUT'])
def getdetails():
  messageFail = jsonify(data='failed to load account data', message=404)

  try:
    #Get user's data from correlating userID
    account_data = db.getAccountData(currentUserID)
    print(account_data)

    #Pass data to website
    data_to_send = jsonify(account_data)
    print(data_to_send)

    #Ask someone to help to pass to site because IDK how rn

    #This sends account data website
    return jsonify(data = data_to_send)
  except:
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