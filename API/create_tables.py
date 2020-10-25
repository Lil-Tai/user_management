import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()


create_table_users = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username text, password text, last_name text, first_name text, dob text, gender text, occupation text, address text, email text, phone_number INTEGER)"
cursor.execute(create_table_users)

create_table_events = "CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY , event_name text, starting_time datetime, ending_time datetime, image text, discount_rate INTEGER, discount_rules INTEGER, price INTEGER)"
cursor.execute(create_table_events)

create_table_participants = "CREATE TABLE IF NOT EXISTS participants (id INTEGER PRIMARY KEY , id_events INTEGER, id_users INTEGER, CONSTRAINT fk_events FOREIGN KEY(id_events) REFERENCES events(id) ON DELETE CASCADE)"
cursor.execute(create_table_participants)

connection.commit()
connection.close()