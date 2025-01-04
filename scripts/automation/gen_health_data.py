from openai import OpenAI # type: ignore

client = OpenAI(api_key="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")

chat_completion = client.chat.completions.create(
    messages = [
        {
            "role": "user",
            "content": "What is machine learning?",
        }
    ],
    model="gpt-3.5"
)

print(chat_completion.choices[0].message.content)
