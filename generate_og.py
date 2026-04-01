import urllib.request
from PIL import Image, ImageDraw, ImageFont
import os

# Download Pinyon Script font
font_url = "https://raw.githubusercontent.com/google/fonts/main/ofl/pinyonscript/PinyonScript-Regular.ttf"
font_path = "PinyonScript-Regular.ttf"

if not os.path.exists(font_path):
    print("Downloading font...")
    urllib.request.urlretrieve(font_url, font_path)

# Image dimensions
width = 1200
height = 630

# Colors matching the site
cream_bg = (253, 248, 243)
charcoal_text = (45, 42, 38)
gold_accent = (201, 169, 110)

# Create image
img = Image.new('RGB', (width, height), color=cream_bg)
draw = ImageDraw.Draw(img)

# Load font inside a try block
try:
    font = ImageFont.truetype(font_path, 200)
    subfont = ImageFont.truetype(font_path, 60)
except Exception as e:
    print(f"Error loading font: {e}")
    # Fallback to default
    font = ImageFont.load_default()
    subfont = ImageFont.load_default()

# Text
text = "By Yellza"
subtext = "Soins Esthétiques Premium"

# Get bounding boxes for centering
bbox = draw.textbbox((0, 0), text, font=font)
t_w = bbox[2] - bbox[0]
t_h = bbox[3] - bbox[1]

s_bbox = draw.textbbox((0, 0), subtext, font=subfont)
s_w = s_bbox[2] - s_bbox[0]
s_h = s_bbox[3] - s_bbox[1]

# Draw Main Text
x = (width - t_w) / 2
y = (height - t_h) / 2 - 40
draw.text((x, y), text, font=font, fill=charcoal_text)

# Draw Subtext
s_x = (width - s_w) / 2
s_y = y + t_h + 30
draw.text((s_x, s_y), subtext, font=subfont, fill=gold_accent)

# Save
output_path = "og_image.png"
img.save(output_path)
print(f"Successfully created {output_path}")
