import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before{
    box-sizing: border-box;
}
body{
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:100%;
    width:100%;
    background:black;
    color:#fff;
    padding:0;
    margin:0;
    transistion:all 0.25s linear
}

.canvas{
    align-items:center;
    display:grid;
    gap:0.5rem;
    grid-auto-flow:row;
    grid-template-row:auto 1fr auto;
    min-height:100vh;
    padding:1rem;
    width:100vw;

}

.type-box{
    display:block;
    max-width:1000px;
    height:140px;
    overflow:hidden;
    margin-left:auto;
    margin-right:auto;
    position:relative;
    // align-items:center;
}

.words{
    font-size:28px;
    display:flex;
    flex-wrap:wrap;
    align-content:center;
    width:100%;
}

.word{
    margin:5px 5px;
    padding-right:2px;
    scroll-margin:4px;
}

.hidden-input{
    opacity:0
}

.char.correct{
    color:green;
}

.char.incorrect{
    color:red;
}

.char.current{
    border-left:1px solid;
    animation:blinking 2s infinite;
    animation-timing-function:ease;

    @keyframes blinking{
        0% {border-left-color:#fff;}
        15% {border-left-color:black;}
        30% {border-left-color:#fff;}
        45% {border-left-color:black;}
        60% {border-left-color:#fff;}
        75% {border-left-color:black;}
        90% {border-left-color:#fff;}
        100% {border-left-color:black;}
    }
}

.char .right{
    border-right:1px solid;
    animation:blinkingRight 2s infinite;
    animation-timing-function:ease;

    @keyframes blinkingRight{
        0% {border-right-color:#fff;}
        15% {border-right-color:black;}
        30% {border-right-color:#fff;}
        45% {border-right-color:black;}
        60% {border-right-color:#fff;}
        75% {border-right-color:black;}
        90% {border-right-color:#fff;}
        100% {border-right-color:black;}
    }
}

.upper-menu{
    display:flex;
    max-width:1000px;
    margin-left:auto;
    margin-right:auto;
    // padding-left:0.5rem;
    justify-content: space-between;
    padding:1rem;
    

}

.counter{
    margin-right:700px;
    font-size:20px;
    padding-left:0.5rem;
}

.time-mode{
    display: flex;
    padding-left:10px

}

.time{
    font-size:20px;
    margin-right:15px;
}

.time:hover{
    color:red;
    cursor:pointer;
}
.heading{
    color:#fff;
}
`;