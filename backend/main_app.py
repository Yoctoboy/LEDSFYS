import argparse
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api
import numpy as np
from PIL import ImageColor

from screens.sdl_color_screen import SDLColorScreen
from screens.serial_driver_screen import SerialDriverScreen


parser = argparse.ArgumentParser()
parser.add_argument("--dev", action="store_true", dest="dev_mode")
args = parser.parse_args()

nLeds = 300
screen = SDLColorScreen(nLeds) if args.dev_mode else SerialDriverScreen(nLeds)

app = Flask(
    __name__, template_folder="../frontend/build/", static_folder="../frontend/build/"
)
api = Api(app)

if args.dev_mode:
    CORS(app, resources={r"/*": {"origins": "*"}})

CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/setPlainColor", methods=["POST"])
def update_led_strip():
    hex_color = request.get_json()["color"]
    rgb_color_tuple = ImageColor.getrgb(hex_color)
    print(rgb_color_tuple)
    colorarray = np.array([rgb_color_tuple for _ in range(nLeds)])
    screen.display(colorarray, 40 / 100.0)
    return "", 201


@app.route("/hello")
def hello():
    return "hello", 200


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000, use_reloader=False)
