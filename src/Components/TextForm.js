import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function TextForm(props) {

    const handleUpClick = ()=> {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase!", "success");
    }

    const handleLowClick = ()=> {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase!", "success");
    }

    const handleClearClick = ()=> {
        let newText = "";
        setText(newText);
        props.showAlert("Text cleared!", "success");
    }

    const handleCapClick = ()=> {
        let newText = text.split(" ");
        let firstLetter = "", word="", newText2 = "";
        let l = newText.length;
        for(let i=0;i<l;i++) {
            firstLetter = newText[i].charAt(0).toUpperCase();
            word = firstLetter + newText[i].substring(1, newText[i].length).toLowerCase();
            if(i !== l-1)
                newText2 = newText2 + word + " ";
            else
                newText2 = newText2 + word;
            word="";
        }
        setText(newText2);
        props.showAlert("Converted to Capitalize Case!", "success");
    }

    const handleCopy = ()=> {
        let newText = document.querySelector("#myBox");
        newText.select();
        navigator.clipboard.writeText(newText.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Text copied to the clipboard!", "success");
    }

    const handleExtraSpaces = ()=> {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleOnChange = (event)=> {
        setText(event.target.value)
    }

    const wordCount = (count)=> {
        let w="",ch="";
        let c = 0;
        for(let i=0; i<text.length;i++) {
            ch = text.charAt(i);
            if(ch !== " ") {
                w = w + ch;
            }
            else {
                if(w.length>0 && w.charAt(0) !== " ")
                c++;
                w="";
            }
        }
        if(text.charAt(-1) !== " " && text.charAt(0) !== " ")
        c++;
        if(text === "")
        c=0;

        count = c;
        return count;
    }

    const [text, setText] = useState("Enter your text here");
    // setText("Updated text");   this is a way to assign new value to text(we cannot use text="svvvfvww")
  return (
    <>
        <div className="container" style={{color: props.mode==="light"?"#042743":"white"}}>
            <h1 className="my-3">{props.headings}</h1>
            <div className="mb-3">
                <textarea className="form-control" style={{backgroundColor: props.mode==="light"?"white":"#13466e", color: props.mode==="light"?"#042743":"white"}} value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>

            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleLowClick}>Convert to Lowercase</button>

            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleClearClick}>Clear text</button>

            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleCapClick}>Capitilize Case</button>

            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleCopy}>Copy Text</button>

            <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        </div>

        <div className="container my-3" style={{color: props.mode==="light"?"#042743":"white"}}>
            <h2>Your Text Summary</h2>
            <p>{wordCount()} words and {text.length} characters.</p>
            <p>{wordCount() * 0.008} minutes read</p>
            <h4>Preview</h4>
            <p>{text.length > 0?text:"Nothing to preview."}</p>
        </div>
    </>
  )
}

TextForm.propTypes = {
    heading: PropTypes.string
}