import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ShoppingCart, Trash, Package, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const summaryData = [
    { title: "Total Inventory", value: "40 Items", icon: <Package className="text-accent" size={24} />, link: "/inventory" },
    { title: "Wastage", value: "10 Items", icon: <Trash className="text-red-500" size={24} />, link: "/wastage" },
    { title: "Shopping Insights", value: "85% Efficiency", icon: <TrendingUp className="text-green-500" size={24} />, link: "/shopping-insights" },
  ];

  const wastageData = [
    { category: "Dairy", amount: 40 },
    { category: "Fruits", amount: 30 },
    { category: "Vegetables", amount: 50 },
  ];

  const inventoryData = [
    { category: "Dairy", value: 300 },
    { category: "Fruits", value: 450 },
    { category: "Vegetables", value: 500 },
  ];

  const COLORS = ["#2A9D8F", "#E9C46A", "#F4A261"];

  return (
    <div className="p-6 bg-gradient-to-br from-accent  to-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {summaryData.map((item, index) => (
          <Link key={index} to={item.link || "#"} className="p-4 flex items-center shadow-md bg-primary rounded-lg cursor-pointer hover:shadow-lg border-2 border-accent">
            {item.icon}
            <div className="ml-4">
              <p className="text-gray-800 font-medium">{item.title}</p>
              <h2 className="text-background font-semibold">{item.value}</h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Wastage Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={wastageData}>
              <XAxis dataKey="category" stroke="#264653" />
              <YAxis stroke="#264653" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#E76F51" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-primary rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={inventoryData} dataKey="value" nameKey="category" outerRadius={80}>
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
