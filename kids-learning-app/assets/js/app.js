const components = {
    bodyContainer : () => {
        let body = document.querySelectorAll(".body-flex")[0]; ///changes....var => let
        body.innerHTML = "";
        return body;
    },

    titleDiv : () => {
        let title = document.createElement('div');
        title.setAttribute("class","title");
        return title;
    },

    checkIcon: (str) => {
        let chkicon = document.createElement('i');
        chkicon.classList.add("fa-solid");
        chkicon.classList.add("fa-check");
        chkicon.classList.add(str);
        chkicon.onclick = (event) => {
            event.preventDefault();
        };
        return chkicon;
    },

    circleButton : () => {
        let circle = document.createElement('div');
        circle.setAttribute("class","circle");
        return circle;
    },

    triangleButton : () => {
        let triangle = document.createElement('div');
        triangle.setAttribute("class","triangle");
        return triangle;
    },

    squareButton : () => {
        let square = document.createElement('div');
        square.setAttribute("class","square");
        return square;
    },

    nextButton : () => {
        let nextButton = document.createElement('button');
        nextButton.setAttribute("class","nextButton");
        return nextButton;
    },

    inputBox : () => {
        let inputBox = document.createElement('input');
        inputBox.setAttribute("type","number");
        inputBox.setAttribute("class","dimension");
        inputBox.setAttribute("min","0");
        return inputBox;
    },
}

// local Storage object
const lsShape = {
    dimensionName:"",
    dimensionFormula:"",
    dimension:"",
    areaName:"AREA",
    areaFormula: "",
    area:"",
    perimeterName:"PERIMETER",
    perimeterFormula: "",
    perimeter: "",
    page:"",
    shape: "",
    isSelected : false,
}


// Each page is written as a function to render
const pages = {
    // returns the choose page(1st page)
    choose: () => {
        let lsobj = JSON.parse(localStorage.getItem("lsShape"));
        let body = components.bodyContainer();
        var shapes = document.createElement('div');
        shapes.setAttribute("class","shapes-container");

        let title = components.titleDiv();
        title.innerText = "1. Choose a Shape"

        let nextButton = components.nextButton();
        nextButton.innerText = "NEXT";
        nextButton.addEventListener("click",() => {
            lsobj.page = 2;
            localStorage.setItem("lsShape",JSON.stringify(lsobj));
            return loadBodyPage(); 
        });
        let circle = components.circleButton();
        circle.append(components.checkIcon("chkcircle"));
        
        let triangle = components.triangleButton();
        triangle.append(components.checkIcon("chktriangle"));
        
        let square = components.squareButton();
        square.append(components.checkIcon("chksquare"));

        shapes.append(circle,triangle,square);
        body.append(title,shapes);

        document.querySelectorAll(".fa-check").forEach(el => el.style.display = "none");
        
        if(lsobj.isSelected != false){
            body.append(nextButton);
        }

        shapes.addEventListener("click", (event) => {
            document.querySelectorAll(".fa-check").forEach(el => el.style.display = "none");
            if(event.target.className.indexOf("chk") >= 0){
                lsobj.shape = event.target.className.split(" ")[2].slice(3);
                console.log(lsobj.shape);
            }else{
                lsobj.shape = event.target.className;
                console.log(lsobj.shape);
            }
            document.querySelector(".chk" + lsobj.shape).style.display = "inline";
            lsobj.isSelected = true;
            localStorage.setItem("lsShape",JSON.stringify(lsobj));
            body.append(nextButton);
        });
    },

    // returns the dimension page(2nd page)
    dimension:() => {
        var lsobj = JSON.parse(localStorage.getItem("lsShape"));
        var body = components.bodyContainer();
        var title = components.titleDiv();
        var inputBox = components.inputBox();
        var calculate = components.nextButton();
        calculate.innerText = "CALCULATE";

        switch(lsobj.shape){
            case('circle'):
                title.innerText = "2. Enter Radius";
                inputBox.setAttribute("placeholder","Enter Radius...");
                break;
            case('triangle'):
                title.innerText = "2. Enter Side (Base & Height)";
                inputBox.setAttribute("placeholder","Enter base height...");
                break;
            case('square'):
                title.innerText = "2. Enter Side";
                inputBox.setAttribute("placeholder","Enter side...");
                break;
        }
        
        calculate.addEventListener("click",() => {
            var inp = parseInt(inputBox.value);
            if(inp <= 0 || inputBox.value === ''){
                alert("Enter proper dimension.");
            }else{
                lsobj.dimension = inp;
                lsobj.page = 3;
                localStorage.setItem("lsShape",JSON.stringify(lsobj));
                // calculate function is called here and the local storage object is set here.
                calculateFunc();
                return loadBodyPage();
            }
        });
        body.append(title,inputBox,calculate);
    },

    // returns the result page(3rd page)
    result: () => {
        var lsobj = JSON.parse(localStorage.getItem("lsShape"));
        var body = components.bodyContainer();
        var titleText = components.titleDiv();
        var shape="";

        switch(lsobj.shape){
            case('circle'):
                shape = components.circleButton();
                titleText.innerText = "Circle";
                break;
            case('triangle'):
                shape = components.triangleButton();
                titleText.innerText = "Equilateral Triangle";
                break;
            case('square'):
                shape = components.squareButton();
                titleText.innerText = "Square";
                break;
        };

        body.append(shape,titleText);
        var table = document.createElement('div');
        table.setAttribute("class","table");
        table.innerHTML = `
            <div class='row'><div class="col1">${lsobj.dimensionName}</div><div class="col2">${lsobj.dimensionFormula}</div><div class="col3">${lsobj.dimension}</div></div>
            <div class='row'><div class="col1">${lsobj.areaName}</div><div class="col2">${lsobj.areaFormula}</div><div class="col3">${lsobj.area}</div></div>
            <div class='row'><div class="col1">${lsobj.perimeterName}</div><div class="col2">${lsobj.perimeterFormula}</div><div class="col3">${lsobj.perimeter}</div></div>
        `;

        body.append(table);
        var nextButton = components.nextButton();
        nextButton.innerText = "START AGAIN";
        nextButton.addEventListener("click", () => {
            localStorage.clear();
            return loadBodyPage();
        });
        body.append(nextButton);
    }
}


