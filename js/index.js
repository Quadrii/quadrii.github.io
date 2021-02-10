const POWER = "POWER(",
    FACTORIAL = "FACTORIAL("


// some variables

const OPERATORS = ["+", "-", "*", "/"]



let data = {
    operation: [],
    formula: [],
}

let ans = 0

// all the calculator buttons!! all 40 buttons !

let calculator_buttons = [{
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },
    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    {
        name: "square-root",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "square",
        symbol: "x²",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "open-parenthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "close-parenthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },
    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },
    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    }, {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    }, {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    }, {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    }, {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    }, {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "acos",
        symbol: "acos",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    }, {
        name: "asin",
        symbol: "asin",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    }, {
        name: "atan",
        symbol: "atan",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    }, {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    }, {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    }, {
        name: "multiplication",
        symbol: "×",
        formula: "*",
        type: "operator"
    }, {
        name: "factorial",
        symbol: "×!",
        formula: FACTORIAL,
        type: "math_function"
    }, {
        name: "exp",
        symbol: "exp",
        formula: "Math.exp",
        type: "math_function"
    }, {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    }, {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    }, {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    }, {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    }, {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    }, {
        name: "subtraction",
        symbol: "–",
        formula: "-",
        type: "operator"
    }, {
        name: "power",
        symbol: "x<span>y</span>",
        formula: POWER,
        type: "math_function"
    }, {
        name: "ANS",
        symbol: "ANS",
        formula: "ans",
        type: "number"
    }, {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    }, {
        name: "comma",
        symbol: ".",
        formula: ".",
        type: "number"
    }, {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    }, {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }, {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    }
];




const input_element = document.querySelector('.input')

const output_operation_element = document.querySelector('.operation .value')

const output_result_element = document.querySelector('.result .value')

console.log(output_operation_element)


// creating the buttons,selecting the elements inorder to display these buttons on to the screen!

function createCalculatorbutton() {

    const buttons_per_row = 8
    let added_buttons = 0
        // const rows = 5

    // this loop will create 8 buttons in 5 rows each so in total 8*5 = 40 buttons,each row 8 buttons

    calculator_buttons.forEach(button => {
        if (added_buttons % buttons_per_row == 0) {
            input_element.innerHTML += `<div class = "row"></div>`
        }

        const row = document.querySelector(".row:last-child")
        row.innerHTML += `<button id = ${button.name}>
        ${button.symbol}
        </button>`

        added_buttons++
    })
}

createCalculatorbutton()

// RAD and DEG

let RADIAN = true

const rad_btn = document.getElementById('rad')
const deg_btn = document.getElementById('deg')

// by default select the Rad button

rad_btn.classList.add("active-angle")

// this function is used to toggle between 2 buttons i.e if someone clicks on the "deg" button then deg button must be activated,else if someone clicks on the rad button then it must be activated,so to perform those kind of actions i need to use the toggle method present in the classList as shown ↓


function angleToggle() {
    rad_btn.classList.toggle("active-angle")
    deg_btn.classList.toggle("active-angle")
}

// adding event listener

input_element.addEventListener('click', event => {

    // now we need to add functionality to each button,so all the buttons are present in the row,so inorder to grab the row we need to use the "event.target",this will fetch us the row and in that row we will be having the buttons,so i need to iterate through that row and add functionality to the buttons!

    // console.log(event.target)

    const target_btn = event.target

    // if you print you'll get something like ↓
    // <button id="exp">
    //     exp
    //     </button>

    // as i have pressed the exp button,i get the id!

    // if the button pressed is matched by the button name,then call the calculator function which we'll define ↓

    // console.log(target_btn)

    calculator_buttons.forEach(button => {
        if (button.name == target_btn.id) {
            calculator(button)
        }

    })

})


// calculator

