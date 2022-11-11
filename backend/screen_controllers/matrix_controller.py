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
        isNewTrailDefinitive = False
        lastTrailIndex = 0
        lastTrailLength = averageTrailLength

        while True:
            stepStart = time.time()
            if isNewTrailDefinitive or (
                isNewTrailPossible and random.random() < (2 / averageTrailLength)
            ):
                lastTrailIndex = 0
                lastTrailLength = random.triangular(
                    averageTrailLength / 2, averageTrailLength * 1.5
                )
                newState = [rgb_color_tuple] + currentState[:-1]
                isNewTrailPossible = False
                isNewTrailDefinitive = False
            else:
                lastTrailIndex += 1
                isNewTrailPossible = lastTrailIndex >= (averageTrailLength / 2)
                isNewTrailDefinitive = lastTrailIndex >= self.screen.nLeds * 0.8
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
            timeLeft = stepTime - (time.time() - stepStart)
            time.sleep(max(0, timeLeft))
