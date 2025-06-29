import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer ,Legend} from 'recharts';



export default function IncomeExpensePieChart({totalIncome, totalExpenses}) {
    const COLORS = ['green', 'red']; // green for income, red for expenses

    const data = [
  { name: 'Total Income', value: totalIncome },
  { name: 'Total Expenses', value: totalExpenses },
];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%" 
            cy="50%"
            outerRadius={100}
           
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
            <Legend layout="vertical" align="left" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
