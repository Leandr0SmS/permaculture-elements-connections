export class Element {
    constructor (name, inputs, outputs, elements) {
        this._name = name;
        this._inputs = inputs;
        this._outputs = outputs;
        this.elements = elements;
        this.circlePosition = [];
        this.location = [];
        this.relationships = [];
        this.relationshipsLines = [];
    };

    //getter and setters
    get name () {
        return this._name;
    };
    get inputs () {
        return this._inputs;
    };
    get outputs () {
        return this._outputs;
    };
    set name (name) {
        this._name = name;
    };
    set inputs (inputs) {
        this._inputss = [inputs]
    };
    set outputs (outputs) {
        this._outputs = [outputs];
    };

    //tell to terminal what element is
    howAmI () {
        return `${this.name}: Inputs: ${this.inputs.join(', ')}. Outputs: ${this.outputs.join(', ')}.`;
    };
    
    //Method to compare two elements inputs and outputs. 
    exchange (obj) {
        let gives = [];
        let recives = []; 
        //lopp for gives
        for (let i = 0; i < this.outputs.length; i ++) {
            if (obj.inputs.includes(this.outputs[i])){
               gives.push(this.outputs[i]);
            }
        };
        //loop for recives
        for (let j = 0; j < this.inputs.length; j ++) {
            if (obj.outputs.includes(this.inputs[j])) {
                recives.push(this.inputs[j]);
            }
        };
        //returns conditions
        if (gives.length === 0 && recives.length === 0) {
            return false;
        } else if (gives.length > 0 && recives.length > 0) {
            return {gives, recives};
        } else if (gives.length > 0 || recives.length > 0) {
            return {gives} || {recives};
        } else {
            return false;
        };
    };

    //Method to print in the terminal what are the elements exchanges with other argument element
    sayYourExchangeWith (obj) {
        if (this.exchange(obj).gives && this.exchange(obj).recives) {
            return `\nI ${this.name} give to ${obj.name}: ${this.exchange(obj).gives}\nI recive from ${obj.name}: ${this.exchange(obj).recives}`;
        } else if (this.exchange(obj).gives && !this.exchange(obj).recives) {
            return `\nI ${this.name} give to ${obj.name}: ${this.exchange(obj).gives}`;
        } else if (!this.exchange(obj).gives && this.exchange(obj).recives) {
            return `\nI ${this.name} recive from ${obj.name}: ${this.exchange(obj).recives}`;
        } else {
            return 'There is no exchange.';
        }
    }

    //return the connection between elements and the number of connections
    getRelationships() {
        let counter = 0;
        const relationships = [];
        const relationshipsLines = []
        for (let i = 0; i < this.elements.length; i++) {
          for (let ii = 0; ii < this.elements.length; ii++) {
            if (this.elements[i].name === this.elements[ii].name) {
              continue
            }
            for (let iii = 0; iii < this.elements[i].inputs.length; iii++) {
              for (let iiii = 0; iiii < this.elements[ii].outputs.length; iiii++) {
                if (this.elements[i].inputs[iii] === this.elements[ii].outputs[iiii]) {
                  counter ++;
                  relationshipsLines.push( 
                    {
                        'positionX1Y1': this.elements[ii].circlePosition, 
                        'outputsX1Y1': this.elements[ii].outputs[iiii], 
                        'positionX2Y2': this.elements[i].circlePosition, 
                        'inputsX2Y2': this.elements[i].inputs[iii]
                    }
                  )
                  relationships.push(
                    { 
                        'elementOutput': this.elements[ii],
                        'output': this.elements[ii].outputs[iiii],
                        'elementInput': this.elements[i],
                        'input': this.elements[i].inputs[iii],
                    }
                  )
                }
              }
            }
          }
        }
        this.relationships.push(...relationships);
        this.relationshipsLines.push(...relationshipsLines);
        return {relationshipsLines, counter, relationships}
      }

    // define circle positions
    positionElementsInCircle(centerX, centerY, radius, elements) {
        let positions = [];
        let numElements = elements.length;
        let angleBetweenElements = 2 * Math.PI / numElements;
      
        for (var i = 0; i < numElements; i++) {
          let angle = i * angleBetweenElements;
          let x = centerX + radius * Math.cos(angle);
          let y = centerY + radius * Math.sin(angle);
          positions.push([x, y]);
        }
        for (let i = 0; i < this.elements.length; i ++) {
            this.elements[i].circlePosition = positions[i];
        }
        return positions;
    }

    //function to creat outputs lines for each node
    elementsIn_Outputs (relationships) {
        let outputsLines = [];
        let inputsLines = [];
        for (let obj of relationships) {
            if (obj.elementOutput.name === this.name) {
                outputsLines.push(
                    {
                        'elemOutputName': obj.elementOutput.name,
                        'outputsX1Y1': obj.elementOutput.circlePosition,
                        'InputsX2Y2': obj.elementInput.circlePosition,
                        'output': obj.output
                    }
                )
            }
            if (obj.elementInput.name === this.name) {
                inputsLines.push(
                    {
                        'elemInputName': obj.elementInput.name,
                        'inputsX1Y1': obj.elementInput.circlePosition,
                        'outputsX2Y2': obj.elementOutput.circlePosition,
                        'input': obj.input
                    }
                )
            }
        }
        return {outputsLines, inputsLines};
    }
};

