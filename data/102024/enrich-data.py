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

# Split the geolocation column into separate columns if it contains a value
df['geolocation'] = df['geolocation'].astype(str)  # Ensure geolocation is a string
df[['longitude', 'latitude']] = df['geolocation'].str.split(';', expand=True, n=1)
df['latitude'] = pd.to_numeric(df['latitude'], errors='coerce')
df['longitude'] = pd.to_numeric(df['longitude'], errors='coerce')
print("Split geolocation column where possible")

# Get coordinates for rows where latitude or longitude is missing
broken_rows = []
for i in range(len(df)):
    print(f"Processing row {i+1} of {len(df)}")

    # Check if latitude or longitude is missing
    if pd.isna(df.at[i, 'latitude']) or pd.isna(df.at[i, 'longitude']):
        address = f"{df.at[i, 'voivodeship']} > {df.at[i, 'county']} > {df.at[i, 'city']} > {df.at[i, 'street']} {df.at[i, 'houseNumber']}"
        print(address)
        lat, lon = get_coordinates(address) or (None, None)
        
        if lat is not None and lon is not None:
            df.at[i, 'latitude'] = lat
            df.at[i, 'longitude'] = lon
        else:
            broken_rows.append(df.iloc[i])
    else:
        # Convert existing values to float
        df.at[i, 'latitude'] = float(df.at[i, 'latitude'])
        df.at[i, 'longitude'] = float(df.at[i, 'longitude'])

df.to_csv(input_file.replace('.csv', '-enriched.csv'), sep=';', index=False)
pd.DataFrame(broken_rows).to_csv(input_file.replace('.csv', '-broken.csv'), sep=';', index=False)
print("End")