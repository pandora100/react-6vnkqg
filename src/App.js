import React, { useRef, useState } from "react";

import styled from "styled-components";

const S = {};

S.div = styled.div`
  border: 1px dotted blue;
`;

export default function App() {
  const divRef = useRef(null);
  const [html, setHTML] = useState("<div>teclear<br></div>");

  function onInput() {
    const root = divRef.current;

    setHTML(root.innerHTML);
    setTimeout(() => placeCaret(root.innerText.length), 100);
    //placeCaret(root.innerText.length);
  }

  // PLACE CARET BACK IN POSITION
  function placeCaret(position) {
    const root = divRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.setStart(root.firstChild.firstChild, position);
  }

  function onKeyDown(e) {
    console.log("On keydown... " + e.key);
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <React.Fragment>
      <S.div
        contentEditable
        ref={divRef}
        onInput={onInput}
        onKeyDown={onKeyDown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </React.Fragment>
  );
}