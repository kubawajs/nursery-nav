import pandas as pd
import sys

class OperatingEntity:
    def __init__(self, name, address, nip, regon, regNoPosition, website):
        self.name = name
        self.address = address
        self.nip = nip
        self.regon = regon
        self.regNoPosition = regNoPosition
        self.website = website

class Address:
    def __init__(self, voivodeship, county, city, fullAddress, pin):
        self.voivodeship = voivodeship.strip()
        self.county = county.strip()
        self.city = city.strip()
        self.fullAddress = fullAddress.strip()
        self.pin = pin

class Pin: 
    def __init__(self, longitude, latitude):
        self.longitude = longitude
        self.latitude = latitude

# Read the input file
input_file = sys.argv[1]
df = pd.read_csv(input_file, sep=';')

# Convert price columns
df['basicPricePerMonth'] = df['basicPricePerMonth'].str.replace(' zł', '').astype(float)
df['extendedStayOver10H'] = df['extendedStayOver10H'].str.replace(' zł', '').astype(float)
df['basicPricePerHour'] = df['basicPricePerHour'].str.replace(' zł', '').astype(float)
df['foodPricePerMonth'] = df['foodPricePerMonth'].str.replace(' zł', '').astype(float)
df['foodPricePerDay'] = df['foodPricePerDay'].str.replace(' zł', '').astype(float)

# Convert to array column
df['discounts'] = df['discounts'].str.split('Zniżka - ').str[1:]

# Build objects
df['operatingEntity'] = df.apply(lambda row: OperatingEntity(row['operatingEntityName'], row['operatingEntityAddress'], row['operatingEntityNIP'], row['operatingEntityREGON'], row['operatingEntityRegNoPosition'], row['operatingEntityWebsite']), axis=1)
df['address'] = df.apply(lambda row: Address(row['voivodeship'], row['county'], row['city'], row['address'], Pin(row['longitude'], row['latitude'])), axis=1)

# Remove column from data frame
df = df.drop('localization', axis=1)
df = df.drop('operatingEntityName', axis=1)
df = df.drop('operatingEntityAddress', axis=1)
df = df.drop('operatingEntityNIP', axis=1)
df = df.drop('operatingEntityREGON', axis=1)
df = df.drop('operatingEntityRegNoPosition', axis=1)
df = df.drop('operatingEntityWebsite', axis=1)
df = df.drop('voivodeship', axis=1)
df = df.drop('county', axis=1)
df = df.drop('city', axis=1)
df = df.drop('latitude', axis=1)
df = df.drop('longitude', axis=1)

# Save the data frame to a json file in utf-8 encoding
output_file = input_file.replace('.csv', '.json')
df.to_json(output_file, orient='records', force_ascii=False)