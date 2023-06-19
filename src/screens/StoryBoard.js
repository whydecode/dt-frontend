import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import data from "../data.json";
import "../css/storyboard.css";
import cross from "../images/Icon.png";
import arrow from "../images/arrow.png";
import checkmark from "../images/checkmark.gif";
import up from "../images/up.png";
import thread0 from "../images/thread0.png";
import thread1 from "../images/thread1.png";
import thread2 from "../images/thread2.png";
import thread3 from "../images/thread3.png";
import content from "../content.json";
import { Editor } from "@tinymce/tinymce-react";
import FixedButtons from "../components/FixedButtons";
const StoryBoard = () => {
  const [notice, setNotice] = useState(false);
  const [journey, setJourney] = useState(false);
  const [thread, setThread] = useState(true);
  const threadRef = useRef(null);
  const [desClose, setDesClose] = useState(Array(4).fill(false));
  const [button, setButton] = useState(Array(5).fill(true));
  const [expanded, setExpanded] = useState(Array(9).fill(true));
  const toggleExpand = (index) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

  const handleButton = (index) => {
    const newButton = [...button];
    newButton[index] = !newButton[index];
    setButton(newButton);
  };

  const editorRef = useRef(null);
  const handleDescription = (index) => {
    const newDesClose = [...desClose];
    newDesClose[index] = !newDesClose[index];
    setDesClose(newDesClose);
  };
  const [originalHeight, setOriginalHeight] = useState(0);
  useEffect(() => {
    const divElement = threadRef.current;
    const height = divElement.offsetHeight;
    setOriginalHeight(height);
  }, []);
  const handleThread = () => {
    setThread(!thread);
    const divElement = threadRef.current;
    let currentHeight = originalHeight;

    const reductionStep = () => {
      const reducedHeight = currentHeight - originalHeight * 0.5; // Reduce by 10%
      divElement.style.height = `${reducedHeight}px`;

      currentHeight = reducedHeight;

      if (currentHeight > 0) {
        setTimeout(reductionStep, 0.1); // Delay between each step (100ms in this example)
      }
    };

    const additionStep = () => {
      const reducedHeight = currentHeight; // Reduce by 10%
      divElement.style.height = `${reducedHeight}px`;

      currentHeight = reducedHeight;

      if (currentHeight < originalHeight) {
        setTimeout(additionStep, 0.1); // Delay between each step (100ms in this example)
      }
    };
    if (thread) {
      reductionStep();
    } else {
      additionStep();
    }
  };

  const handleNotice = () => {
    setNotice(!notice);
  };
  const handleJourney = () => {
    setJourney(!journey);
  };

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
    <>
      <FixedButtons />
      <div className="dashboard">
        <div className={journey ? "journeyBoard" : "journeyBoard journeyClose"}>
          <div className="journeyHead" onClick={handleJourney}>
            <h5>Jouney Board</h5>
            <button className="journeyButton">
              <img src={arrow} alt="arrow" />{" "}
            </button>
          </div>
          <div className="journeyBody">
            <ul>
              <li>
                <h4>{data.tasks[0].task_title}</h4>
              </li>
              {data.tasks[0].assets.map((asset) => (
                <li key={asset.asset_id}>{asset.asset_title}</li>
              ))}
            </ul>
          </div>
          <div className="checkmark">
            <img src={checkmark} alt="" />
          </div>
        </div>
        <div className={notice ? "noticeBoard" : "noticeBoard noticeClose"}>
          <div className="noticeHead" onClick={handleNotice}>
            <button className="noticeOpen">
              <img src={cross} alt="" />
            </button>
            <h5>Notice Board</h5>
          </div>
        </div>
        <div className="storyTop">
          <h2 className="title">{data.title}</h2>
          <div className="task">
            <h3>{data.tasks[0].task_title}</h3>
            <p>{data.tasks[0].task_description}</p>
          </div>
        </div>
        <div className="storyboard">
          <div key={0} ref={divRefs.current[0]} className="draggable">
            <Draggable cancel="strong" onDrag={(e, ui) => handleDrag(0, e, ui)}>
              <div>
                <div className="taskHead">
                  <strong>{data.tasks[0].assets[0].asset_title}</strong>
                  <button
                    className="desButton"
                    onClick={() => handleDescription(0)}
                  >
                    i
                  </button>
                </div>

                <div className="handle">
                  <div
                    className={
                      desClose[0]
                        ? "taskDescription desClose"
                        : "taskDescription"
                    }
                  >
                    <p>
                      <span>Description: </span>
                      {data.tasks[0].assets[0].asset_description}
                    </p>
                  </div>
                  <div className="taskBody">
                    <iframe
                      title="video"
                      src={data.tasks[0].assets[0].asset_content}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div key={1} ref={divRefs.current[1]} className="draggable">
            <Draggable cancel="strong" onDrag={(e, ui) => handleDrag(1, e, ui)}>
              <div>
                <div className="taskHead">
                  <strong>{data.tasks[0].assets[1].asset_title}</strong>
                  <button
                    className="desButton"
                    onClick={() => handleDescription(1)}
                  >
                    i
                  </button>
                </div>

                <div className="handle">
                  <div
                    className={
                      desClose[1]
                        ? "taskDescription desClose"
                        : "taskDescription"
                    }
                  >
                    <p>
                      <span>Description: </span>
                      {data.tasks[0].assets[1].asset_description}
                    </p>
                  </div>
                  <div className="bodyHead">
                    <img
                      src={up}
                      alt="up"
                      onClick={handleThread}
                      style={{
                        transform: thread ? "rotateZ(0deg)" : "rotateZ(180deg)",
                        cursor: "pointer",
                      }}
                    />
                    Thread A
                  </div>
                  <div
                    className={thread ? "taskBody" : "taskBody taskBodyClose"}
                    ref={threadRef}
                  >
                    <div className="subThread">
                      <label htmlFor="subThread1">Sub Thread 1</label>
                      <input type="text" placeholder="Enter Text Here" />
                    </div>
                    <div className="subThread">
                      <label htmlFor="subThread1">Sub Interpretation 1</label>
                      <input type="text" placeholder="Enter Text Here" />
                    </div>
                    <div className="threadButtons">
                      <img src={thread0} alt="thread1" />
                      <img src={thread1} alt="thread2" />
                      <img src={thread2} alt="thread3" />
                      <img src={thread3} alt="thread4" />
                    </div>
                    <div className="threadOptions">
                      <select style={{ fontSize: 11 }}>
                        <option value="option1">Select Category</option>
                        <option value="option2">Remark</option>
                        <option value="option3">Sub-argument</option>
                        <option value="option3">Sub-explanation</option>
                        <option value="option3">Core-principle</option>
                      </select>
                      <select style={{ fontSize: 11 }}>
                        <option value="option1">Select Process</option>
                        <option value="option2">Question</option>
                        <option value="option3">Analogy</option>
                        <option value="option3">Sarcasm</option>
                        <option value="option3">Insight</option>
                        <option value="option3">Counter-Example</option>
                      </select>
                    </div>
                    <div id="plusThread">
                      <button>+ Sub thread</button>
                    </div>
                    <div className="subThread summary">
                      <label htmlFor="subThread1">Summary of Thread A</label>
                      <input type="text" placeholder="Enter Text Here" />
                    </div>
                    <div className="threadOptions threadEnd">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-link"
                          viewBox="0 0 16 10"
                        >
                          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                        </svg>
                        Thread Credit
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="13"
                          fill="currentColor"
                          className="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                          id="pencil"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </div>
                      <select style={{ fontSize: 11 }}>
                        <option value="option1">Select Emotion</option>
                        <option value="option2">Eureka Emphasis</option>
                        <option value="option3">Blissfully Puzzled</option>
                        <option value="option3">Spiritually Determined</option>
                        <option value="option3">Upset & Motivated</option>
                      </select>
                    </div>
                  </div>
                  <div className="addButton">
                    <button>+ New Thread</button>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div key={2} ref={divRefs.current[2]} className="draggable">
            <Draggable cancel="strong" onDrag={(e, ui) => handleDrag(2, e, ui)}>
              <div>
                <div className="taskHead">
                  <strong>{data.tasks[0].assets[2].asset_title}</strong>
                  <button
                    className="desButton"
                    onClick={() => handleDescription(2)}
                  >
                    i
                  </button>
                </div>

                <div className="handle">
                  <div
                    className={
                      desClose[2]
                        ? "taskDescription desClose"
                        : "taskDescription"
                    }
                  >
                    <p>
                      <span>Description: </span>
                      {data.tasks[0].assets[2].asset_description}
                    </p>
                  </div>
                  <div className="taskBody">
                    <div className="structureInput">
                      <h4>Title</h4>
                      <input type="text" placeholder="" />
                      <h4>Content</h4>
                    </div>
                    <div className="editorDiv">
                      <Editor
                        className="editor"
                        apiKey="l7ts9cxlu8dzwfkh0rct5btbpcvtwy7qizdc11hqv56u0e5v"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue="<p></p>"
                        init={{
                          height: 500,
                          menubar:
                            "file edit view insert format tools table help",
                          menu: {
                            tc: {
                              title: "Comments",
                              items:
                                "addcomment showcomments deleteallconversations",
                            },
                          },
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo image fullscreen| blocks" +
                            " |bold italic backcolor |  alignleft aligncenter alignright alignjustify| " +
                            " bullist  numlist outdent indent | removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                    </div>

                    <div className="structureEnd">
                      <div className="structureBottom">
                        <h3>Category</h3>
                        <select style={{ fontSize: 15 }}>
                          <option value="option1">--Select--</option>
                          <option value="option2">Miscellaneous</option>
                          <option value="option3">Learnability</option>
                          <option value="option3">Values Leadership</option>
                          <option value="option3">Technology</option>
                          <option value="option3">Acumen</option>
                          <option value="option3">Management</option>
                          <option value="option3">Business</option>
                        </select>
                      </div>
                      <div className="structureBottom">
                        <h3>Sub Category</h3>
                        <select style={{ fontSize: 15 }}>
                          <option value="option1">--Select--</option>
                        </select>
                      </div>
                      <div className="structureBottom">
                        <h3>Thumbnail</h3>
                        <div className="file-input">
                          <label htmlFor="uploadButton" className="file-label">
                            Choose File
                          </label>
                          <input
                            type="file"
                            id="uploadButton"
                            className="hidden-input"
                          />
                          <label
                            htmlFor="uploadButton"
                            className="upload-button"
                          >
                            Upload
                          </label>
                        </div>
                      </div>
                      <div className="structureBottom">
                        <h3>Thought Process</h3>
                        <select style={{ fontSize: 15 }}>
                          <option value="option1">--Select--</option>
                          <option value="option2">Eureka Moment</option>
                          <option value="option3">Answer</option>
                          <option value="option3">Question</option>
                          <option value="option3">Root of Thought</option>
                          <option value="option3">Reflection</option>
                        </select>
                      </div>
                    </div>
                    <div className="structuredButtons">
                      <button className="saveDraft">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="18"
                          fill="currentColor"
                          className="bi bi-sd-card-fill"
                          viewBox="0 0 16 10"
                        >
                          <path d="M12.5 0H5.914a1.5 1.5 0 0 0-1.06.44L2.439 2.853A1.5 1.5 0 0 0 2 3.914V14.5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 12.5 0Zm-7 2.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm2 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm2.75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 1.5 0Zm1.25-.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z" />
                        </svg>
                        Save Draft
                      </button>
                      <button className="publish">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="18"
                          fill="currentColor"
                          className="bi bi-cloud-arrow-up-fill"
                          viewBox="0 0 16 10"
                        >
                          <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
                        </svg>
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
          <div key={3} ref={divRefs.current[3]} className="draggable">
            <Draggable cancel="strong" onDrag={(e, ui) => handleDrag(3, e, ui)}>
              <div>
                <div className="taskHead">
                  <strong>{data.tasks[0].assets[3].asset_title}</strong>
                  <button
                    className="desButton"
                    onClick={() => handleDescription(3)}
                  >
                    i
                  </button>
                </div>

                <div className="handle">
                  <div
                    className={
                      desClose[3]
                        ? "taskDescription desClose"
                        : "taskDescription"
                    }
                  >
                    <p>
                      <span>Description: </span>
                      {data.tasks[0].assets[3].asset_description}
                    </p>
                  </div>
                  <div className="taskBody">
                    <div className="lastDivs">
                      <div className="intro">
                        <img
                          src={up}
                          alt="up"
                          onClick={() => handleButton(0)}
                          style={{
                            transform: button[0]
                              ? "rotateZ(0deg)"
                              : "rotateZ(180deg)",
                            cursor: "pointer",
                          }}
                        />
                        <h4>Introduction</h4>
                      </div>
                      <div
                        className={
                          button[0] ? "lastData" : "lastData lastDataClose"
                        }
                      >
                        <p>
                          {" "}
                          {expanded[0] ? content[0] : content[0].slice(0, 200)}
                        </p>
                        <div className="showButton">
                          <button onClick={() => toggleExpand(0)}>
                            {expanded[0] ? "See Less" : "See More"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="lastDivs">
                      <div className="threadA">
                        <img
                          src={up}
                          alt="up"
                          onClick={() => handleButton(1)}
                          style={{
                            transform: button[1]
                              ? "rotateZ(0deg)"
                              : "rotateZ(180deg)",
                            cursor: "pointer",
                          }}
                        />
                        <h4>Thread A</h4>
                      </div>
                      <div
                        className={
                          button[1] ? "lastData" : "lastData lastDataClose"
                        }
                      >
                        <p>
                          {" "}
                          {expanded[1] ? content[1] : content[1].slice(0, 200)}
                        </p>
                        <div className="showButton">
                          <button onClick={() => toggleExpand(1)}>
                            {expanded[1] ? "See Less" : "See More"}
                          </button>
                        </div>
                        <div>
                          <div className="threadA">
                            <h4>Example 1</h4>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {expanded[2]
                                ? content[2]
                                : content[2].slice(0, 200)}
                            </p>
                            <div className="showButton">
                              <button onClick={() => toggleExpand(2)}>
                                {expanded[2] ? "See Less" : "See More"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lastDivs">
                      <div className="intro">
                        <img
                          src={up}
                          alt="up"
                          onClick={() => handleButton(2)}
                          style={{
                            transform: button[2]
                              ? "rotateZ(0deg)"
                              : "rotateZ(180deg)",
                            cursor: "pointer",
                          }}
                        />
                        <h4>Transition 1</h4>
                      </div>
                      <div
                        className={
                          button[2] ? "lastData" : "lastData lastDataClose"
                        }
                      >
                        <p>
                          {" "}
                          {expanded[3] ? content[3] : content[3].slice(0, 200)}
                        </p>
                        <div className="showButton">
                          <button onClick={() => toggleExpand(3)}>
                            {expanded[3] ? "See Less" : "See More"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="lastDivs">
                      <div className="threadA">
                        <img
                          src={up}
                          alt="up"
                          onClick={() => handleButton(3)}
                          style={{
                            transform: button[3]
                              ? "rotateZ(0deg)"
                              : "rotateZ(180deg)",
                            cursor: "pointer",
                          }}
                        />
                        <h4>Thread B</h4>
                      </div>
                      <div
                        className={
                          button[3] ? "lastData" : "lastData lastDataClose"
                        }
                      >
                        <div>
                          <div className="threadA">
                            <h4>Example 1</h4>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {expanded[4]
                                ? content[4]
                                : content[4].slice(0, 200)}
                            </p>
                            <div className="showButton">
                              <button onClick={() => toggleExpand(4)}>
                                {expanded[4] ? "See Less" : "See More"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="threadA">
                            <h4>Example 2</h4>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {expanded[5]
                                ? content[5]
                                : content[5].slice(0, 200)}
                            </p>
                            <div className="showButton">
                              <button onClick={() => toggleExpand(5)}>
                                {expanded[5] ? "See Less" : "See More"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="threadA">
                            <h4>Example 3</h4>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {expanded[6]
                                ? content[6]
                                : content[6].slice(0, 200)}
                            </p>
                            <div className="showButton">
                              <button onClick={() => toggleExpand(6)}>
                                {expanded[6] ? "See Less" : "See More"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="threadA">
                            <h4>Example 4</h4>
                          </div>
                          <div>
                            <p>
                              {" "}
                              {expanded[7]
                                ? content[7]
                                : content[7].slice(0, 200)}
                            </p>
                            <div className="showButton">
                              <button onClick={() => toggleExpand(7)}>
                                {expanded[7] ? "See Less" : "See More"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lastDivs">
                      <div className="intro">
                        <img
                          src={up}
                          alt="up"
                          onClick={() => handleButton(4)}
                          style={{
                            transform: button[4]
                              ? "rotateZ(0deg)"
                              : "rotateZ(180deg)",
                            cursor: "pointer",
                          }}
                        />
                        <h4>Conclusion</h4>
                      </div>
                      <div
                        className={
                          button[4] ? "lastData" : "lastData lastDataClose"
                        }
                      >
                        <p>
                          {" "}
                          {expanded[8] ? content[8] : content[8].slice(0, 200)}
                        </p>
                        <div className="showButton">
                          <button onClick={() => toggleExpand(8)}>
                            {expanded[8] ? "See Less" : "See More"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryBoard;
