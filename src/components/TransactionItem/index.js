// Write your code here

import './index.css'

const TransactionItem = props => {
  const {historyLists, onDeleteButton} = props
  const {id, title, amount, type} = historyLists

  const onClickDelete = () => {
    onDeleteButton(id)
  }

  return (
    <li className="li-edit">
      <p className="p-title">{title}</p>
      <p className="p-title">Rs {amount}</p>
      <p className="p-title">{type}</p>
      <div className="delete-container">
        <button
          className="delete-button"
          onClick={onClickDelete}
          data-testid="delete"
          type="button"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
