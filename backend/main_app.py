import argparse
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
from dynaconf import settings

from screens.sdl_color_screen import SDLColorScreen
from screens.serial_driver_screen import SerialDriverScreen
from screen_controllers.plain_color_controller import PlainColorController
from screen_controllers.matrix_controller import MatrixController

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
    screen = SDLColorScreen(settings.nLeds)
else:
    screen = SerialDriverScreen(settings.nLeds)


screen_controllers = dict(
    static=PlainColorController(screen),
    matrix=MatrixController(screen)
)

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/update", methods=["POST"])
def update_led_strip():
    payload_data = request.get_json()
    assert "mode" in payload_data, "No mode specified for update, cancelling"
    assert "params" in payload_data, "No params specified for update, cancelling"

    mode = payload_data["mode"]
    params = payload_data["params"]

    screen_controllers.get(mode).launch_or_update(params)

    return "", 201


@app.route("/hello")
def hello():
    return "hello", 200


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000, use_reloader=False)
