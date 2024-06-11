import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import DatabaseData from "../Data/db.json";

const Record = () => {
  var date = new DateObject();
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [remarks, setRemarks] = useState("");
  const [db, setDatabase] = useState(null);
  const [total, setTotal] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  // const [Date, setDate] = useState(null);
  const [lastWeekTotal, setLastWeekTotal] = useState(null);
  const [lastMonthTotal, setLastMonthTotal] = useState(null);
  const [lastYearTotal, setLastYearTotal] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/Transaction")
      .then((response) => response.json())
      .then((data) => {
        setDatabase(data);

        // Last Week
        const currentDate = new Date();
        const lastweekDate = new Date();
        lastweekDate.setDate(currentDate.getDate() - 7);

        let lastWeekTotal = 0;
        data.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (
            transactionDate >= lastweekDate &&
            transactionDate <= currentDate
          ) {
            lastWeekTotal += transaction.total;
          }
        });
        setLastWeekTotal(lastWeekTotal);

        // Last Month
        const lastmonthDate = new Date();
        lastmonthDate.setDate(currentDate.getDate() - 30);

        let lastMonthTotal = 0;
        data.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (
            transactionDate >= lastmonthDate &&
            transactionDate <= currentDate
          ) {
            lastMonthTotal += transaction.total;
          }
        });
        setLastMonthTotal(lastMonthTotal);

        // Last Year
        const lastyearDate = new Date();
        lastyearDate.setDate(currentDate.getDate() - 365);
        let lastYearTotal = 0;
        data.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (
            transactionDate >= lastyearDate &&
            transactionDate <= currentDate
          ) {
            lastYearTotal += transaction.total;
          }
        });
        // console.log("Last Year Total : " + lastYearTotal);
        setLastYearTotal(lastYearTotal);

        // Total Value
        let totalValue = 0;
        for (let i = 0; i < data.length; i++) {
          totalValue += data[i].total;
        }
        setTotalValue(totalValue);
        document.getElementById("totalValue").innerHTML = totalValue;
      });
  }, []);

  const handleClear = (e) => {
    setIncome("");
    setExpense("");
    setRemarks("");
  };

  const handleSubmit = (e) => {
    if (remarks.length > 10) {
      window.alert("Remarks should be more than 10 characters");
      return;
    }

    e.preventDefault();
    const values = {
      income: income,
      expense: expense,
      remarks: remarks,
      date: date.format(),
      total: income - expense,
    };
    fetch("http://localhost:3000/Transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  const totalToday = (e) => {
    const totalwhat = document.getElementById("totalWhat");
    const weekvalue = document.getElementById("totalWeek").innerText;
    const monthvalue = document.getElementById("totalMonth").innerText;
    const yearvalue = document.getElementById("totalYear").innerText;
    if (e.target.classList.contains("today")) {
      totalwhat.innerHTML = "Total ";
      document.getElementById("totalValue").innerHTML = totalValue;
    } else if (e.target.classList.contains("week")) {
      totalwhat.innerHTML = "Total " + weekvalue;
      document.getElementById("totalValue").innerHTML = lastWeekTotal;
    } else if (e.target.classList.contains("month")) {
      totalwhat.innerHTML = "Total " + monthvalue;
      document.getElementById("totalValue").innerHTML = lastMonthTotal;
    } else if (e.target.classList.contains("year")) {
      totalwhat.innerHTML = "Total " + yearvalue;
      document.getElementById("totalValue").innerHTML = lastYearTotal;
    }
  };

  return (
    <div className="record_div">
      <div className="record_box record_div_form">
        <h2 className="record_div_form_h2">Today's Record</h2>
        <div className="main_form">
          <form method="POST" onSubmit={handleSubmit}>
            <label>Income</label>
            <input
              name="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <label>Expense</label>
            <input
              name="expense"
              type="number"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <label>Remarks</label>
            <input
              id="remarks"
              required
              name="remarks"
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            <div className="submit_clear">
              <button>Submit</button>
              <button onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
      </div>
      <div className="record_box record_div_totalvalue">
        <h2>Total Value</h2>
        <div className="total_value_button">
          <div className="buttons">
            <button className="today" id="totalToday" onClick={totalToday}>
              Total
            </button>
            <button className="week" id="totalWeek" onClick={totalToday}>
              Last Week
            </button>
            <button className="month" id="totalMonth" onClick={totalToday}>
              Last Month
            </button>
            <button className="year" id="totalYear" onClick={totalToday}>
              Last Year
            </button>
          </div>
          <div className="total_record">
            <div className="total_what">
              <h2>Ongoing</h2>
              <p>{parseInt(income) - parseInt(expense)}</p>
            </div>
            <div>
              <h2 id="totalWhat">Total</h2>
              <p id="totalValue">{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
