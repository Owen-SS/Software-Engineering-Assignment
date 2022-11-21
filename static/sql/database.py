import mysql.connector

class Database(object):
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.schema = self.connect()


    def connect(self):
        schema = mysql.connector.connect(
        host = self.host,
        user = self.user,
        password = self.password,
        database = self.database)

        return schema


    def executeQuery(self, query):
        print("executing: ", query)

        try:
            mycursor = self.schema.cursor()
            mycursor.execute(query) # Executes the query
            outputList = mycursor.fetchall()# Returns the values returned in sql in a list format
        except mysql.connector.errors.ProgrammingError:
            outputList = ["ERROR: the following query is invalid: " + query]
            print(outputList)

        return outputList


    def commit(self):
        self.schema.commit()


    #Specific database queries for our website
    #Addding to database

    def addStudent(self, studentData):
        query = """INSERT INTO student 
        (username,password,email,phonenumber,name,surname,dob,address1,address2,address3,postcode)
        VALUES
        ("{username}", "{password}", "{email}", "{phonenumber}", "{name}", 
        "{surname}", "{dob}", "{address1}", "{address2}", "{address3}", "{postcode}");""".format(#studentData[0], 
        username=studentData[1], password=studentData[2], email=studentData[3], phonenumber=studentData[4], 
        name=studentData[5], surname=studentData[6], dob=studentData[7], address1=studentData[8], 
        address2=studentData[9], address3=studentData[10], postcode=studentData[11])

        self.executeQuery(query)

        self.commit()


    def addEmployer(self, employerData):
        query = """INSERT INTO employer 
        (username,password,email,phonenumber,companyname,address1,address2,address3,postcode)
        VALUES
        ("{username}", "{password}", "{email}", "{phonenumber}", "{companyname}", 
        "{address1}", "{address2}", "{address3}", "{postcode}");""".format(#studentData[0], 
        username=employerData[1], password=employerData[2], email=employerData[3], phonenumber=employerData[4], 
        companyname=employerData[5], address1=employerData[6], address2=employerData[7], address3=employerData[8], 
        postcode=employerData[9])

        self.executeQuery(query)

        self.commit()

    
    #Reading data

    def login(self, username, password):
        loginID = -1

        #Retrieves data
        query = "SELECT idstudent, username, password FROM student;" #Create amalgamation of student and employer to hold all logins
        accountData = self.executeQuery(query)

        #Checks for username in account data and validates account's existence
        for row in range(len(accountData)):
            if username == accountData[row][1]:
                print(username, "exists in accounts database")

                if password == accountData[row][2]:
                    print("password matches username")
                    loginID = accountData[row][0]
                    break
                    
        return loginID

    def getAccountData(self, accountID):
        accountData = ["Default data"]

        try:
            query = """SELECT * FROM student WHERE idstudent={ID};""".format(ID=accountID)
            accountData = self.executeQuery(query)
        except:
            print("Error in finding account details of Account ID:", accountID)

        return accountData








#For testing
if __name__ == "__main__":

    #Our database connection variables
    HOST = "127.0.0.1" #Get actual IP
    USER = "root"
    PASSWORD = "SKS_Accounting_148"
    DATABASE = 'Assignment'

    #creating database object
    db = Database(HOST, USER, PASSWORD, DATABASE)
    
    #executing SQL query through object
    query = "DESCRIBE student"
    output = db.executeQuery(query)

    print(output)