// functions to calculate area & perimeter
function calculateFunc(){
    var lsobj = JSON.parse(localStorage.getItem("lsShape"));
    var dimension = parseInt(lsobj.dimension);
    if(lsobj.shape == 'circle'){
        lsobj.perimeter = (2 * Math.PI * dimension).toFixed(2) + " cm";
        lsobj.area = (Math.PI * dimension * dimension).toFixed(2) + " sq cm";
        lsobj.dimensionName = "RADIUS";
        lsobj.dimensionFormula = "r";
        lsobj.perimeterFormula = "2 * 𝝅 * r";
        lsobj.areaFormula = "𝝅 * r * r";
    }else if(lsobj.shape == 'triangle'){
        lsobj.perimeter = (3 * dimension).toFixed(2) + " cm";
        lsobj.area = (0.433 * dimension * dimension).toFixed(2) + " sq cm";
        lsobj.dimensionName = "SIDE";
        lsobj.dimensionFormula = "s";
        lsobj.perimeterFormula = "3 * s";
        lsobj.areaFormula = "0.433 * s * s";
    }else if(lsobj.shape == 'square'){
        lsobj.perimeter = (4 * dimension).toFixed(2) + " cm";
        lsobj.area = (dimension * dimension).toFixed(2) + " sq cm";
        lsobj.dimensionName = "SIDE";
        lsobj.dimensionFormula = "a";
        lsobj.perimeterFormula = "4 * a";
        lsobj.areaFormula = "a * a";
    }
    localStorage.setItem("lsShape",JSON.stringify(lsobj));
}

//main function for page switch and page handling
function loadBodyPage(){
    if(localStorage.getItem("lsShape") == null){
        lsShape.page = 1;
        lsShape.isSelected = false;
        localStorage.setItem("lsShape",JSON.stringify(lsShape));
        return pages.choose();
    }
    const lsobj = JSON.parse(localStorage.getItem("lsShape"));
    if(lsobj.page == 1 || lsobj.shape == null || lsobj.isSelected === false) {
        return pages.choose();
    } else if(lsobj.page == 2 || lsobj.dimension == null) {
        return pages.dimension();
    } else if(lsobj.page == 3){
        return pages.result();
    } else{
        return pages.choose();
    }
}

loadBodyPage(); 