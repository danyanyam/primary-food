from flask import render_template, request, jsonify, make_response
from flask import Flask

app = Flask(__name__)

foods = {
    'apple': {'protein': '3g', 'sugar': '10g', 'img': '&#x1f34f;'},
    'orange': {'protein': '2g', 'img': '🍊'},
    'banana': {'protein': '15g', 'img': '&#x1f34c;'},
    'coconut': {'protein': '30g', 'img': '&#x1F965'}
}

@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/post', methods=['POST'])
def get_info_about():
    food_to_search = request.get_json()['text']
    result = foods.get(food_to_search.lower().strip())
    return make_response(jsonify(result), 200)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)