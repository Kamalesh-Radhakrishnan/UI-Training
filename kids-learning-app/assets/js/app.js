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
        chkicon.classList.add("hide");
        chkicon.classList.add(str);
        chkicon.onclick = (event) => {
            event.preventDefault();
        };
        return chkicon;
    },

    shape: (str) => {
        let shapebutton = document.createElement('div');
        shapebutton.setAttribute("class",str);
        return shapebutton;
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

//shapes and their respective properties/behaviours reused in code.
const shapesDS = {
    "circle": {
        class: "circle",
        titleText: "2. Enter Radius",
        placeholder: "Enter Radius...",
        shapeTitle: "Circle",
        dimensionName: "RADIUS",
        dimensionFormula: "r",
        perimeterFormula: "2 * 𝝅 * r",
        areaFormula: "𝝅 * r * r",
        perimeter: (dimension) => {
            perimeter=(2 * Math.PI * dimension).toFixed(2);
            return perimeter;
        },
        area: (dimension) => {
            area = (Math.PI * dimension * dimension).toFixed(2);
            return area;
        },
    },
    "triangle" : {
        class: "triangle",
        titleText: "2. Enter Side (Base & Height)",
        placeholder: "Enter base height...",
        shapeTitle: "Equilateral Triangle",
        dimensionName : "SIDE",
        dimensionFormula : "s",
        perimeterFormula : "3 * s",
        areaFormula : "0.433 * s * s",
        perimeter: (dimension) => {
            perimeter=(3 * dimension).toFixed(2);
            return perimeter;
        },
        area: (dimension) => {
            area = (0.433 * dimension * dimension).toFixed(2);
            return area;
        },
    },
    "square" : {
        class: "square",
        titleText: "2. Enter Side",
        placeholder: "Enter side...",
        shapeTitle: "Square",
        dimensionName: "SIDE",
        dimensionFormula: "a",
        perimeterFormula: "4 * a",
        areaFormula: "a * a",
        perimeter: (dimension) => {
            perimeter = (4 * dimension).toFixed(2);
            return perimeter;
        },
        area: (dimension) => {
            area = (dimension * dimension).toFixed(2);
            return area;
        }
    }
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

        for (const key in shapesDS) {
            let shape = components.shape(key);
            let icon = components.checkIcon("chk" + key)
            shape.append(icon);
            shapes.append(shape);
        }
        body.append(title,shapes);

        if(lsobj.isSelected != false){
            body.append(nextButton);
        }

        shapes.addEventListener("click", (event) => {
            if(lsobj.shape != ''){
                const uncheck = document.querySelector("." + lsobj.shape + " i");
                uncheck.classList.add("hide");
            }
            if(event.target.className.indexOf("chk") >= 0){
                lsobj.shape = event.target.className.split(" ")[2].slice(3);
            }else{
                lsobj.shape = event.target.className;
            }
            const check = document.querySelector("." + lsobj.shape + " i");
            check.classList.remove("hide");
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


        ///TtileText & placeholder
        title.innerText = shapesDS[lsobj.shape].titleText;
        inputBox.setAttribute("placeholder",shapesDS[lsobj.shape].placeholder);
        calculate.addEventListener("click",() => {
            var inp = parseInt(inputBox.value);
            if(inp <= 0 || inputBox.value === '' || inp >= 800){
                inputBox.value='';
                alert("Enter proper dimension.\n0 < dimension < 800");
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

        shape = components.shape(lsobj.shape);
        titleText.innerText = shapesDS[lsobj.shape].shapeTitle;

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
    lsobj.perimeter = shapesDS[lsobj.shape].perimeter(dimension) + " cm";
    lsobj.area = shapesDS[lsobj.shape].area(dimension) + " sq cm";
    lsobj.dimensionName = shapesDS[lsobj.shape].dimensionName;
    lsobj.dimensionFormula = shapesDS[lsobj.shape].dimensionFormula;
    lsobj.perimeterFormula = shapesDS[lsobj.shape].perimeterFormula;
    lsobj.areaFormula = shapesDS[lsobj.shape].areaFormula;
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
