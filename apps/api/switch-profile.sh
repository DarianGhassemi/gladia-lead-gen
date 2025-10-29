#!/bin/bash

# Helper script to switch search profiles easily

if [ -z "$1" ]; then
  echo "Usage: ./switch-profile.sh <profile-name>"
  echo ""
  echo "Available profiles:"
  echo "  - default           (AI Engineers & CTOs - Voice/Speech)"
  echo "  - meeting-tools     (Meeting & Collaboration Platforms)"
  echo "  - customer-support  (Customer Support AI)"
  echo "  - sales-coaching    (Sales Intelligence Tools)"
  echo "  - healthcare-tech   (Healthcare Documentation)"
  echo "  - media-podcasting  (Podcast & Content Platforms)"
  echo "  - legal-compliance  (Legal Tech)"
  echo "  - education-tech    (EdTech Platforms)"
  echo ""
  echo "Example: ./switch-profile.sh meeting-tools"
  exit 1
fi

PROFILE=$1

# Update search-config.json
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s/\"activeProfile\": \".*\"/\"activeProfile\": \"$PROFILE\"/" search-config.json
else
  # Linux
  sed -i "s/\"activeProfile\": \".*\"/\"activeProfile\": \"$PROFILE\"/" search-config.json
fi

echo "✅ Switched to profile: $PROFILE"
echo ""
echo "Current configuration:"
grep -A 2 "\"$PROFILE\"" search-config.json | head -3
echo ""
echo "Run 'npm start' to generate leads with this profile."
