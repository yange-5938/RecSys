description_text = "Extract following entities from the input text. City name, point of interest names, touristic place category names. If any field not exist in input text it can return empty string for city, and empty list for remaining fields. Translate all extracted fields to English even if it is in different language in input text."

function_description_entity_extractor = [
    {
      "name": "entity_extractor",
      "description": description_text,
      "parameters": {
        "type": "object",
        "properties": {
          "city": {
            "type": "string",
            "description": "City name in the input text",
          },
          "poi_list": {
            "type": "string",
            "description": "List of point of interests that is included in the input text",
          },
          "category": {
            "type": "string",
            "description": "List of touristic place category that is included in the input text",
            "enum": ["History", "Museums", "Nature", "Architecture", "Culture", "Theme Parks", 
                     "Beaches", "Wildlife", "Adventure", "Religion", "Food", "Shopping", 
                     "Gardens", "Sport", "Science", "Wineries", "Festivals", "Scenic Views", 
                     "Caves", "Music", "Theatre", "Music", "Waterfalls", "Botanical", "Zoo", 
                     "Castle", "Spa", "Amusement Park", "Wine Yard", "Heritage", "Lakeside", 
                     "River", "Ancient", "Art Gallery", "Church", "Mosque" ]            
          },
          
        },
         "required": ["city", "poi_list", "category"],
      }
    }
  ]

