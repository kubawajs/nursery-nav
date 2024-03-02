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

df = pd.read_csv('RZ-instytucje.csv', sep=';')
df[['voivodeship', 'county', 'city', 'address']] = df['Localization'].str.split('>', expand=True)
broken_rows = []

for i in range(len(df)):
    print(f"Processing row {i+1} of {len(df)}")

    if df.at[i, 'Localization'] is None:
        broken_rows.append(df.at[i])
        continue

    address = df.at[i, 'Localization']
    lat, lon = get_coordinates(address) or (None, None)

    if lat is not None and lon is not None:
        df.at[i, 'latitude'] = lat
        df.at[i, 'longitude'] = lon
    else:
        broken_rows.append(df.iloc[i])

df.to_csv('RZ-instytucje-enriched.csv', sep=';', index=False)
pd.DataFrame(broken_rows).to_csv('RZ-instytucje-broken.csv', sep=';', index=False)
print("End")