function calculator(button) {
    // console.log(button)

    // all basic arithemetic functions like +,-,*,/

    // push all the button's symbols which were pressed in the operations list and corresponding formulas of the buttons in the formula list as shown ↓

    // console.log(button)

    if (button.type == 'operator') {
        data.operation.push(button.symbol)
        data.formula.push(button.formula)
    }


    else if (button.type == 'number') {
        data.operation.push(button.symbol)
        data.formula.push(button.formula)
    }
    else if (button.type == 'trigo_function') {

        data.operation.push(button.symbol + '(')
        data.formula.push(button.formula)
        console.log(data.operation)
    }


    else if (button.type == 'math_function') {

        let symbol, formula;

        console.log(button)


        if (button.name == 'factorial') {
            symbol = "!"
            formula = button.formula

            data.operation.push(symbol)
            data.formula.push(formula)
        } else if (button.name == 'power') {
            symbol = "^("
            formula = button.formula

            data.operation.push(symbol)
            data.formula.push(formula)
        } else if (button.name == 'square') {
            symbol = "^("
            formula = button.formula
            data.operation.push(symbol)
            data.formula.push(formula)
            data.operation.push("2)")
            data.formula.push("2)")

            // console.log(data.operation)

            // console.log(data.formula)


        } else if (button.name == 'ln') {
            symbol = "ln("
            formula = button.formula + "("

            data.operation.push(symbol)
            data.formula.push(formula)


        } else if (button.name == 'log') {

            symbol = 'log('
            formula = button.formula + "("

            data.operation.push(symbol)
            data.formula.push(formula)
        } else if (button.name == 'exp') {

            symbol = 'exp('
            formula = button.formula + "("

            data.operation.push(symbol)
            data.formula.push(formula)

        } else {
            symbol = button.symbol + "("
            formula = button.formula
            data.operation.push(symbol)
            data.formula.push(formula)


        }
    }





    // console.log(button)



    // any key like C,deg,rad,cut...

    // so if any one presses the "C" key then the screen of calculator must be cleared!,so set data.operation and data.formula = [],and then set the value of 0 in the screen!,this is very important!


    // else if someone presses the "⌫" button then one character from the data.operation and one character from data.formula must be poped out!
    else if (button.type == 'key') {
        if (button.name == 'clear') {
            data.operation = []
            data.formula = []
            updateOutputresult(0)

        } else if (button.name == 'delete') {
            data.operation.pop()
            data.formula.pop()
        } else if (button.name == 'rad') {
            RADIAN = true
            angleToggle()
        } else if (button.name == 'deg') {
            RADIAN = false
            angleToggle()
        }

    }

    // when someone presses "=",so when the "=" is pressed by the user,so that must evaluate the result and print it in the div element as shown ↓
    else if (button.type == 'calculate') {

        formula_str = data.formula.join('')

        
        let POWER_SEARCH_RESULT = search(data.formula, POWER)

        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL)

        
        const BASES = powerbasegetter(data.formula, POWER_SEARCH_RESULT)

        console.log(BASES)

        BASES.forEach(base => {
            let toreplace = base + POWER
            let replacement = "Math.pow(" + base + ",";

            formula_str = formula_str.replace(toreplace, replacement)
        })

        const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT)

        NUMBERS.forEach(number => {
            formula_str = formula_str.replace(number.toReplace,
                number.replacement)
            console.log(formula_str)
        })

        let result

        try {
            result = eval(formula_str)

        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "SyntaxError"
                updateOutputresult(result)
                return
            }
        }
        ans = result
        data.operation = [result]
        data.formula = [result]

        updateOutputresult(result)
        return
    }

    updateOutputOperation(data.operation.join(''))

}

function factorialnumgetter(formula, FACTORIAL_SEARCH_RESULT) {

    // store all the numbers in this array
    let numbers = []

    let factorial_sequence = 0

    FACTORIAL_SEARCH_RESULT.forEach(fact_index => {

        let number = []

        let next_index = fact_index + 1;

        let next_input = formula[next_index]

        if (next_index == FACTORIAL) {
            factorial_sequence += 1
            return
        }
        let first_fact_index = fact_index - factorial_sequence

        let prev_idx = first_fact_index - 1

        let paren_count = 0

        while (prev_idx >= 0) {

            if (formula[prev_idx] == '(') {
                paren_count -= 1
            }
            if (formula[prev_idx] == ')') {
                paren_count += 1
            }

            let is_operator = false

            OPERATORS.forEach(OPERATOR => {
                if (formula[prev_idx] == OPERATOR) {
                    is_operator = true
                }
            })

            if (is_operator && paren_count == 0) {
                break;
            }

            number.unshift(formula[prev_idx])

            prev_idx--;


        }

        let number_str = number.join('')
        const factorial = "factorial(",
            close_paren = ')'
        let times = factorial_sequence + 1

        let toreplace = number_str + FACTORIAL.repeat(times)

        let replacement = factorial.repeat(times) + number_str + close_paren

        numbers.push({
            toReplace: toreplace,
            replacement: replacement
        })

        factorial_sequence = 0
    })

    return numbers


}


function powerbasegetter(formula, POWER_SEARCH_RESULT) {
    let powers_base = []

    POWER_SEARCH_RESULT.forEach(power_index => {
        let base = []

        let paren_count = 0

        let prev_idx = power_index - 1

        while (prev_idx >= 0) {

            if (formula[prev_idx] == '(') {
                paren_count -= 1
            }
            if (formula[prev_idx] == ')') {
                paren_count += 1
            }

            let is_operator = false

            OPERATORS.forEach(OPERATOR => {
                if (formula[prev_idx] == OPERATOR) {
                    is_operator = true
                }
            })

            let is_power = formula[prev_idx] == POWER

            if ((is_operator && paren_count == 0) || is_power) {
                break;
            }

            base.unshift(formula[prev_idx])

            prev_idx--;


        }

        powers_base.push(base.join(''))
    })

    return powers_base
}


function search(array, keyword) {
    let search_res = []

    array.forEach((element, index) => {
        if (element == keyword) {
            search_res.push(index)
        }
    })

    return search_res

}

function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation
}


function updateOutputresult(result) {
    output_result_element.innerHTML = result
}

function trigo(callback, angle) {
    if (!RADIAN) {
        angle = angle * Math.PI / 180
    }

    return callback(angle)

}

function inv_trigo(callback, value) {

    let angle = callback(value)

    if (!RADIAN) {
        angle = angle * 180 / Math.PI
    }

    return angle

}



function factorial(number) {
    if (number % 1 != 0) {

        return gamma(number + 1)

    }

    if (number == 0 || number == 1) {
        return 1
    }

    let result = 1

    for (let i = 1; i <= number; i++) {
        result *= i
    }
    if (result == Infinity) {
        return Infinity
    }

    return result
}



function gamma(n) { 
    var g = 7,
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    } else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}