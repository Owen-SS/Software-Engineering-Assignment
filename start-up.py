import time, subprocess, sys

def install(package):
    print("\nInstalling - " + package + "\n")

    time.sleep(0.5)

    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def checkImports():
    print("\n\nChecking imports...")
    time.sleep(0.2)
    try:
        from flask import Flask
        print("\n\nAll is good!")
    except Exception as e:
        time.sleep(1)
        print("Looks like flask isn't installed!")
        ask = input("Would you like us to install it?\n- [y/n]")

        if ask == "y":
            install("flask")
        else:
            print("No worries!")
            time.sleep(0.5)
            print("Please us\n\npip install flask\n\nTo install the module!")

def main():
    print("- - - Welcome - - -")
    time.sleep(0.5)
    print("Lets check to see if your system is ready to run our code")
    time.sleep(1)
    checkImports()
