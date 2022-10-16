import React, { createRef, useEffect, useRef, useState, useMemo } from 'react'
import { useGameMode } from '../Context/GameModes';
import UpperMenu from './UpperMenu';
var randomWords = require('random-words');

const TypingBox = () => {
    // console.log(words);

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);          //Checks if user input is correct or not
    const [countDown, setCountDown] = useState(5);
    const [testStart, setTestStart] = useState(false);
    const [testOver, setTestOver] = useState(false);
    const [wordsArray, setWordsArray] = useState(()=>{
        return randomWords(50);
    });

    const [intervalId, setIntervalId] = useState(null);
    const words = useMemo(()=>{
        return wordsArray;
    },[wordsArray]);

    const wordSpanRef = useMemo(()=>{
        return Array(words.length).fill(0).map(i=>createRef());
    },[words])
    // const [words,setWords] = useState([]);
    // const [wordSpanRef, setWordsSpanRef] = useState([]);
    const {gameTime} = useGameMode();



    const resetGame = () => {
        setCurrCharIndex(0);
        setCurrWordIndex(0);
        setCountDown(gameTime);
        setTestStart(false);
        setTestOver(false);
        clearInterval(intervalId);
        let random=randomWords(50);
        setWordsArray(random);
        focusInput();
        // setWordsSpanRef(Array(words.length).fill(0).map(i=>createRef()));
    }

    useEffect(()=>{
        resetGame();
    },[gameTime])

    // const wordSpanRef = Array(words.length).fill(0).map(i=>createRef());

    const textInputRef=useRef(null);           //creates an object with which we can point to any instance

    const startTimer = () => {
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer(){
            console.log("works");
            setCountDown((prevCountDown)=>{

                if(prevCountDown===1){
                    clearInterval(intervalId);
                    setCountDown(0);
                    setTestOver(true);
                }
                else{
                    return prevCountDown-1;
                }

            });
        }
    }

    // console.log(textInputRef);

    const handleKeyDown=(e) => {
        console.log("down",e);

        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        let allSpans = wordSpanRef[currWordIndex].current.querySelectorAll('span');
        
        //logic for space
        if(e.keyCode===32){

            const incorrectChar = wordSpanRef[currWordIndex].current.querySelectorAll('.incorrect')
            if(incorrectChar.length!==0){
                // correctWord+=1;
            }
            if(allSpans.length===currCharIndex){
                allSpans[currCharIndex-1].className = allSpans[currCharIndex-1].className.replace("right","");
            }

            else{
                allSpans[currCharIndex].className = allSpans[currCharIndex-1].className.replace("current","");
            }

            wordSpanRef[currWordIndex+1].current.querySelectorAll('span')[0].className = 'char current';
            setCurrWordIndex(currWordIndex+1);
            setCurrCharIndex(0);
            return;
        }

        //logic for backspace
        if(e.keyCode===8){
            if(currCharIndex!==0){

                if(currCharIndex===allSpans.length){
                    if(allSpans[currCharIndex-1].className.includes("extra")){
                        allSpans[currCharIndex-1].remove();
                        // allSpans[currCharIndex-2].className+=' right';
                    }
                    else{
                        allSpans[currCharIndex-1].className='char current';
                    }
                    setCurrCharIndex(currCharIndex-1);
                    return;
                }

                wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].className='char';
                wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex-1].className='char current';
                setCurrCharIndex(currCharIndex-1);
            }
            return;
        }

        if(e.key.length!==1){
            return;
        }

        if(currCharIndex===allSpans.length){
            let newSpan=document.createElement('span');     
            newSpan.innerText=e.key;
            newSpan.className='char incorrect right extra';
            allSpans[currCharIndex-1].className = allSpans[currCharIndex-1].className.replace("right","");

            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex+1);
            return;
        }

        let key=e.key;

        let currentCharacter = wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].innerText;

        if(key===currentCharacter){
            console.log("correct key pressed");
            wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].className='char correct';
        }
        else{
            console.log("incorrect key pressed");
            wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].className='char incorrect';
        }
        if(currCharIndex+1===wordSpanRef[currWordIndex].current.querySelectorAll('span').length){
            wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].className += ' right';
        }
        else{
            wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex+1].className='char current';
            setCurrCharIndex(currCharIndex+1);
        }

    }
    const handleKeyUp=(e) => {
        console.log("up",e);
    }

    const focusInput = () => {
        textInputRef.current.focus();                        //focussing on the input as soon as the page loads 
    }
    
    useEffect(()=>{
        // let random=randomWords(50);
        // setWordsArray(random);
        // setWordsSpanRef(Array(words.length).fill(0).map(i=>createRef()));
        focusInput();  
        // wordSpanRef[0].current.querySelectorAll('span')[0].className='char current';                        
    },[]);

    useEffect(()=>{

        wordSpanRef.map(i=>{
            Array.from(i.current.childNodes).map(ii=>{
                ii.className='char';
            })
        })

        if(wordSpanRef[0]){
            wordSpanRef[0].current.querySelectorAll('span')[0].className='char current';
        }
    },[wordSpanRef]);

    // const callbackTime = (time) => {
    //     console.log("Time we got from child", time)
    //     setCountDown(time);
    // }

    return(
        <>
        <UpperMenu countDown={countDown} />                                     

        {!testOver?(<div className="type-box" onClick={focusInput}>
            <div className="words">

                {words.map((word,index)=>(
                    <span className="word" ref={wordSpanRef[index]}>
                        {word.split("").map((char,ind)=>(
                            <span className="char">
                                {char}
                            </span>
                        ))}
                </span>
                ))}
            </div>
        </div>):(<h1>Game Over</h1>)}
        
        <input 
            type='text'
            className='hidden-input'
            ref={textInputRef}
            onKeyDown={(e)=>handleKeyDown(e)}
            onKeyUp={(e)=>handleKeyUp(e)}
        />
        </>
    )
}

export default TypingBox;