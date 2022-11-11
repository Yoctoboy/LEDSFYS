from PIL import ImageColor
import random
import time
import numpy as np
from screens.screen import Screen
from screen_controllers.abstract_screen_controller import AbstractScreenController


class MatrixController(AbstractScreenController):
    def __init__(self, screen: Screen):
        super().__init__(screen)
        self.state = dict(color_array=[0 for _ in range(screen.nLeds)], params={})

    def launch_or_update(self, data: dict):
        """Data must be of the following structure:

        trailColor: string - Color we want to display in the matrix, written as hex
        trailSpeed: int - Trail speed in LED/second
        averageTrailLength: int - average size for each trail (in LEDs)

        Trail are travelling from index 0 to index nLEDs - 1
        """
        currentState = [(0, 0, 0) for _ in range(self.screen.nLeds)]

        hex_color = data["color"]
        stepTime = 1.0 / data["trailSpeed"]  # in seconds
        averageTrailLength = data["averageTrailLength"]
        rgb_color_tuple = ImageColor.getrgb(hex_color)
        isNewTrailPossible = True
        lastTrailIndex = 0
        lastTrailLength = averageTrailLength

        while True:
            stepStart = time.time()
            if isNewTrailPossible and random.random() < (1 / averageTrailLength):
                lastTrailIndex = 0
                lastTrailLength = random.triangular(
                    averageTrailLength / 2, averageTrailLength * 1.5
                )
                newState = [rgb_color_tuple] + currentState[:-1]
                isNewTrailPossible = False
            else:
                lastTrailIndex += 1
                isNewTrailPossible = lastTrailIndex >= (averageTrailLength / 2)
                newState = [
                    tuple(
                        [
                            x
                            * (
                                max(0, (lastTrailLength - lastTrailIndex))
                                / lastTrailLength
                            )
                            for x in rgb_color_tuple
                        ]
                    )
                ] + currentState[:-1]
            self.screen.display(np.array(newState))
            currentState = newState
            time.sleep(max(0, stepTime - (time.time() - stepStart)))
