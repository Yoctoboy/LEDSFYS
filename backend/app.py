import argparse
from flask import Flask, request
import os
import signal
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_restful import Api
from multiprocessing import Process
from screen_controllers.plain_color_controller import PlainColorController
from screen_controllers.matrix_controller import MatrixController

parser = argparse.ArgumentParser()
parser.add_argument("--dev", action="store_true", dest="dev_mode")
parser.add_argument("--nLeds", "-n", action="store", dest="nLeds")
args = parser.parse_args()

if args.dev_mode:
    from screens.sdl_color_screen import SDLColorScreen
else:
    from screens.serial_driver_screen import SerialDriverScreen


# prepare frontend in the ugliest way
app = Flask(__name__)
api = Api(app)

if args.dev_mode:
    CORS(app, resources={r"/*": {"origins": "*"}})
    screen = SDLColorScreen(300)
else:
    screen = SerialDriverScreen(300)


screen_controllers = dict(
    static=PlainColorController(screen), matrix=MatrixController(screen)
)
CORS(app, resources={r"/*": {"origins": "*"}})
currentProcess = None

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path: str):
    os.system("cp -r ../frontend/static .")
    print("path:", path)
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        if path.endswith(".js"):
            return send_from_directory(
                app.static_folder, path, mimetype="text/javascript"
            )
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.route("/update", methods=["POST"])
def update_led_strip():
    payload_data = request.get_json()
    assert "mode" in payload_data, "No mode specified for update, cancelling"
    assert "params" in payload_data, "No params specified for update, cancelling"

    mode = payload_data["mode"]
    params = payload_data["params"]

    screenController = screen_controllers.get(mode)
    global currentProcess
    if currentProcess is not None:
        os.kill(currentProcess.pid, signal.SIGSTOP)
    currentProcess = Process(target=screenController.launch_or_update, args=(params,))
    currentProcess.start()
    currentProcess.join()

    return "", 201


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000, use_reloader=False)
