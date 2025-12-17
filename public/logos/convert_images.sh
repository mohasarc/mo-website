#!/bin/bash

# Directory to run in (current directory by default)
DIR="."

# Check if a directory argument is provided
if [ -d "$1" ]; then
  DIR="$1"
fi

echo "Processing images in: $DIR"

# Loop through image files
find "$DIR" -maxdepth 1 -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) | while read -r file; do
  # Skip already converted files just in case
  if [[ "$file" == *".avif" ]]; then
    continue
  fi

  # Get directory, filename without extension
  filepath=$(dirname "$file")
  filename=$(basename -- "$file")
  name="${filename%.*}"
  
  # Define output path
  output_avif="$filepath/${name}.avif"

  # AVIF Conversion
  if [ ! -f "$output_avif" ]; then
      echo "------------------------------------------------"
      echo "Converting: $filename -> ${name}.avif"
      
      ffmpeg -i "$file" \
        -vf "scale=80:-2" \
        -c:v libaom-av1 \
        -still-picture 1 \
        -crf 30 \
        -b:v 0 \
        "$output_avif" < /dev/null

      if [ $? -eq 0 ]; then
         echo "✔ Successfully converted $filename to AVIF"
      else
         echo "✘ Failed to convert $filename to AVIF"
      fi
  else
      echo "Skipping $filename (AVIF already exists)"
  fi

  # WebP Conversion
  output_webp="$filepath/${name}.webp"
  
  # Only convert if input is not already webp (to avoid self-overwrite logic issues) and output doesn't exist
  if [[ "$file" != *".webp" ]]; then
      if [ ! -f "$output_webp" ]; then
        echo "Converting: $filename -> ${name}.webp"
        
        ffmpeg -i "$file" \
          -vf "scale=80:-2" \
          -c:v libwebp \
          -quality 80 \
          -compression_level 6 \
          "$output_webp" < /dev/null
          
        if [ $? -eq 0 ]; then
           echo "✔ Successfully converted $filename to WebP"
        else
           echo "✘ Failed to convert $filename to WebP"
        fi
      else
        echo "Skipping $filename (WebP already exists)"
      fi
  fi

done

echo "------------------------------------------------"
echo "All done!"
