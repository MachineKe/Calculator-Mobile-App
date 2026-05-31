import { useReducer } from 'react';

interface CalculatorState {
    currentValue: string;
    previousValue: string | null;
    operator: string | null;
    expression: string;
    overwrite: boolean;
}

type ActionType =
    | { type: 'ADD_NUMBER'; payload: string }
    | { type: 'CHOOSE_OPERATOR'; payload: string }
    | { type: 'UNARY_OPERATION'; payload: string }
    | { type: 'CLEAR' }
    | { type: 'DELETE' }
    | { type: 'CALCULATE' }
    | { type: 'TOGGLE_SIGN' }
    | { type: 'PERCENTAGE' };

const initialState: CalculatorState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    expression: '',
    overwrite: false,
};

// Helper function to safely perform calculations
const evaluate = (state: CalculatorState): string => {
    const prev = parseFloat(state.previousValue || '0');
    const current = parseFloat(state.currentValue);

    if (isNaN(prev) || isNaN(current)) return '';

    let computation = 0;
    switch (state.operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return '';
    }

    // Convert back to string and handle JS floating point inaccuracies (e.g. 0.1 + 0.2)
    return parseFloat(computation.toFixed(10)).toString();
};

function calculatorReducer(state: CalculatorState, action: ActionType): CalculatorState {
    switch (action.type) {
        case 'ADD_NUMBER':
            if (state.overwrite) {
                return {
                    ...state,
                    currentValue: action.payload === '.' ? '0.' : action.payload,
                    overwrite: false,
                };
            }
            if (action.payload === '0' && state.currentValue === '0') return state;
            if (action.payload === '.' && state.currentValue.includes('.')) return state;

            return {
                ...state,
                currentValue:
                    state.currentValue === '0' && action.payload !== '.'
                        ? action.payload
                        : state.currentValue + action.payload,
            };

        case 'CHOOSE_OPERATOR':
            if (state.currentValue === '0' && state.previousValue === null) {
                return state;
            }

            if (state.previousValue == null) {
                return {
                    ...state,
                    operator: action.payload,
                    previousValue: state.currentValue,
                    expression: `${state.currentValue} ${action.payload}`,
                    currentValue: '0',
                    overwrite: true,
                };
            }

            // Allow user to change their mind on the operator
            if (state.overwrite && state.currentValue === '0') {
                return {
                    ...state,
                    operator: action.payload,
                    expression: `${state.previousValue} ${action.payload}`,
                };
            }

            // Chain calculations (e.g., 2 + 2 + ...)
            const evaluatedValue = evaluate(state);
            return {
                ...state,
                previousValue: evaluatedValue,
                operator: action.payload,
                expression: `${evaluatedValue} ${action.payload}`,
                currentValue: '0',
                overwrite: true,
            };

        case 'UNARY_OPERATION': {
            const currentVal = parseFloat(state.currentValue);
            if (isNaN(currentVal)) return state;

            let result = 0;
            let expr = '';
            switch (action.payload) {
                case 'square':
                    result = currentVal * currentVal;
                    expr = `sqr(${currentVal})`;
                    break;
                case 'sqrt':
                    result = Math.sqrt(currentVal);
                    expr = `√(${currentVal})`;
                    break;
                case 'sin':
                    result = Math.sin(currentVal);
                    expr = `sin(${currentVal})`;
                    break;
                case 'cos':
                    result = Math.cos(currentVal);
                    expr = `cos(${currentVal})`;
                    break;
                case 'tan':
                    result = Math.tan(currentVal);
                    expr = `tan(${currentVal})`;
                    break;
                case 'log':
                    result = Math.log10(currentVal);
                    expr = `log(${currentVal})`;
                    break;
                case 'ln':
                    result = Math.log(currentVal);
                    expr = `ln(${currentVal})`;
                    break;
            }

            return {
                ...state,
                currentValue: parseFloat(result.toFixed(10)).toString(),
                expression: expr + ' =',
                overwrite: true,
            };
        }

        case 'CALCULATE':
            if (state.operator == null || state.previousValue == null) {
                return state;
            }

            return {
                ...state,
                overwrite: true,
                previousValue: null,
                operator: null,
                expression: `${state.previousValue} ${state.operator} ${state.currentValue} =`,
                currentValue: evaluate(state),
            };

        case 'CLEAR':
            return initialState;

        case 'DELETE':
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentValue: '0',
                };
            }
            if (state.currentValue.length === 1 || (state.currentValue.length === 2 && state.currentValue.startsWith('-'))) {
                return { ...state, currentValue: '0' };
            }
            return {
                ...state,
                currentValue: state.currentValue.slice(0, -1),
            };

        case 'TOGGLE_SIGN':
            if (state.currentValue === '0') return state;
            return {
                ...state,
                currentValue: (parseFloat(state.currentValue) * -1).toString(),
            };

        case 'PERCENTAGE':
            if (state.currentValue === '0') return state;
            return {
                ...state,
                currentValue: (parseFloat(state.currentValue) / 100).toString(),
            };

        default:
            return state;
    }
}

export function useCalculator() {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return {
        ...state,
        addNumber: (number: string) => dispatch({ type: 'ADD_NUMBER', payload: number }),
        chooseOperator: (operator: string) => dispatch({ type: 'CHOOSE_OPERATOR', payload: operator }),
        clear: () => dispatch({ type: 'CLEAR' }),
        deleteNumber: () => dispatch({ type: 'DELETE' }),
        calculate: () => dispatch({ type: 'CALCULATE' }),
        toggleSign: () => dispatch({ type: 'TOGGLE_SIGN' }),
        percentage: () => dispatch({ type: 'PERCENTAGE' }),
        applyUnaryOperation: (operation: string) => dispatch({ type: 'UNARY_OPERATION', payload: operation }),
    };
}