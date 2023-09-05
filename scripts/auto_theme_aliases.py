#!/usr/bin/python3

import glob
import json

def read_json_file(file_path):
    """Read and parse a JSON file."""
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {file_path}")
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse JSON in file: {file_path}")

def get_leaf_paths(obj, parent_key="", separator="."):
    """Recursively extract all leaf paths from a JSON object."""
    paths = []

    if isinstance(obj, dict):
        for key, value in obj.items():
            new_key = f"{parent_key}{separator}{key}" if parent_key else key
            paths.extend(get_leaf_paths(value, new_key, separator))
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            new_key = f"{parent_key}{separator}{index}" if parent_key else str(index)
            paths.extend(get_leaf_paths(value, new_key, separator))
    else:
        paths.append(parent_key)

    return paths

def get_abbr(word):
    """Generate a concise abbreviation."""
    vowels = "aeiouAEIOU"
    numbers = "0123456789"
    first_consonant = next((char for char in word[1:] if char.isalpha() and char.lower() not in vowels), None)
    
    first_letter = word[0]
    first_consonant = first_consonant if first_consonant else word[1]
    last_number = word[-1] if (word[-1] in numbers and word[-1] != first_consonant) else ""

    return f"{first_letter}{first_consonant}{last_number}"

def generate_aliases(property_paths):
    """Generate aliases for property paths."""
    aliases = {}

    for path in property_paths:
        segments = path.split(".")
        namespace = segments[0]
        abbr = get_abbr(segments[-2])
        last_segment = segments[-1]

        if namespace not in aliases:
            aliases[namespace] = {}

        if len(segments) == 2:
            if last_segment in aliases[namespace]:
                raise ValueError(f"Duplicate root property: {last_segment}. Please change the name of the property.")
            aliases[namespace][last_segment] = last_segment
        else:
            alias = f"{abbr}-{last_segment}"
            if alias in aliases[namespace]:
                raise ValueError(f"Duplicate alias: {alias}. Path: {path}. Please change the name of the property.")
            aliases[namespace][alias] = ".".join(segments[1:])

    return aliases

def main():
    theme_filenames = glob.glob("./src/design-system/theme/schemes/*.json")

    if not theme_filenames:
        print("No theme files found in the specified directory.")
        return

    theme_path = theme_filenames[0]

    try:
        theme_data = read_json_file(theme_path)
        property_paths = get_leaf_paths(theme_data)
        aliases = generate_aliases(property_paths)

        output_path = "./src/design-system/theme/aliases/aliases.json"
        with open(output_path, "w+") as file:
            json.dump(aliases, file, indent=4)

        print(f"Theme aliases were auto-generated and saved to: {output_path}")
    except (FileNotFoundError, ValueError) as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()