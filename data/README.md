# Data source for application

## Data

[Rejestr Żłobków - lista instytucji - dane.gov.pl](https://dane.gov.pl/pl/dataset/2106/resource/55499/table).
License: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.pl)

## enrich-data.py

Script that enriches the original data with geolocalization data from Google GeoCoding API and splits address into separate columns.

### Run script

```bash
python enrich-data.py
```

## convert-data-json.py

Script that converts data from CSV into JSON file with given structure:

```json
[
    {
        "institutionType": "Żłobek",
        "name": "Nursery School 1",
        "website": "www.nursery.com",
        "email": "nursery@nurseryschool.com",
        "phone": "123456789",
        "capacity": 37,
        "kidsEnrolled": 21,
        "basicPricePerMonth": 1000,
        "extendedStayOver10H": null,
        "basicPricePerHour": null,
        "foodPricePerMonth": null,
        "foodPricePerDay": 15.0,
        "discounts": [
            "Wielodzietność/Karta Dużej Rodziny: 10.0%"
        ],
        "openingHours": "Godziny pracy: Poniedziałek, Wtorek, Środa, Czwartek, Piątek 6:30-17:30",
        "isAdaptedToDisabledChildren": true,
        "operatingEntity": {
            "name": "Nursery School Ltd",
            "address": null,
            "nip": "7312340378",
            "regon": "120069696",
            "regNoPosition": "2137/P",
            "website": "http://www.nursery.com/"
        },
        "businessActivitySuspended": false,
        "address": {
            "voivodeship": "MAŁOPOLSKIE",
            "county": "Kraków",
            "city": "Kraków",
            "fullAddress": "Kraków Random 480",
            "pin": {
                "latitude": 49.64,
                "longitude": 20.50
            }
        }
    },
    ...
]
```

### Run script

```bash
python convert-to-json.py file-name.csv
```