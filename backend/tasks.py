from celery import Celery
from dynaconf import settings
import numpy as np
import random
from screens.sdl_color_screen import SDLColorScreen
from screens.serial_driver_screen import SerialDriverScreen

app = Celery("tasks", broker="redis://localhost")


def build_screen():
    nLeds = settings.get("nLeds")
    screen_type = settings.get("screen_type")
    if screen_type == "sdl":
        return SDLColorScreen(nLeds)
    elif screen_type == "serial":
        return SerialDriverScreen(nLeds)


screen = build_screen()
controller = None


def update_screen_matrix(mode: str, params: dict):
    """Update screen
    - Check if mode has changed, if yes, then purge the celery task list and set
    the new config
    - call the right controller

    Parameters
    ----------
    mode : str
        [description]
    params : dict
        [description]
    """

    if settings.get("mode") != mode:
        app.control.purge()
        settings.set("mode", mode)
        # controller = get_controller(mode)  # noqa
        if settings.get("params") != params:
            app.control.purge()
            settings.set("params", params)

    screen.display(
        np.array(
            [
                (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
                for _ in range(screen.nLeds)
            ]
        )
    )
    update_screen_matrix.apply_async()
