from PIL import ImageColor

from screens.screen import Screen
from screen_controllers.abstract_screen_controller import AbstractScreenController


class MatrixController(AbstractScreenController):

    def __init__(self, screen: Screen):
        super().__init__(screen)
        self.state = dict(
            color_array=[0 for _ in range(screen.nLeds)],
            params={}
        )

    def launch_or_update(self, data):
        """Data must be of the following structure:

        color: string - Color we want to display in the matrix, written as a hex color
        """

        hex_color = data["color"]
        rgb_color_tuple = ImageColor.getrgb(hex_color)
        # colorarray = np.array([rgb_color_tuple for _ in range(self.screen.nLeds)])
        # update_screen_matrix.apply_async()
        # not finished lol
