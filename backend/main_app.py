import argparse
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api

parser = argparse.ArgumentParser()
parser.add_argument("--dev", action="store_true", dest="dev_mode")
parser.add_argument("--nLeds", "-n", action="store", dest="nLeds")

args = parser.parse_args()

app = Flask(
    __name__, template_folder="../frontend/build/", static_folder="../frontend/build/"
)
api = Api(app)

if args.dev_mode:
    CORS(app, resources={r"/*": {"origins": "*"}})

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/update", methods=["POST"])
def update_led_strip():
    payload_data = request.get_json()
    assert "mode" in payload_data, "No mode specified for update, cancelling"
    assert "params" in payload_data, "No params specified for update, cancelling"

    return "", 201


@app.route("/hello")
def hello():
    return "hello", 200


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000, use_reloader=False)
