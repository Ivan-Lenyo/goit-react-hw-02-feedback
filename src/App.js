import { Component } from 'react';
import s from './App.module.css'
import Statistics from "./components/Statistics";
import Notification from "./components/Notification";
import FeedbackOptions from "./components/FeedbackOptions";
import Section from "./components/Section";

class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }
  

  countTotalFeedback = () => {
    const total = this.state.good + this.state.neutral + this.state.bad;
    return total
  }

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback()
    const percentage = (this.state.good * 100) / total
    return Math.round(percentage)
  }
  
  onLeaveFeedback = (option) => {
    this.setState((prevState) => {
      return { [option]: prevState[option] + 1 }
    })
  }
  
  render() {
    const { good, neutral, bad } = this.state;
    const percent = this.countPositiveFeedbackPercentage();
    const total = this.countTotalFeedback();

    return (
      <div className={s.container}>
        <Section title="Please leave Feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percent}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    )
  }
}

export default App;
