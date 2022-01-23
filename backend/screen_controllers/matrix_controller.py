from screen_controllers.abstract_screen_controller import AbstractScreenController


class MatrixController(AbstractScreenController):
    def launch_or_update(self, **data):
        """Data must be of the following structure:

        color: string - Color we want to display in the matrix, written as a hex color
        """

        # hex_color = data["color"]
        # rgb_color_tuple = ImageColor.getrgb(hex_color)
        # colorarray = np.array([rgb_color_tuple for _ in range(self.screen.nLeds)])
        # update_screen_matrix.apply_async()
        pass
