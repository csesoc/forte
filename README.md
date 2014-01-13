forte
=====
## Developer setup for Ubuntu
###Core packages
You'll need git and pip to set up the project.
```
$ sudo apt-get install git pip sqlite3
```

###Setting up virtualenv
You only if you work on a lot of Python projects. It's mainly to deal with package dependencies. Not completely necessary, but its a good habit.
```
$ sudo apt-get install virtualenv
$ virtualenv <environment_name>
$ . <environment_name>/bin/activate
```
You'll see in your terminal that it has \<environment_name\> at the start of the line

### Installing packages
Run the following
```
$ git clone git@github.com:csesoc/forte.git
$ cd forte
$ echo "export FORTE_CONFIG=development_config.py" >> ~/.bashrc
$ bash
$ pip install -r requirements.txt
```

### Database Setup
```
$ python
> from forte import init_db
> init_db()
> exit()
$ sqlite3 forte.db < schema.sql
```

### Email setup
Open up development_config.py with a text editor and change
```
MAIL_USERNAME = 'YOUR_GMAIL_ACCOUNT'
MAIL_PASSWORD = 'YOUR_GMAIL_PASSWORD'
```
to your person email address.

### Running the server
To start the server, run
```
$ python forte.py
```
Enjoy!

#### PSA: Use 2 space indents (NO TABS PLEASE)

