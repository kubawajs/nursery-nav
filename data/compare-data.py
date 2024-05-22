import sys

old_file = sys.argv[1]
new_file = sys.argv[2]

# Read the files
print(f"Comparing {old_file} to {new_file}")
with open(old_file, 'r', encoding="utf8") as t1, open(new_file, 'r', encoding="utf8") as t2:
    fileone = t1.readlines()
    filetwo = t2.readlines()

# Find the difference between the two files
print("Finding differences")
updated_file = new_file.replace('.csv', '-diff.csv')
with open(updated_file, 'w', encoding="utf8") as outFile:
    # Write the header
    outFile.write(filetwo[0])

    # Write the differences
    for line in filetwo:
        if line not in fileone:
            outFile.write(line)