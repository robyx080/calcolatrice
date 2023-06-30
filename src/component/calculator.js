import { useState } from 'react';
import { evaluate } from 'mathjs';
import deleteImg from '../image/delete.png'

import '../App.css';



function Calculator() {

  const [calc, setCalc] = useState("");   //stato per la stringa di calcolo
  const [result, setResult] = useState("");  //stato per la stringa del risultato
  const [isBracketOpen, setIsBracketOpen] = useState(false);  //stato per vedere se è stata aperta una parentesi o meno

  const ops = ['/', '*', '-', '+', '.']; //array degli operatori

  //funzione per aggiornare le due stringhe
  const updateCalc = (value) => {
    //per non mettere un operatore ad inzio stringa o non mettere doppio operatore tranne nel caso (5%+5)
    if ((ops.includes(value) && calc === '') || (ops.includes(value) && ops.includes(calc.slice(-1))) || (value === '%' && calc.slice(-1) === '%')) {
      return;
    }
    //se la ( è gia aperta e la stiamo chiudendo ) settiamo isBracketOpen con false
    if (isBracketOpen && value === ')') {
      setIsBracketOpen(false);
    }
    //settiamo la string calc con il nuovo valore
    setCalc(calc + value);
    //se il valore che stiamo inserendo non è un operatore facciamo il calcolo della stringa e lo settiamo su result
    if (!ops.includes(value) || value === "%") {
      try {
        const evaluatedResult = evaluate(calc + value); //calcolo tramite stringa
        const roundedResult = Number(evaluatedResult.toFixed(3));
        setResult(roundedResult.toString());
      } catch (error) {
        setResult("Error");
      }
    }
  }

  //quando clicchiamo = effettuioamo il calcolo e lo settiamo su calc
  const calculate = () => {
    try {
      const evaluatedResult = evaluate(calc); //calcolo tramite stringa
      const roundedResult = Number(evaluatedResult.toFixed(3));
      setCalc(roundedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  }

  //cancelliamo il calcolo
  const deleteAC = () => {
    setCalc("")
    setResult("")
  }

  //mettiamo le parentesi
  const brackets = () => {
    if (isBracketOpen) {
      updateCalc(')');
    } else {
      updateCalc('(');
      setIsBracketOpen(true);
    }
  }

  //cancello l'ultimo elemento di calc
  const back = () => {
    if (calc !== '') {
      const removedValue = calc.slice(-1);
      const updatedCalc = calc.slice(0, -1);
      setCalc(updatedCalc);

      if (removedValue === ')') {
        setIsBracketOpen(true);
      } else if (removedValue === '(') {
        setIsBracketOpen(false);
      }

      if (updatedCalc === '') {
        setResult('');
      } else if (!ops.includes(updatedCalc.slice(-1))) {
        try {
          const evaluatedResult = evaluate(updatedCalc);
          const roundedResult = Number(evaluatedResult.toFixed(3));
          setResult(roundedResult.toString());
        } catch (error) {
          setResult('Error');
        }
      } else {
        setResult('');
      }
    }
  };


  //ui calcolatrice
  return (
    <div className="calculator">
      <div className="display">
        <span>{result ? '(' + result + ')' : ''}</span>
        <span>{calc || 0}</span>
      </div>
      <div className='keys'>
        <button onClick={deleteAC} className='neon'>AC</button>
        <button onClick={brackets} className='neon'>( )</button>
        <button onClick={() => updateCalc('%')} className='neon'>%</button>
        <button onClick={() => updateCalc('/')} className='operator'>/</button>
        <button onClick={() => updateCalc('7')}>7</button>
        <button onClick={() => updateCalc('8')}>8</button>
        <button onClick={() => updateCalc('9')}>9</button>
        <button onClick={() => updateCalc('*')} className='operator'>X</button>
        <button onClick={() => updateCalc('4')}>4</button>
        <button onClick={() => updateCalc('5')}>5</button>
        <button onClick={() => updateCalc('6')}>6</button>
        <button onClick={() => updateCalc('-')} className='operator'>-</button>
        <button onClick={() => updateCalc('1')}>1</button>
        <button onClick={() => updateCalc('2')}>2</button>
        <button onClick={() => updateCalc('3')}>3</button>
        <button onClick={() => updateCalc('+')} className='operator'>+</button>
        <button onClick={back}><img src={deleteImg} alt='del' style={{ maxHeight: "13px" }}></img></button>
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
        <button onClick={calculate} className='operator'>=</button>
      </div>
    </div>
  );
}

export default Calculator;
