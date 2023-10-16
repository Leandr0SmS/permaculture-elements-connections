
import {Element} from "../source/class.js";

const w = 450, h = 300, r = w > h ? w/4 : h/4, cx=(w/2), cy=(h/2);

function calculateTextPositions(centerX, centerY, radius, points) {
    const angles = points.map(point => {
        const dx = point[0] - centerX;
        const dy = point[1] - centerY;
        return Math.atan2(dy, dx);
    });
    const textPositions = angles.map((angle, i) => {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return [x + (x - centerX) * 0.05, y + (y - centerY) * 0.05];
    });
    return textPositions
}

function textCorrection (centerX, centerY, points) {
  const correction = points.map(point => {
      let x = point[0];
      let y = point[1];
      if (x < centerX && y > centerY) {
          point[0] = x - 35;
          point[1] = y + 15;
      }
      if (x < centerX && y <= centerY) {
          point[0] = x - 50;
          point[1] = y - 5;
      }
      if (x >= centerX && y < centerY) {
        point[0] = x + 5;
        point[1] = y - 5;
    }
    if (x >= centerX && y >= centerY) {
        point[0] = x + 5;
        point[1] = y + 15;
    }
      return point;
  })
  return correction;
}

function  FormSitio ({
                        system_name_value, 
                        handleSitioFormChange, 
                        sitio_inputs_value, 
                        sitio_outputs_value, 
                        onNextclick
                    }) 
                {
    return (
        <div className="card">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
              <label className="form-label" htmlFor="system_name">What's the name of your system?</label>
              <input className="text-input" name="system_name" value={system_name_value} onChange={handleSitioFormChange} type="text" size="40" placeholder="Nome" required/>
              <label className="form-label" htmlFor="sitio_inputs">What does your element need (inputs)?</label>
              <input className="text-input" type="text" name="sitio_inputs" value={sitio_inputs_value} onChange={handleSitioFormChange} size="40" placeholder="agua, gasolina, gas"  required/>
              <label className="form-label" htmlFor="sitio_outputs">What does your element provide (outputs)?</label>
              <input className="text-input" type="text" name="sitio_outputs" value={sitio_outputs_value} onChange={handleSitioFormChange} size="40" placeholder="banana, sementes, açai" required/>
              <div className="div-btn">
                <button className="form-btn" name="formSitio" value="formElement" type="button" onClick={onNextclick}>
                  NEXT
                  <img className="btn-icon" src="../images/arrow-right.svg" alt="arrow icon to the rigth"/>
                </button>
              </div>
          </form> 
        </div>
    )
}

function FormElement({
                        element_name_value, 
                        element_inputs_value, 
                        element_Outputs_value, 
                        element_intrinsic_characteristics_value, 
                        onchange, 
                        onPrevClick, 
                        onAddClick, 
                        onConnectClick
                    }) {
    return (
        <div className="card">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="card-heading">Let's add elements!</h2>
                <label className="form-label" htmlFor="element_name">qual o nome do sistema?</label>
                <input className="text-input" type="text" name="element_name" value={element_name_value} onChange={onchange} placeholder="galinha" size="40" required/>
                <label className="form-label" htmlFor="element_inputs">O que o sistema precisa (inputs)?</label>
                <input className="text-input" type="text" name="element_inputs" value={element_inputs_value} onChange={onchange} size="40"  placeholder="agua, milho, abrigo, cerragem" required/>
                <label className="form-label" htmlFor="element_outputs">O que o sistema produz (outputs)?</label>
                <input className="text-input" type="text" name="element_outputs" value={element_Outputs_value} onChange={onchange} size="40" placeholder="ovo, esterco, carne, ciscar" required/>
                <label className="form-label" htmlFor="element_intrinsic_characteristics">Quais são as caracteristicas intrínsecas do sistema?</label>
                <input className="text-input" type="text" name="element_intrinsic_characteristics" value={element_intrinsic_characteristics_value} onChange={onchange} placeholder="calor, variedade genetica, socializaçao" size="40" required/>
                <div className="div-btn">
                    <button className="form-btn" type="button" name="formElement" value="formSitio" onClick={onPrevClick}>
                        <img className="btn-icon prev" src="../images/arrow-right.svg" alt="arrow icon to the rigth"/>
                        Preview
                    </button>
                    <button className="next form-btn" type="button" onClick={onAddClick}>
                        Add
                        <img className="btn-icon" src="../images/Plus.svg" alt="Plus icon"/>
                    </button>
                    <button className="next form-btn" type="button" name="formElement" value="elementCard" onClick={onConnectClick}>
                        Connect
                        <img className="btn-icon" src="../images/Connect.svg" alt="Connect icon"/>
                    </button>
                </div>
            </form> 
        </div>
    )
}

//Connectios and elements
function Sitio({sitioName, sitioInputs, sitioOutputs}) {
    let inputs = sitioInputs.map(str => str.charAt(0).toUpperCase() + str.slice(1));
    let outputs = sitioInputs.map(str => str.charAt(0).toUpperCase() + str.slice(1));
    return (
        <div className="element--title--info">
            <h1>{sitioName}</h1>
            <p><span>Entradas:</span> {inputs.join(', ')}</p>
            <p><span>Saídas:</span> {outputs.join(', ')}</p>
        </div>
    )
}

