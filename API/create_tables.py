import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()



create_table = "CREATE TABLE IF NOT EXISTS participants (id INTEGER PRIMARY KEY, id_events INTEGER, id_users INTEGER, event_name text, starting_time text, ending_time text, image text, discount_rate text, discount_rules text, price real)"
cursor.execute(create_table)



connection.commit()

connection.close()