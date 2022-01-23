from abc import ABC, abstractmethod


class AbstractScreenController(ABC):
    def __init__(self, screen):
        self.screen = screen

    @abstractmethod
    def launch_or_update(self, data):
        pass