//App and States

function App() {

    const [componentsManagement, setComponentsManagement] = React.useState({
        formSitio: true,
        formElement: false,
        elementCard: false
    });

    const [formSitioData, setFormSitioData] = React.useState({
        system_name: "",
        sitio_inputs: "",
        sitio_outputs: ""
    });

    const initalformElementsData = {
        element_name: "",
        element_inputs: "",
        element_outputs: "",
        element_intrinsic_characteristics: ""
    }

    const [formElementsData, setFormElementData] = React.useState(initalformElementsData);

    const [sitioData, setSitioData] = React.useState({});

    const [connectionsData, setConnectionsData] = React.useState({})

    const [elementsArray, setElementsArray] = React.useState([]);

    function handleFormSequence (e) {
        const {name, value} = e.target;
        setComponentsManagement( cm => ({
            ...cm,
            [name]: false,
            [value]: true
        }))
    };

    function handleSitioFormChange(e) {
        const {value, name} = e.target;
        setFormSitioData(fsd => ({
            ...fsd,
            [name]: value
        }))
    };

    function onNextClick (e) {
        handleFormSequence(e);
    };

    function handleElementFormChange(e) {
        const {name, value} = e.target;
        setFormElementData(fed => ({
            ...fed,
            [name]: value
        }))
    };

    function handleAddElement() {
        const name = formElementsData.element_name;
        const inputs = formElementsData.element_inputs.split(', ');
        const outputs = formElementsData.element_outputs.split(', ');
        setElementsArray([
            ...elementsArray,
            new Element (name, inputs, outputs, [])
        ]);
        setFormElementData(initalformElementsData);
    };

    function handleSitioCreate() {
        const name = formSitioData.system_name;
        const outputs = formSitioData.sitio_outputs.split(', ');
        const inputs = formSitioData.sitio_inputs.split(', ');
        //create a sitio
        const sitio = new Element (name, inputs, outputs, elementsArray);
        //define position in a circle pattern
        const positions = sitio.positionElementsInCircle((w/2), (h/2), r, elementsArray);
        //Add texet to dots
        const textPositons = calculateTextPositions(cx, cy, r, positions);
        //correct text depend on the position at the circle
        const textPositonsCorrected = textCorrection(cx, cy, textPositons);
        //create relations
        sitio.getRelationships();
        //Set states
        setConnectionsData(cd => ({...cd, textPositonsCorrected}));
        setSitioData(sitio);
    };

    function connectElements (e) {
        handleSitioCreate();
        handleFormSequence(e);
    };

    let circles;
    let lines;
    let dotsText;
    if (Object.keys(sitioData).length !== 0) {
        circles = sitioData.elements.map((elem, i) => {
            return (
                <React.Fragment key={i}>
                    <circle key={i} cx={elem.circlePosition[0]} cy={elem.circlePosition[1]} r={5} fill="red" />
                </React.Fragment>
            )
        });
        lines = sitioData.relationshipsLines.map((elem, i) => {
            return (
                <React.Fragment key={i}>
                    <line key={i} x1={elem.positionX1Y1[0]} y1={elem.positionX1Y1[1]} x2={elem.positionX2Y2[0]} y2={elem.positionX2Y2[1]} stroke="black" />
                </React.Fragment>
            )
        });
        dotsText = connectionsData.textPositonsCorrected.map((elem, i) => {
            return (
                <React.Fragment key={i}>
                    <text x={elem[0]} y={elem[1]}>{sitioData.elements[i].name}</text>
                </React.Fragment>
            )
        })
    }
    

    //consoles
    console.log(sitioData);
    console.log(connectionsData);

    return (
        <React.Fragment>
            {componentsManagement.formSitio && <FormSitio
                onNextclick={onNextClick} 
                handleSitioFormChange={handleSitioFormChange}
                //Inputs values
                system_name_value={formSitioData.element_name}
                sitio_inputs_value={formSitioData.element_inputs}
                sitio_outputs_value={formSitioData.element_outputs}
            />}
            {componentsManagement.formElement && <FormElement
                onPrevClick={handleFormSequence}
                onAddClick={handleAddElement}
                onConnectClick={connectElements}
                onchange={handleElementFormChange} 
                //inputs values
                element_name_value={formElementsData.element_name}
                element_inputs_value={formElementsData.element_inputs}
                element_Outputs_value={formElementsData.element_outputs}
                element_intrinsic_characteristics_value={formElementsData.element_intrinsic_characteristics}
            />}
            {
                componentsManagement.elementCard 
                &&
                <div className="element">
                    <Sitio
                        sitioName={sitioData.name}
                        sitioInputs={sitioData.inputs}
                        sitioOutputs={sitioData.outputs}
                    />
                    <svg width={w} height={h} className="svg">
                        {circles}
                        {lines}
                        {dotsText}
                    </svg>
                </div> 
            }
        </React.Fragment>
    )
}

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);
root.render(<App/>);
