import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { GlobalContext } from '../context/GlobalState';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Filter and calculate income and expenses
  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts.filter((amount) => amount > 0).reduce((acc, val) => acc + val, 0);
  const expenses = Math.abs(
    amounts.filter((amount) => amount < 0).reduce((acc, val) => acc + val, 0)
  );

  // Prepare data for the chart
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [income, expenses],
        backgroundColor: ['#36A2EB', '#FF6384'], // Colors for income and expenses
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h3>Expense Breakdown</h3>
      <Pie data={data} />
    </div>
  );
};

export default ExpensePieChart;
