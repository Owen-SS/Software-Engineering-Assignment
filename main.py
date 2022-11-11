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
   

@app.route("/displaydetails", methods =['GET'])
def getdetails():
  print("Getting details")

  root_path =os.path.realpath(os.path.dirname(__file__)) 
  file_path = os.path.join(root_path,"data","student/accounts/student-account.json")

  with open(file_path,'r') as file:
    file_contents = json.load(file)
    print(file_contents)
    
    response = make_response(
    file_contents,
    200
    )
    return response

  return "Error reading file"

@app.route("/displaydetails_V2", methods =['PUT'])
def getdetailsV2():
  found = False
  file_csv = "data/student/accounts/student-account.csv"

  messageOK = jsonify(message="Error retrieving data")
  messageFail = jsonify(message="login failed")

  req = request.get_json()

  df = pd.read_csv(file_csv)
  data = df.to_numpy()

  id = req[0]

  data_send = []

  for row in data:
    id_raw = row[0]

    id_check = id_raw[2:-1]

    if id_check == id:
      found = True

      i = 1
      while i <= 10:
        if i == 1:
          data_raw = row[i]
          data_app = data_raw[1:-1]
          data_send.append(data_app)
        else:
          data_raw = row[i]
          data_app = data_raw[2:-1]
          data_send.append(data_app)
        i+=1
        

  if found == True:
    data_ready = ''
    print(data_send)
    for x in data_send:
      data_ready += x + ', '
    print(data_ready)

    return jsonify(data = data_ready)
  else:
    return messageFail

app.run(host='0.0.0.0', port=8080)