import React, { useState } from "react";
import Database from "../Data/db.json";
import { FaSort } from "react-icons/fa";

const History = ({ Database }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({
    column: null,
    income: "desc",
    expense: "desc",
    total: "desc",
  });

  if (!Array.isArray(Database)) {
    return <div className="transactionList">No data available</div>;
  }
  const reversedDatabase = [...Database].reverse();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortBy = (column) => {
    setSortBy((prevSortBy) => ({
      column,
      order:
        prevSortBy.column === column && prevSortBy.order === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const compareValues = (a, b, order) => {
    if (order === "asc") {
      return a - b;
    } else {
      return b - a;
    }
  };

  const sortedDatabase = reversedDatabase

    .filter(
      (record) =>
        record.remarks &&
        record.remarks.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      compareValues(a[sortBy.column], b[sortBy.column], sortBy.order)
    );

  return (
    <div className="history_div">
      <h1>Transaction History</h1>
      <div className="history_box">
        <div className="history_navbar">
          <div className="fields">
            <input
              placeholder="Search With Remarks"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="transactionList">
          <table border={2}>
            <thead>
              <tr>
                <th>Date</th>
                <th>
                  Income
                  <span>
                    <button
                      onClick={() => handleSortBy("income")}
                      className="sort_button"
                    >
                      <FaSort />
                    </button>
                  </span>
                </th>
                <th>
                  Expense
                  <button
                    onClick={() => handleSortBy("expense")}
                    className="sort_button"
                  >
                    <FaSort />
                  </button>
                </th>
                <th>
                  Total
                  <button
                    onClick={() => handleSortBy("total")}
                    className="sort_button"
                  >
                    <FaSort />
                  </button>
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {sortedDatabase.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.date}</td>
                  <td>{item.income}</td>
                  <td>{item.expense}</td>
                  <td>{item.total}</td>
                  <td>{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
