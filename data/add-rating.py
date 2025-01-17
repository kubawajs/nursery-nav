import googlemaps
import csv
import sys
import os

gmaps = googlemaps.Client(key='AIzaSyA1KfNPR3f0Qp1sFkFBfo70kcWQAsQanmQ')

def get_place_rating(lat, lng):
    # Retrieve place details using the coordinates
    place_result = gmaps.places_nearby(location=(lat, lng), radius=50)  # Adjust radius as needed
    if place_result['results']:
        place_id = place_result['results'][0]['place_id']
        place_details = gmaps.place(place_id=place_id)
        return place_id, place_details['result'].get('rating', 'No rating available')
    return None, 'No places found'

def read_coordinates_from_file(file_path):
    coordinates = []
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=';')  # Assuming the CSV uses semicolons as delimiters
        for row in reader:
            lat = float(row['latitude'])  # Adjust column name as necessary
            lng = float(row['longitude'])  # Adjust column name as necessary
            coordinates.append((row, lat, lng))  # Store the entire row along with lat/lng
    return coordinates

def save_results_to_file(original_data, output_file_path):
    with open(output_file_path, 'w', encoding='utf-8', newline='') as file:
        fieldnames = list(original_data[0].keys()) + ['place_id', 'rating']  # Add new columns
        writer = csv.DictWriter(file, fieldnames=fieldnames, delimiter=';')
        writer.writeheader()
        for row in original_data:
            writer.writerow(row)

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python add-rating.py <input_file_path>")
        sys.exit(1)

    input_file_path = sys.argv[1]  # Get input file path from command line argument

    # Generate output file path by appending '-rating' before the file extension
    base, ext = os.path.splitext(input_file_path)
    output_file_path = f"{base}-rating{ext}"

    coordinates = read_coordinates_from_file(input_file_path)
    results = []

    for index, (row, lat, lng) in enumerate(coordinates):
        print(f'Processing coordinate {index + 1}/{len(coordinates)}: ({lat}, {lng})')
        place_id, rating = get_place_rating(lat, lng)
        row['place_id'] = place_id if place_id else 'N/A'  # Add place_id to the row
        row['rating'] = rating  # Add rating to the row
        results.append(row)

    save_results_to_file(results, output_file_path)
    print(f'Results saved to {output_file_path}')