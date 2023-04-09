import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    titles: '',
    amounts: '',
    optionId: transactionTypeOptions[0].optionId,
    historyItem: [],
  }

  onClickTitle = event => {
    this.setState({titles: event.target.value})
  }

  onClickAmount = event => {
    this.setState({amounts: event.target.value})
  }

  onClickOption = event => {
    this.setState({optionId: event.target.value})
  }

  onAddHistoryList = event => {
    event.preventDefault()

    const {titles, amounts, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      findOption => findOption.optionId === optionId,
    )
    const {displayText} = typeOption

    const newHistory = {
      id: uuidv4(),
      title: titles,
      amount: parseInt(amounts),
      type: displayText,
    }

    this.setState(prevState => ({
      historyItem: [...prevState.historyItem, newHistory],
      titles: '',
      amounts: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteButton = id => {
    const {historyItem} = this.state

    const updateDeleteList = historyItem.filter(even => id !== even.id)

    this.setState({historyItem: updateDeleteList})
  }

  incomeCalculate = () => {
    const {historyItem} = this.state

    let incomeAmount = 0

    historyItem.forEach(even => {
      if (even.type === transactionTypeOptions[0].displayText) {
        incomeAmount += even.amount
      }
    })

    return incomeAmount
  }

  expensesCalculate = () => {
    const {historyItem} = this.state

    let expenseAmount = 0

    historyItem.forEach(even => {
      if (even.type === transactionTypeOptions[1].displayText) {
        expenseAmount += even.amount
      }
    })

    return expenseAmount
  }

  balanceCalculate = () => {
    const {historyItem} = this.state

    let expenseAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    historyItem.forEach(even => {
      if (even.type === transactionTypeOptions[0].displayText) {
        incomeAmount += even.amount
      } else {
        expenseAmount += even.amount
      }
    })

    balanceAmount = incomeAmount - expenseAmount

    return balanceAmount
  }

  render() {
    const {titles, amounts, historyItem, optionId} = this.state

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="top-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="para">
              Welcome back to your <span className="s-edit">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            expenseAmount={this.expensesCalculate()}
            incomeAmount={this.incomeCalculate()}
            balanceAmount={this.balanceCalculate()}
          />
          <div className="bottom-container">
            <form
              className="add-transaction-container"
              onSubmit={this.onAddHistoryList}
            >
              <h1 className="header">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                onChange={this.onClickTitle}
                value={titles}
                placeholder="TITLE"
                id="title"
                type="text"
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                className="input"
                id="amount"
                onChange={this.onClickAmount}
                value={amounts}
                placeholder="AMOUNT"
                type="text"
              />
              <label className="input-label" htmlFor="expense">
                TYPE
              </label>
              <select
                className="input"
                value={optionId}
                onChange={this.onClickOption}
                id="expense"
              >
                {transactionTypeOptions.map(even => (
                  <option key={even.optionId} value={even.optionId}>
                    {even.displayText}
                  </option>
                ))}
              </select>
              <button className="btn" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="header">History</h1>
              <div className="heading-container">
                <ul className="ul-edit">
                  <li className="li-edits">
                    <p className="table-cell">Title</p>
                    <p className="table-cell">Amount</p>
                    <p className="table-cell">Type</p>
                  </li>
                  {historyItem.map(even => (
                    <TransactionItem
                      onDeleteButton={this.onDeleteButton}
                      key={even.id}
                      historyLists={even}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
