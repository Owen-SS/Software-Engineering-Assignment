from flask import Flask, render_template, jsonify, request, make_response, session
from datetime import datetime
import pandas as pd
import os

#Makes other file accessible for import
#THIS_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
#sys.path.append(THIS_DIRECTORY + "\static\sql")



app = Flask('app')

#This secret key is needed for session
app.secret_key = "oiahjds9fuhaushdfuygasducnjxzn"


def datefix(raw_dob):

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

@app.route('/company/jobview')
def companyJobview():
  return render_template('company-jobview.html')

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

@app.route('/forgotPassword')
def forgotPassword():
  return render_template('forgotPassword.html')

@app.route('/employerJobView')
def employerJobView():
  return render_template('employerJobView.html')

# Uploading data - - -

@app.route("/student/upload", methods=['PUT']) # Student details uploader - - -
def studentUpload():

  file_csv = "./data/student/student-account.csv"
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

  directory = session.get("ID")
  parent_dir = "data/company/storage"
  file = "/job-listings.csv"
  headings = ['id','companyName','jobName', 'contType', 'startDate', 'salary', 'postcode', 'job_desc', 'contact']
  
  path = os.path.join(parent_dir, directory)
  csv_file = str(path) + file

  try:
    df = pd.read_csv(csv_file)
  except:
    print("Creating path - " + str(path))
    os.mkdir(path)
    f = open(csv_file, "x")
    for x in headings:
      if x == 'contact':
        f.write(x)
      else:
        f.write(x +',')
    f.close()

  try:
    df = pd.read_csv(csv_file)
    req = request.get_json()

  except Exception as e:
    messageFail = jsonify(data="None", message=500, error=str(e))
    return messageFail
  
  df = pd.read_csv(csv_file)
  df.loc[len(df)] = req
  if request.is_json:
    df.to_csv(csv_file, encoding='utf-8', index=False)
    return messageOK
  else:
    messageFail = jsonify(data="Failed to upload job listing", message=500, error="Unkown")
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
        if str(password_check) == str(password):
          id = row[0]
          session['ID'] = id
          return messageOK
  except Exception as e:
    return jsonify(data="Login failed", message=500, error=e)
  return messageFail


@app.route("/displaydetails", methods =['GET'])
def getdetails():

  account = session.get('account')
  id = session.get('ID')

  file_path = ["data/student/student-account.csv", "data/company/company-account.csv"]

  if account == "student":
    file_csv = file_path[0]
  elif account == "company":
    file_csv = file_path[1]
  
  try:
    df = pd.read_csv(file_csv)
    data = df.to_numpy()
  except Exception as e:
    return jsonify(data='failed to load account data', status=500, error = str(e))

  dataToSend = []
  for list in data:
    if list[0] == id:
      for x in list:
        dataToSend.append(x)
      dataToSend[2] = "" # Hides password ;)
      return jsonify(data=dataToSend, status=200, error="None")
  
  return jsonify(data="None", status=404, error="Unable to find account")
  

@app.route("/display/jobview", methods = ['GET'])
def displayJobview():

  filePath = "data/company/storage/"
  dataStore = []

  for folder in os.listdir(filePath):
    file_path = os.path.join(filePath, folder + "/job-listings.csv")
    try:
      if os.path.isfile(file_path) or os.path.islink(file_path):
        df = pd.read_csv(file_path)
        csvData = df.to_numpy()
        for list in csvData:
          dataStore.append(list)

    except:
      None
  
  data = []

  for list in dataStore:
    childArray = []
    for x in list:
      childArray.append(x)
    data.append(childArray)

  return jsonify(data=data, status=200, error="none")

@app.route("/display/company/jobview", methods = ['GET'])
def displayCompanyJobview():

  filePath = "data/company/storage/"
  dataStore = []

  id = session.get('ID')

  for folder in os.listdir(filePath):
    if folder == id:
      file_path = os.path.join(filePath, folder + "/job-listings.csv")
      try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
          df = pd.read_csv(file_path)
          csvData = df.to_numpy()
          for list in csvData:
            dataStore.append(list)

      except:
        None
  
  data = []

  for list in dataStore:
    childArray = []
    for x in list:
      childArray.append(x)
    data.append(childArray)

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
          replace.append(req[x-3])
        else:
          replace.append(i)
        x+=1
      
    index+=1

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

@app.route("/delete/joblisting", methods =['PUT'])
def deleteJoblisting():

  messageOK = jsonify(data="Account deleted", status=200, error="None")
  messageFail = jsonify(data="Account deletion failed", status=404, error="Could not find account")

  req = request.get_json()

  joblistingId = req[0]
  companyId = session.get('ID')

  filePath = "data/company/storage/"
  dataStore = []

  for folder in os.listdir(filePath):
    if folder == companyId:
      file_path = os.path.join(filePath, folder + "/job-listings.csv")
      try:
        if os.path.isfile(file_path) or os.path.islink(file_path):
          df = pd.read_csv(file_path)
          csvData = df.to_numpy()
          for list in csvData:
            dataStore.append(list)

      except:
        return messageFail  

  index = 0
  found = False

  for row in dataStore:
    id_check = row[0]

    if id_check == joblistingId:
      found = True
      df = df.drop([index])
    index+=1
  
  if found:
    df.to_csv(file_path, encoding='utf-8', index=False)
    return messageOK
  
  return messageFail

@app.route("/apply", methods=['PUT'])
def apply():
  messageOK = jsonify(data="Application successful!", message=200, error="None")
  messageFail = jsonify(data="Failed to apply", message=500, error="None")

  compAppFilePath = "data/company/applications.csv"

  req = request.get_json()

  status = "Applied"
  studentId = session.get("ID")
  jobId = req[0]

  companyData = [studentId, jobId, status]
  studentData = [jobId, status]

  directory = session.get("ID")
  parent_dir = "data/student/storage/"
  file = "/job-applications.csv"
  headings = ['jobId','status']
  
  path = os.path.join(parent_dir, directory)
  csv_file = str(path) + file

  try:
    df = pd.read_csv(csv_file)
  except:
    print("Creating path - " + str(path))
    os.mkdir(path)
    f = open(csv_file, "x")
    for x in headings:
      if x == 'status':
        f.write(x)
      else:
        f.write(x +',')
    f.close()

  try:
    company_df = pd.read_csv(compAppFilePath)
    df = pd.read_csv(csv_file)
  except Exception as e:
    messageFail = jsonify(data="Failed to apply", message=500, error=str(e))
    return messageFail
  
  df.loc[len(df)] = studentData
  company_df.loc[len(company_df)] = companyData
  if request.is_json:
    df.to_csv(csv_file, encoding='utf-8', index=False)
    company_df.to_csv(compAppFilePath, encoding='utf-8', index=False)
    return messageOK
  else:
    messageFail = jsonify(data="Failed to apply", message=500, error="Unkown")
    return messageFail

@app.route("/display/application/status", methods=['GET'])
def applicationStatus():

  filePath = "data/company/storage/"
  dataStore = []

  for folder in os.listdir(filePath):
    file_path = os.path.join(filePath, folder + "/job-applications.csv")
    try:
      if os.path.isfile(file_path) or os.path.islink(file_path):
        df = pd.read_csv(file_path)
        csvData = df.to_numpy()
        for list in csvData:
          dataStore.append(list)
  
    except:
      None
  
  data = []

  for list in dataStore:
    childArray = []
    for x in list:
      childArray.append(x)
    data.append(childArray)

  return jsonify(data=data, status=200, error="none")

app.run(host='0.0.0.0', port=8080)