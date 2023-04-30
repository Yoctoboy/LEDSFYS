from abc import ABC, abstractmethod


class Screen(ABC):

    name = "abstract"

    @abstractmethod
    def display(self, colorArray):
        """Display colorArray (length Screen.nLeds) on the screen

        Args:
            colorArray ([R,G,B]*nLeds): R,G,B between 0 and 255
        """
        pass

    def apply_brightness(self, colorArray, brightness=1):
        """Apply brightness modification to the colors

        Args:
            colorArray (ndarray): input array

        Returns:
            ndarray: output array with colors modified with brightness
        """
        return [[max(0, min(x * brightness, 255)) for x in led] for led in colorArray]
