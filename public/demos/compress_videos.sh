#!/bin/bash

# Directory to run in (current directory by default)
DIR="."

# Check if a directory argument is provided
if [ -d "$1" ]; then
  DIR="$1"
fi

echo "Processing videos in: $DIR"

# Loop through video files in the specified directory
# specific extensions can be added here
find "$DIR" -maxdepth 1 -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.mkv" \) | while read -r file; do
  # Skip already compressed files to avoid re-compressing
  if [[ "$file" == *"-small.mp4" ]]; then
    continue
  fi

  # Get directory, filename without extension
  filepath=$(dirname "$file")
  filename=$(basename -- "$file")
  name="${filename%.*}"
  
  # Define output path
  output="$filepath/${name}-small.mp4"

  echo "------------------------------------------------"
  echo "Compressing: $filename -> ${name}-small.mp4"
  
  # Run ffmpeg command
  ffmpeg -i "$file" \
    -vf "scale=400:-2" \
    -c:v libx264 \
    -crf 28 \
    -preset slower \
    -movflags +faststart \
    -an \
    "$output" < /dev/null

  if [ $? -eq 0 ]; then
     echo "✔ Successfully compressed $filename"
  else
     echo "✘ Failed to compress $filename"
  fi

done

echo "------------------------------------------------"
echo "All done!"
