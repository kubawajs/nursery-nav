import pandas as pd
import sys

class OperatingEntity:
    def __init__(self, name, city, street, houseNumber, localNumber, postalCode, nip, regon, regNoPosition, website):
        self.name = name
        self.city = city
        self.street = street
        self.houseNumber = houseNumber
        self.localNumber = localNumber
        self.postalCode = postalCode
        self.nip = nip
        self.regon = regon
        self.regNoPosition = regNoPosition
        self.website = website

class Address:
    def __init__(self, voivodeship, county, community, city, street, houseNumber, localNumber, pin):
        self.voivodeship = voivodeship
        self.county = county
        self.community = community
        self.city = city
        self.street = street
        self.houseNumber = houseNumber
        self.localNumber = localNumber
        self.pin = pin

class Pin: 
    def __init__(self, longitude, latitude):
        self.longitude = longitude
        self.latitude = latitude

# Read the input file
input_file = sys.argv[1]
df = pd.read_csv(input_file, sep=';')

# Convert ID column
df['id'] = df['id'].str.replace('/Z', '').astype(int)

# Convert institution type to enum
df['institutionType'] = df['institutionType'].map({'Żłobek': 'NURSERY', 'Klub dziecięcy': 'CHILDCLUB'})

# Convert TAK/NIE to boolean
df['isAdaptedToDisabledChildren'] = df['isAdaptedToDisabledChildren'].map({'TAK': True, 'NIE': False})
df['businessActivitySuspended'] = df['businessActivitySuspended'].map({'TAK': True, 'NIE': False})

# Convert price columns
# df['basicPricePerMonth'] = df['basicPricePerMonth'].str.replace(' zł', '').astype(float)
# df['extendedStayOver10H'] = df['extendedStayOver10H'].str.replace(' zł', '').astype(float)
# df['basicPricePerHour'] = df['basicPricePerHour'].str.replace(' zł', '').astype(float)
# df['basicPricePerMonthKPOFERS'] = df['basicPricePerMonthKPOFERS'].str.replace(' zł', '').astype(float)
# df['foodPricePerMonth'] = df['foodPricePerMonth'].str.replace(' zł', '').astype(float)
# df['foodPricePerDay'] = df['foodPricePerDay'].str.replace(' zł', '').astype(float)

# Convert to array column
df['discounts'] = df['discounts'].str.split('Zniżka - ').str[1:]

# Build objects
df['operatingEntity'] = df.apply(lambda row: OperatingEntity(row['operatingEntityName'], row['operatingEntityCity'], row['operatingEntityStreet'], row['operatingEntityHouseNumber'], row['operatingEntityLocalNumber'], row['operatingEntityPostalCode'], row['operatingEntityNIP'], row['operatingEntityREGON'], row['operatingEntityRegNoPosition'], row['operatingEntityWebsite']), axis=1)
df['address'] = df.apply(lambda row: Address(row['voivodeship'], row['county'], row['community'], row['city'], row['street'], row['houseNumber'], row['localNumber'], Pin(row['longitude'], row['latitude'])), axis=1)

# Remove column from data frame
df = df.drop('geolocation', axis=1)
df = df.drop('operatingEntityName', axis=1)
df = df.drop('operatingEntityCity', axis=1)
df = df.drop('operatingEntityStreet', axis=1)
df = df.drop('operatingEntityHouseNumber', axis=1)
df = df.drop('operatingEntityLocalNumber', axis=1)
df = df.drop('operatingEntityPostalCode', axis=1)
df = df.drop('operatingEntityNIP', axis=1)
df = df.drop('operatingEntityREGON', axis=1)
df = df.drop('operatingEntityRegNoPosition', axis=1)
df = df.drop('operatingEntityWebsite', axis=1)
df = df.drop('voivodeship', axis=1)
df = df.drop('county', axis=1)
df = df.drop('community', axis=1)
df = df.drop('city', axis=1)
df = df.drop('street', axis=1)
df = df.drop('houseNumber', axis=1)
df = df.drop('localNumber', axis=1)
df = df.drop('latitude', axis=1)
df = df.drop('longitude', axis=1)

# Save the data frame to a json file in utf-8 encoding
output_file = input_file.replace('.csv', '.json')
df.to_json(output_file, orient='records', force_ascii=False)