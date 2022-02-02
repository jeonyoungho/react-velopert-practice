import React, {useState} from "react";
import "./LifeCycleSampleApp.css";
import LifeCycleSample from "./LifeCycleSample";

// 랜덤 색상을 생성합니다
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function LifeCycleSampleApp() {
    const [color, setColor] = useState("#000000");
    const [visible, setVisible] = useState(true);

    const onClick = () => {
        setColor(getRandomColor());
    };

    const onToggle = () => {
        setVisible(!visible);
    };

    return (
        <>
            <button onClick={onClick}>랜덤 색상</button>
            <button onClick={onToggle}>토글</button>
            {visible && <LifeCycleSample color={color} />}
        </>
    );
}

