from flask import render_template
from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/get/<food>')
def get_info_about(food):
    return food


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)