import React, { Component } from 'react';

import './App.scss';
import Input from './Input/Input';

class App extends Component {
  state = {
    answerId: '',
    correctOnFirstAttempt: 0,
    correctOnSecondAttempt: 0,
    page: 0,
    questions: [
      {
        elType: 'radio', name: 'sport', answer: 'soccer', attempts: [], chosenAnswer: '', question: 'What is the most popular sport in the world?', answers: [
          { disabled: false, id: 'americanFootball', label: 'American Football' },
          { disabled: false, id: 'soccer', label: 'Soccer' },
          { disabled: false, id: 'basketball', label: 'Basketball' },
          { disabled: false, id: 'baseball', label: 'Baseball' },
          { disabled: false, id: 'cricket', label: 'Cricket' }
        ]
      },
      {
        elType: 'radio', name: 'population', answer: 'indonesia', attempts: [], chosenAnswer: '', question: 'What country has the 4th largest population?', answers: [
          { disabled: false, id: 'unitedStates', label: 'United States' },
          { disabled: false, id: 'india', label: 'India' },
          { disabled: false, id: 'china', label: 'China' },
          { disabled: false, id: 'indonesia', label: 'Indonesia' },
          { disabled: false, id: 'brazil', label: 'Brazil' }
        ]
      },
      {
        elType: 'radio', name: 'population', answer: 'cuba', attempts: [], chosenAnswer: '', question: `North Korea and what other country don't allow coca-cola?`, answers: [
          { disabled: false, id: 'cuba', label: 'Cuba' },
          { disabled: false, id: 'pakistan', label: 'Pakistan' },
          { disabled: false, id: 'china', label: 'China' },
          { disabled: false, id: 'russia', label: 'Russia' },
          { disabled: false, id: 'madagascar', label: 'Madagascar' }
        ]
      },
      {
        elType: 'radio', name: 'population', answer: 'france', attempts: [], chosenAnswer: '', question: `What is the top most visited country in the world?`, answers: [
          { disabled: false, id: 'unitedStates', label: 'United States' },
          { disabled: false, id: 'mexico', label: 'Mexico' },
          { disabled: false, id: 'japan', label: 'Japan' },
          { disabled: false, id: 'france', label: 'France' },
          { disabled: false, id: 'italy', label: 'Italy' }
        ]
      },
      {
        elType: 'radio', name: 'population', answer: 'muhammad', attempts: [], chosenAnswer: '', question: 'What is the most popular name in the world?', answers: [
          { disabled: false, id: 'muhammad', label: 'Muhammad' },
          { disabled: false, id: 'jane', label: 'Jane' },
          { disabled: false, id: 'john', label: 'John' },
          { disabled: false, id: 'krishna', label: 'Krishna' },
          { disabled: false, id: 'mary', label: 'Mary' }
        ]
      },
      {
        elType: 'radio', name: 'population', answer: 'southSudan', attempts: [], chosenAnswer: '', question: 'What is the youngest country in the world?', answers: [
          { disabled: false, id: 'southSudan', label: 'South Sudan' },
          { disabled: false, id: 'unitedStates', label: 'United States' },
          { disabled: false, id: 'southKorea', label: 'South Korea' },
          { disabled: false, id: 'indonesia', label: 'Indonesia' },
          { disabled: false, id: 'brazil', label: 'Brazil' }
        ]
      }
    ]
  }

  selectAnswerHandler = (event, i) => {
    const { value } = event.target;
    let questionsCopy = [...this.state.questions];

    questionsCopy = questionsCopy.map((el, index) => {
      if (index === i) {
        el.chosenAnswer = value;
      }
      return el;
    });
    this.setState({ questions: questionsCopy });
  }

  submitAnswerHandler = (event, chosenAnswer, answer, questionIndex) => {
    // if no answer was chosen, do nothing
    if (!chosenAnswer) return;

    let questionsCopy = [...this.state.questions];

    // if answer is correct, continue to the next question
    if (chosenAnswer === answer) {
      this.setState((prev) => ({
        page: prev.page + 1
      }));
    }

    // if answer is incorrect, add '1' to attempts arr
    // disable that answer, add styling'
    if (chosenAnswer !== answer) {
      questionsCopy = questionsCopy.map((el, index) => {
        if (index === questionIndex) {
          el.attempts = [...el.attempts, 1];
          el.chosenAnswer = '';

          // update the disabled property
          let answersSelection = [...el.answers].map(cur => {
            if (cur.id === this.state.answerId) {
              cur.disabled = true;
              return cur;
            };
            return cur;
          });

          el.answers = answersSelection;
        }
        return el;
      });
    }

    // find the questions that were answered on first attempt
    let firstAttempt = [...questionsCopy].filter(el => el.attempts.length === 0).length;
    // find the questions that were answered on second attempt
    let secondAttempt = [...questionsCopy].filter(el => el.attempts.length === 1).length;
    this.setState({ questions: questionsCopy, correctOnFirstAttempt: firstAttempt, correctOnSecondAttempt: secondAttempt });
  }

  render() {
    let page = this.state.questions.map((el, i) => {
      if (i === this.state.page) {
        let answers = el.answers.map((cur, ind) => {
          return <Input onClick={e => this.setState({ answerId: e.target.value })} disabled={cur.disabled} key={cur.id} elType={el.elType} name={el.name} id={cur.id} value={cur.id} label={cur.label} />
        });
        return (
          <div className='container' key={el.name} onChange={e => this.selectAnswerHandler(e, i)}>
            <h1>{el.question}</h1>
            {answers}
            <button className='quiz-btn' onClick={e => this.submitAnswerHandler(e, el.chosenAnswer, el.answer, i)}>submit answer</button>
          </div>
        );
      }
    });

    return (
      <div className="App">
        {this.state.page === this.state.questions.length && <div className='results-div'>
          <h1>Results</h1>
          <h2>you scored {`${this.state.correctOnFirstAttempt}/${this.state.questions.length}`} on your first attempts ({(this.state.correctOnFirstAttempt / this.state.questions.length).toFixed(2) * 100}%)</h2>
          <h2>you scored {`${this.state.correctOnSecondAttempt}/${this.state.questions.length}`} on your second attempts ({(this.state.correctOnSecondAttempt / this.state.questions.length).toFixed(2) * 100}%)</h2>
        </div>}
        {this.state.page !== this.state.questions.length && page}
      </div>
    );
  }
}

export default App;
