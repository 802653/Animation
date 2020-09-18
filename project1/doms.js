function GameArea(){
    //  Wrapper Div
    this.wrapperDiv = document.getElementById("wrapperDiv");
    this.wrapperDiv.setAttribute("style", " background-color:yellow; border: 5px solid black; width:900px; height:800px;");
    // create tileMenuDiv
    this.tileMenuDiv = document.createElement("div");
    this.wrapperDiv.appendChild(this.tileMenuDiv)
    this.tileMenuDiv.setAttribute("style", " background-color:#033c4a; width:900px; height:100px;float:left;");
}