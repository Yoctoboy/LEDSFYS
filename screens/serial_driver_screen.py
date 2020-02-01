import sys
from .screen import Screen
from multiprocessing import Process, Array as mpArray
import numpy as np
from arduino.driver.driver import Driver

class SerialDriverScreen(Screen):

    name = "serial"

    def __init__(self, nLeds, brightness=None):
        self.nLeds = nLeds
        self.brightness = brightness
        self.driver = Driver()
        self.driver.setup(nLeds)
        
    def display(self, colorArray, brightness=None):
        assert len(colorArray) == self.nLeds
        colorArray = self.apply_brightness(colorArray, brightness)
        self.driver.light(np.array(colorArray))
    
    def zero(self):
        self.driver.light(np.array([[0, 0, 0] for _ in range(self.nLeds)]))
