import sys
import pandas as pd
import requests

api_key = ''

def get_coordinates(address):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    
    # Prepare parameters for the API request
    params = {
        'address': address,
        'key': api_key,
    }

    try:
        # Make the API request
        response = requests.get(base_url, params=params)
        data = response.json()

        # Check if the request was successful
        if data['status'] == 'OK':
            # Extract latitude and longitude from the response
            location = data['results'][0]['geometry']['location']
            latitude = location['lat']
            longitude = location['lng']
            
            return latitude, longitude
        else:
            print(f"Error: {data['status']}")
            return None
    except Exception as e:
        print(f"Error: {str(e)}")
        return None

# Read the input file
input_file = sys.argv[1]
df = pd.read_csv(input_file, sep=';')
print(f"Loaded input file with {len(df)} rows")

# Replace column names with the ones from the mapping file with format 'old_name;new_name'
mapping_file = sys.argv[2]
mapping = pd.read_csv(mapping_file, sep=';')
print(f"Loaded mapping file with {len(mapping)} rows")

for i in range(len(mapping)):
    old_name = mapping.at[i, 'old_name']
    new_name = mapping.at[i, 'new_name']
    df.rename(columns={old_name: new_name}, inplace=True)

print("Replaced column names")

# Split the Localization column into separate columns
df[['voivodeship', 'county', 'city', 'address']] = df['localization'].str.split('> ', expand=True)
print("Split Localization column")

broken_rows = []
for i in range(100):#len(df)):
    print(f"Processing row {i+1} of {len(df)}")

    if df.at[i, 'localization'] is None:
        broken_rows.append(df.at[i])
        continue

    address = df.at[i, 'localization']
    lat, lon = get_coordinates(address) or (None, None)

    if lat is not None and lon is not None:
        df.at[i, 'latitude'] = lat
        df.at[i, 'longitude'] = lon
    else:
        broken_rows.append(df.iloc[i])

df.to_csv(input_file.replace('.csv', '-enriched.csv'), sep=';', index=False)
pd.DataFrame(broken_rows).to_csv(input_file.replace('.csv', '-broken.csv'), sep=';', index=False)
print("End")