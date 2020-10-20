import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

create_table_participants = "CREATE TABLE IF NOT EXISTS participants (id INTEGER PRIMARY KEY, id_events INTEGER, id_users INTEGER)"
cursor.execute(create_table_participants)

create_table_users = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text, last_name text, first_name text, dob text, gender text, occupation text, address text, email text, phone_number INTEGER)"
cursor.execute(create_table_users)

connection.commit()
connection.close()