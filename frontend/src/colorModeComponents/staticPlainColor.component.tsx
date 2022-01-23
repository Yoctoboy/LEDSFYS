import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAsync } from 'react-use';

import { updateStrip } from '../network';

function StaticPlainColor() {
  const [color, setColor] = useState('#000000');

  useAsync(async () => {
    console.log('new color', color);
    await updateStrip('static', { color });
  }, [color]);

  return (
    <div className="StaticPlainColor">
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
}

export default StaticPlainColor;
