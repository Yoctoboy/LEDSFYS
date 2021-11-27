import argparse
from flask import Flask, render_template, redirect
from flask_cors import CORS
import numpy as np

from screens.sdl_color_screen import SDLColorScreen
from screens.serial_driver_screen import SerialDriverScreen


parser = argparse.ArgumentParser()
parser.add_argument("--dev", action="store_true", dest="dev_mode")
args = parser.parse_args()

nLeds = 300

screen = SDLColorScreen(nLeds) if args.dev_mode else SerialDriverScreen(nLeds)


color_state = dict(red=0, green=0, blue=0, brightness=0)
app = Flask(
    __name__,
    template_folder="templates/",
)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/update/<string:stype>/<int:value>", methods=["PUT"])
def update_led_strip(stype, value):
    color_state[stype] = value
    colorarray = np.array(
        [
            (color_state["red"], color_state["green"], color_state["blue"])
            for _ in range(nLeds)
        ]
    )
    screen.display(colorarray, color_state["brightness"] / 100.0)
    return "", 204


@app.route("/slider/<string:stype>/")
def get_slider_value(stype):
    return str(color_state.get(stype, None)), 200


@app.route("/")
def nothing():
    return redirect("/index", code=302)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
