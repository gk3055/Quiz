import React, { useState } from "react";
export default function Quiz() {
  const QuizData = [
    {
      id: 0,
      question: `What is the capital of Nigeria?`,
      options: [`New Delhi`, `Abuja`, `Owerri`, `Enugu`],
      answer: `Abuja`
    },
    {
      id: 1,
      question: `What is the capital of India?`,
      options: [`New Delhi`, `Abuja`, `Mumbai`, `Aba`],
      answer: `New Delhi`
    },
    {
      id: 2,
      question: `What is the capital of Australia?`,
      options: [`Melbourne`, `Akokwa`, `Owerri`, `Sydney`],
      answer: `Sydney`
    }
  ];
  const answerArray = QuizData.map(question => question.answer);
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [prevSelectedOption, setPrevSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [alreadySelected, setAlreadySelected] = useState(new Set());
  const [QuizDataWithAnswer, setQuizDataWithAnswer] = useState(QuizData.map(question => ({ ...question, selectedAnswer: null })));

  const handleAnswer = (option) => {
    const updatedData = QuizDataWithAnswer.map(question => {
      if (question.id === currentQuestionIndex) {
        return { ...question, selectedAnswer: option };
      }
      return question;
    });
    setQuizDataWithAnswer(updatedData);
    setSelectedOption(option);
    setAlreadySelected(new Set([...alreadySelected, option]));
    if (currentQuestionIndex === QuizData.length - 1) {
      document.getElementById("sb").style.display = 'inline';
    } else {
      document.getElementById("sb").style.display = 'none';
    }
  };
  
  const handleNextQuestion = () => {
    if(selectedOption===null) {
      console.log("Please select an option.");
      return
    }
    setPrevSelectedOption(selectedOption); 
    
    setSelectedOption(null)
   
    setQuestionIndex(currentQuestionIndex+1)
    };
 console.log(alreadySelected)
 console.log(answerArray)
 console.log(QuizDataWithAnswer)
  const prev = () => {
    setSelectedOption(prevSelectedOption);
    setQuestionIndex(currentQuestionIndex - 1);
  };
  const calculateScore = () => {
    let score = 0;
    QuizDataWithAnswer.forEach(question => {
      if (question.selectedAnswer === question.answer) {
        score++;
      }
    });
    return score;
  };
  
  React.useEffect(() => {
    setScore(calculateScore());
  }, [alreadySelected, currentQuestionIndex, selectedOption]);
  
  const DispScore=()=>{
      var a = document.getElementById('score')
      a.style.display = "inline"
      a.innerHTML=`The Score is: ${score}`
  }
console.log(calculateScore())
  return (
    <div id="Quiz" style={{backgroundColor:'darkgrey', borderRadius:'10%', margin:'0% 25% 0% 25%'}}>
      <div>
        <h1>The Quiz</h1>
        <h3>
          {currentQuestionIndex + 1}.{QuizData[currentQuestionIndex].question}
        </h3>
        <div style={{backgroundColor:"grey",padding:'2%' ,borderRadius:'9%',margin:'0% 40% 0% 40%'}}>
          {QuizData[currentQuestionIndex].options.map((option, index) => (
            <div key={index}>
              <button  style={{backgroundColor:selectedOption === option ? "darkgrey" : "white"}}  onClick={() => handleAnswer(option)}>{option}</button> <br />
            </div>
          ))}
        </div><br />
        <button id="prev" onClick={prev} disabled={currentQuestionIndex <= 0}>
          Previous
        </button><br />
        <button
          id="next"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex >= QuizData.length-1}
        >
          Next
        </button><br />
      </div>
    
      <button id="sb"  onClick={DispScore} style={{marginBottom:'5%',display:'none'}}  >Score</button><br />
      <div >
        <p id="score" style={{fontFamily:"sans-serif", fontWeight: "bolder", display:'none'}}></p>
       
      </div>
      
    </div>
  );
}