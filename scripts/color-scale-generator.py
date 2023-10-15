#!/usr/bin/python3

import colorsys

def get_lightness(hex_color):
    """Returns the lightness of a color in the HSL color space"""
    hex_color = hex_color.lstrip('#')
    rgb_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    _, l, _ = colorsys.rgb_to_hls(*[x/255.0 for x in rgb_color])
    return l

def darken_hex_color(hex_color, amount, lighten=False):
    # Convert hex to RGB
    rgb_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        
    # Convert RGB to HSL
    h, l, s = colorsys.rgb_to_hls(*[x/255.0 for x in rgb_color])

    # Darken the lightness
    l = max(0, min(1, amount))

    # Convert back to RGB
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    
    # Convert RGB to hex
    darkened_hex = '#{:02x}{:02x}{:02x}'.format(int(r*255), int(g*255), int(b*255))
    
    return darkened_hex

while True:
    name = input("Enter a name for the color scale: ")
    hex = input("Enter the HEX (without #): ")
    lighten = True if input("Do you want to lighten (y/n)? ") == "y" else False
    step = float(input("Enter the lightness step (1-100): "))
    
    color_lightness = get_lightness(hex)

    print(f"export const {name}Base = '#{hex}'")

    i = step
    current_lightness = color_lightness
    while current_lightness <= 1 and current_lightness >= 0:
        if lighten:
            current_lightness += float(step / 100)
            processed_color = darken_hex_color(hex, current_lightness, True)
            print(f"export const {name}Lighten{int(i)} = '{processed_color}'") 
        else:
            current_lightness -= float(step / 100)
            processed_color = darken_hex_color(hex, current_lightness, False)
            print(f"export const {name}Darken{int(i)} = '{processed_color}'")
        i += step