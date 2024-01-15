import React from "react";

function HeaderBar() {
    return (
        <header className="header">
            <div className="logo">
            {<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <style type="text/css">
                   {` .st0 { fill: #39A7FF; }
                    .st1 { fill: #222222; }
                    .st2 { fill: #FFFFFF; }`}
                </style>
                <g class="layer">
                    <title>Layer 1</title>
                    <g id="svg_18">
                    <g id="svg_19">
                        <g id="svg_20">
                        <path class="st0" d="m0,15.3c-0.2,-8 6.1,-14.6 14.1,-14.8c8,-0.2 14.6,6.1 14.8,14.1c0,0.3 0,0.5 0,0.8c-0.2,8 -6.9,14.3 -14.9,14.1c-7.6,-0.3 -13.8,-6.5 -14,-14.2l0,0z" fill="#39a7ff" id="vor3h"/>
                        </g>
                    </g>
                    <g id="svg_21">
                        <g id="svg_22">
                        <path class="st2" d="m22.9,17.2c0,0.2 0,0.4 0,0.6c0,3.3 -3.8,5.9 -8.5,5.9c-4.7,0 -8.5,-2.6 -8.5,-5.9c0,-0.2 0,-0.4 0,-0.6c-1.1,-0.5 -1.5,-1.7 -1.1,-2.8c0.3,-0.8 1.1,-1.3 1.9,-1.2c0.6,0 1.1,0.2 1.5,0.6c1.7,-1.1 3.7,-1.8 5.7,-1.8l1.1,-5c0,-0.1 0.1,-0.2 0.1,-0.2c0.1,-0.1 0.2,-0.1 0.3,-0.1l3.5,0.8c0.4,-0.7 1.3,-1.1 2,-0.7c0.7,0.4 1.1,1.3 0.7,2c-0.4,0.7 -1.3,1.1 -2,0.7c-0.5,-0.2 -0.8,-0.7 -0.8,-1.3l-3.1,-0.7l-1,4.5c2.2,0.1 4.2,0.8 5.6,1.8c0.8,-0.8 2.2,-0.8 3,0c0.4,0.4 0.6,0.9 0.6,1.5c0.3,0.9 -0.3,1.6 -1,1.9zm-11.7,1.1c0.8,0 1.5,-0.7 1.5,-1.5s-0.7,-1.5 -1.5,-1.5s-1.5,0.7 -1.5,1.5s0.6,1.5 1.5,1.5zm6.9,1.9c-0.2,-0.2 -0.4,-0.2 -0.5,0c-0.6,0.7 -2,0.9 -3,0.9c-1,0 -2.4,-0.2 -3,-0.9c-0.2,-0.2 -0.4,-0.2 -0.5,0c-0.2,0.2 -0.2,0.4 0,0.5c1,1 3,1.1 3.6,1.1c0.6,0 2.5,-0.1 3.6,-1.1c-0.1,-0.1 -0.1,-0.3 -0.2,-0.5zm1.2,-3.4c0,-0.8 -0.7,-1.5 -1.5,-1.5s-1.5,0.7 -1.5,1.5s0.7,1.5 1.5,1.5s1.5,-0.7 1.5,-1.5z" fill="#39a7ff" id="vor3i"/>
                        </g>
                    </g>
                    </g>
                </g>
            </svg>}
            <p><span>Mini</span>Reddit</p>
            </div>
            <form className="search">
                <input type="text" placeholder="Search" aria-label="Search posts" value=""></input>
                <button type="submit" aria-label="Search">SearchIcon</button>
            </form>
        </header>
    );
} 

export default HeaderBar;