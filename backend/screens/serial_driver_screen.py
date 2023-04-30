from .screen import Screen
from arduino.driver.driver import Driver


class SerialDriverScreen(Screen):

    name = "serial"

    def __init__(self, nLeds):
        self.nLeds = nLeds
        self.driver = Driver()
        self.driver.setup(nLeds)

    def display(self, colorArray, brightness=1):
        assert len(colorArray) == self.nLeds
        colorArray = self.apply_brightness(colorArray, brightness)
        self.driver.light(colorArray)

    def zero(self):
        self.driver.light([[0, 0, 0] for _ in range(self.nLeds)])
