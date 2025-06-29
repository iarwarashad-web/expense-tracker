import React from "react";

export default function AddExpensesForm({addExpensesHandle  }) {
  const [expenses, setExpenses] = React.useState({
    amount: "",
    category: "",
    date: ""
  });

  // ✅ Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setExpenses(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // ✅ Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // prevent default form reload
    if (addExpensesHandle) {
      addExpensesHandle(expenses);
      // optionally reset form
      setExpenses({
        amount: "",
        category: "",
        date: ""
      });
    }
  }

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col shadow-md px-4 py-4 my-4 rounded-md bg-white"
    >
      <div className="flex flex-col my-2">
        <label className="text-xl mb-2" htmlFor="category">category</label>
        <input
          className="bg-purple-300 p-3 rounded-md border border-purple-600"
          id="category"
          type="text"
          name="category"
          value={expenses.category}
          onChange={handleChange}
          placeholder="Freelance etc"
        />
      </div>

      <div className="flex flex-col my-2">
        <label className="text-xl mb-2" htmlFor="amount">Amount</label>
        <input
          className="bg-purple-300 p-3 rounded-md border border-purple-600"
          id="amount"
          type="number"
          name="amount"
          value={expenses.amount}
          onChange={handleChange}
          required
          placeholder="100"
        />
      </div>

      <div className="flex flex-col my-2">
        <label className="text-xl mb-2" htmlFor="date">Date</label>
        <input
          className="bg-purple-300 p-3 rounded-md border border-purple-600"
          id="date"
          type="date"
          name="date"
          value={expenses.date}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 ml-auto hover:bg-purple-600 px-4 py-2 rounded-md bg-purple-800 text-white cursor-pointer w-36"
      >
        Add
      </button>
    </form>
  );
}
