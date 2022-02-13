import React, { useState } from 'react';
import { AlphaPicker, HuePicker } from 'react-color';
import { useAsync } from 'react-use';
import './StaticPlainColor.css';

import { updateStrip } from '../network';

function StaticPlainColor() {
  const [color, setColor] = useState('#000000');

  useAsync(async () => {
    console.log('new color', color);
    await updateStrip('static', { color });
  }, [color]);

  return (
    <div className="StaticPlainColor">
      <div className="HuePicker">
        <HuePicker color={color} />
      </div>

      <div className="AlphaPicker">
        <AlphaPicker color={color} />
      </div>
    </div>
  );
}

export default StaticPlainColor;
