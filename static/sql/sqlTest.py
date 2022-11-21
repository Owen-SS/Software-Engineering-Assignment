import mysql.connector

HOST = "127.0.0.1" #Get IP
USER = "root"
PASSWORD = "SKS_Accounting_148" #Need to reset this lmao
DATABASE = 'Assignment'

mydb = mysql.connector.connect(
        host = HOST,
        user = USER,
        password = PASSWORD,
        database = DATABASE)

mycursor = mydb.cursor()
query = "DESCRIBE student" # Enters your query into sql
mycursor.execute(query) # Executes the query
dirList = mycursor.fetchall()# Returns the values returned in sql in a list format
columns = [el[0] for el in dirList] # Organises 

print(columns)