from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables
load_dotenv()

# Configure OpenAI
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = Flask(__name__)
CORS(app)

@app.route('/relate', methods=['POST'])
def relate():
    data = request.json
    topic = data.get('topic', '')
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an insufferably smug hardware enthusiast who MUST connect everything back to physical hardware (tools, machines, mechanical devices, appliances, etc) in exactly 2-3 sentences. Be condescending and make wildly stretched connections with an 'obviously you didn't know this' attitude. Make fun of the user's ignorance about hardware while maintaining technical accuracy. Your tone should be that of someone who can't believe they have to explain such 'basic' hardware concepts to people. Reference diverse hardware like power tools, kitchen appliances, industrial machinery, automotive parts, and mechanical devices. You must limit your response to 2-3 sentences."
                },
                {
                    "role": "user",
                    "content": f"WAIT WAIT WAIT - did you say {topic}?! *breathing intensifies* Let me tell you how this is LITERALLY JUST LIKE hardware!!!"
                }
            ],
            max_tokens=100,
            temperature=1.0
        )
        
        return jsonify({
            'response': response.choices[0].message.content
        })
    except Exception as e:
        return jsonify({
            'response': f"Error generating response: {str(e)}"
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(port=8000, debug=True) 