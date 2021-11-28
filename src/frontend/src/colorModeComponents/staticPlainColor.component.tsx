import React, { useState } from 'react'
import { HexColorPicker } from "react-colorful";
import { useAsync } from 'react-use';
import { updatePlainColor } from '../network';


function StaticPlainColor() {
    const [color, setColor] = useState("#000000");

    const {
        loading, error, value
    } = useAsync(async () => {
        console.log("new color", color);
        await updatePlainColor(color)
    }, [color]);

    return (
        <div className="StaticPlainColor">
            <HexColorPicker color={color} onChange={setColor} />
        </div>
    );
}

export default StaticPlainColor;
