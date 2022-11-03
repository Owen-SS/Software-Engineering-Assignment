from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os
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

app.run(host='0.0.0.0', port=8080)