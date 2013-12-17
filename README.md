forte
=====
## Developer setup for Ubuntu
###Core packages
You'll need git and pip to set up the project.
```
sudo apt-get install git pip sqlite3
```

###Setting up virtualenv
You only if you work on a lot of Python projects. It's mainly to deal with package dependencies. Not completely necessary, but its a good habit.
```
sudo apt-get install virtualenv
virtualenv <environment_name>
. <environment_name>/bin/activate
```
You'll see in your terminal that it has <environment_name> at the start of the line

### Final part
Run the following
```
git clone git@github.com:csesoc/forte.git
cd forte
pip install -r requirements.txt
sqlite3 forte.db < schema.sql
```
And you're done! To start the server, run
```
python forte.py
```
Enjoy!

PSA: Use 2 space indents (NO TABS)

