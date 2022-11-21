import mysql.connector

class Database(object):
    """
        Used to contact, retrieve, and manipulate mySQL database

        :param host: The IPV4 or endpoint where the database is being hosted as a string
        :param user: The username used to access the database
        :param password: The password used to access the database
        :param database: The name of schema being accessed within the database

        """
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.schema = self.connect()

    
    def connect(self):
        """
        Connects to database

        :return schema: schema that is used within the database
        """

        schema = mysql.connector.connect(
        host = self.host,
        user = self.user,
        password = self.password,
        database = self.database)

        return schema


    def executeQuery(self, query):
        """
        Executes query in the database

        :param query: string of SQL query to execute

        :return outputList: Output that is returned from the executed query within the database
        :return error: List of error information
        """
        error = [0,"SQL State", "Error Message  (No Error Detected)"]

        try:
            mycursor = self.schema.cursor()
            mycursor.execute(query) # Executes the query
            outputList = mycursor.fetchall()# Returns the values returned in sql in a list format
            print("executed: ", query)
        except mysql.connector.Error as err:
            error = [err.errno, err.sqlstate, err.msg]
            outputList = [err.errno, err.sqlstate, err.msg]
            """
            print("ERROR: the following query is invalid: " + query)
            print("Error Code:", err.errno)
            print ("SQLSTATE value:", err.sqlstate) # SQLSTATE value
            print ("Error message:", err.msg) #SQL message
            """
            

        return outputList, error


    def commit(self):
        """
        Commits changes made to the database
        """

        self.schema.commit()


    #Specific database queries for our website
    #Addding to database

    def addStudent(self, studentData):
        """
        Adds a student account the student table in the schema

        :param studentData: list of student account data to be added

        :return added: Boolean to state whether account was added or not
        """

        added = [True, "Account added successfully"]

        query = """INSERT INTO student 
        (username,password,email,phonenumber,name,surname,dob,address1,address2,address3,postcode)
        VALUES
        ("{username}", "{password}", "{email}", "{phonenumber}", "{name}", 
        "{surname}", "{dob}", "{address1}", "{address2}", "{address3}", "{postcode}");""".format( 
        username=studentData[0], password=studentData[1], email=studentData[2], phonenumber=studentData[3], 
        name=studentData[4], surname=studentData[5], dob=studentData[6], address1=studentData[7], 
        address2=studentData[8], address3=studentData[9], postcode=studentData[10])

        queryResponse, error = self.executeQuery(query)

        if error[0] == 1062:
            print("\nACCOUNT NOT ADDED: This account has not been added due to duplicates already existing in the database...\n" + error[2])
            added = [False, "Account not added due to " + error[2]]

        self.commit()

        return added


    def addEmployer(self, employerData):
        """
        Adds an employer account to the employer table in the schema

        :param employerData: list of employerData to be added
        """

        query = """INSERT INTO student 
        (username,password,email,phonenumber,name,surname,dob,address1,address2,address3,postcode)
        VALUES
        ("a", "a", "a", 09876543234, "a", 
        "a", "2022-11-23", "a", "a", "a", "a")"""

        queryResponse = self.executeQuery(query)
        print(queryResponse)

        self.commit()

    
    #Reading data

    def login(self, username, password, account):
        """
        Validates login of a specific username and password by comparing them to accounts stored in the database

        :param username: string to be found within the accounts table
        :param password: string to be compared to password of account data with matching username found within the accounts table

        :return loginID: The unique ID of the account from the accounts table
        """

        loginID = -1

        #Retrieves data
        if account == "student":
            query = "SELECT idstudent, username, password FROM student;" #Create amalgamation of student and employer to hold all logins
        else:
            query = "SELECT idemployer, username, password FROM employer;" #Create amalgamation of student and employer to hold all logins
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
        """
        Retrieves account data from the accounts table for a specific account

        :param accountID: Specific and unique identifier for the account within the accounts table

        :return accountData: Tuple of account data
        """
        accountData = ["Default data"]

        if accountID != -1:
            try:
                query = """SELECT * FROM student WHERE idstudent={ID};""".format(ID=accountID)
                accountData = self.executeQuery(query)
            except:
                print("Error in finding account details of Account ID:", accountID)

        return accountData








#For testing
if __name__ == "__main__":

    #Our database connection variables
    HOST = "aws-database.cwjsojfqpy2s.eu-west-2.rds.amazonaws.com" #Server endpoint
    USER = "SE_DB" 
    PASSWORD = "software-database" #Need to reset password lol
    DATABASE = 'assignment'

    #creating database object
    db = Database(HOST, USER, PASSWORD, DATABASE)
    
    #executing SQL query through object
    query = """INSERT INTO student 
        (username,password,email,phonenumber,name,surname,dob,address1,address2,address3,postcode)
        VALUES
        ("a", "a", "a", 09876543234, "a", "a", "2022-11-23", "a", "a", "a", "a")"""

    db.addStudent(["a", "a", "a", "09876543234", "a", "a", "2022-11-23", "a", "a", "a", "a"])

    output, e = db.executeQuery(query)
    print("output", output)
    print(e)
