import numpy as np
from PIL import ImageColor

from screen_controllers.abstract_screen_controller import AbstractScreenController


class PlainColorController(AbstractScreenController):
    def launch_or_update(self, data):
        """Data must be of the following structure:

        color: string - Color we want to display, written as a hex color
        """

        hex_color = data["color"]
        rgb_color_tuple = ImageColor.getrgb(hex_color)
        colorarray = np.array([rgb_color_tuple for _ in range(self.screen.nLeds)])
        self.screen.display(colorarray)
