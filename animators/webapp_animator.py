#!/usr/bin/python3

import numpy as np

from animators.animator import Animator

class WebAppAnimator(Animator):
    def __init__(self, AudioSource, Screen):
        self.audio_source = AudioSource
        self.screen = Screen
    
    def start(self):
        if self.audio_source is not None:
            self.audio_source.start()

    def animate(self, data):
        """Animate the color screen; require a call to Animator.screen.display
        
        Args:
            data ([np float array]): sound data from the AudioSource
        """
        self.screen.display()
    
    def zero(self):
        self.screen.zero()