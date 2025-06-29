import React from "react";

export default function AddIncomeForm({ addIncomeHandle }) {
  const [income, setIncome] = React.useState({
    amount: "",
    source: "",
    date: ""
  });

  // ✅ Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setIncome(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // ✅ Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // prevent default form reload
    if (addIncomeHandle) {
      addIncomeHandle(income);
      // optionally reset form
      setIncome({
        amount: "",
        source: "",
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
        <label className="text-xl mb-2" htmlFor="source">Source</label>
        <input
          className="bg-purple-300 p-3 rounded-md border border-purple-600"
          id="source"
          type="text"
          name="source"
          value={income.source}
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
          value={income.amount}
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
          value={income.date}
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
