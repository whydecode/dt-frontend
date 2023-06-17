import React, { useRef } from "react";
import Draggable from "react-draggable";
import data from "../data.json";
import "../css/storyboard.css";
const StoryBoard = () => {
  const divRefs = useRef(
    Array(4)
      .fill(null)
      .map(() => React.createRef())
  );

  const handleDrag = (index, e, ui) => {
    const { x, y } = ui;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (x > windowWidth) {
      const newX = Math.max(0, Math.min(x, windowWidth));
      divRefs.current[
        index
      ].current.style.transform = `translate(${newX}px, ${0}px)`;
    }
    if (y > windowHeight) {
      const newY = Math.max(0, Math.min(y, windowHeight));
      divRefs.current[
        index
      ].current.style.transform = `translate(${0}px, ${newY}px)`;
    }
  };
  return (
    <div className="storyboard">
      <div className="journeyBoard">
        <h5>Jouney Board</h5>
      </div>
      <div className="storyTop">
        <h2>{data.title}</h2>
        <div className="task">
          <h3>{data.tasks[0].task_title}</h3>
          <p>{data.tasks[0].task_description}</p>
        </div>
      </div>

      <div key={0} ref={divRefs.current[0]} className="draggable">
        <Draggable onDrag={(e, ui) => handleDrag(0, e, ui)}>
          <div className="handle">Drag me!</div>
        </Draggable>
      </div>
      <div key={1} ref={divRefs.current[1]} className="draggable">
        <Draggable onDrag={(e, ui) => handleDrag(1, e, ui)}>
          <div className="handle">
            Drag me!
            <p>fsdafsad0</p>
            fdsfs
          </div>
        </Draggable>
      </div>
      <div key={2} ref={divRefs.current[2]} className="draggable">
        <Draggable onDrag={(e, ui) => handleDrag(2, e, ui)}>
          <div className="handle">Drag me!</div>
        </Draggable>
      </div>
      <div key={3} ref={divRefs.current[3]} className="draggable">
        <Draggable onDrag={(e, ui) => handleDrag(3, e, ui)}>
          <div className="handle">Drag me!</div>
        </Draggable>
      </div>
    </div>
  );
};

export default StoryBoard;
