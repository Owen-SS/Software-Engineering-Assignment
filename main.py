from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os
app = Flask('app')

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route("/api/Quotes", methods =['GET'])
def Quotes():
  print("Getting quotes on api")

  root_path =os.path.realpath(os.path.dirname(__file__)) 
  file_path = os.path.join(root_path,"data","Quotes.json")

  with open(file_path,'r') as file:
    file_contents = json.load(file)
    
    response = make_response(
    file_contents,
    200
    )
    return response

  return "Error reading file"

@app.route("/api/Quotes", methods=['PUT'])
def upload():
  
    print('saving Quotes on api')

    if request.is_json:
        json_data = request.json
    
        root_path = os.path.realpath(os.path.dirname(__file__))
        file_path = os.path.join(root_path, "data", "Quotes.json")
    
        with open(file_path, 'w') as file:
            json.dump(json_data, file)
        
            return make_response("Complete", 200)
    
        return "Error reading file", 500
    else:
        return "Invalid Data Sent", 400
  

app.run(host='0.0.0.0', port=8080)