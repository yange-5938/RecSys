import openai
from llm_service.function_description import function_description_entity_extractor

openai.api_key="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"

def extract_entities(query)
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613", 
        messages=[{"role": "user", "content": query}],
        functions= function_description_entity_extractor,
        function_call="auto",
    )


    response_message = chat_completion["choices"][0]["message"]
    response_dictionary = response_message["function_call"]["arguments"]
    return response_dictionary
    