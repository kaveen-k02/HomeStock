import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { ShoppingCart, Trash, Package, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [expiredData, setExpiredData] = useState({ count: 0, expiredItems: [] });

  // Pie chart colors
  const COLORS = ["#2A9D8F", "#E9C46A", "#F4A261"];

  useEffect(() => {
    fetchInventory();
    fetchExpiredProducts();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8070/Inventory");
      setInventoryData(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const fetchExpiredProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8070/Wastage");
      setExpiredData(res.data);
    } catch (err) {
      console.error("Error fetching expired products:", err);
    }
  };

  const inventoryPieData = inventoryData.reduce((acc, item) => {
    const existing = acc.find(i => i.category === item.category);
    if (existing) {
      existing.value += item.stock.reduce((sum, s) => sum + s.quantity, 0);
    } else {
      acc.push({
        category: item.category,
        value: item.stock.reduce((sum, s) => sum + s.quantity, 0)
      });
    }
    return acc;
  }, []);

  const wastageBarData = expiredData.expiredItems.reduce((acc, item) => {
    const found = acc.find(i => i.category === item.category);
    if (found) {
      found.amount += item.wastedQuantity;
    } else {
      acc.push({ category: item.category, amount: item.wastedQuantity });
    }
    return acc;
  }, []);

  const summaryData = [
    {
      title: "Total Inventory",
      value: `${inventoryData.length} Items`,
      icon: <Package className="text-accent" size={24} />,
      link: "/inventory"
    },
    {
      title: "Wastage",
      value: `${expiredData.count} Items`,
      icon: <Trash className="text-red-500" size={24} />,
      link: "/wastage"
    },
    {
      title: "Shopping Insights",
      value: "85% Efficiency",
      icon: <TrendingUp className="text-green-500" size={24} />,
      link: "/shopping-insights"
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-accent to-primary min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {summaryData.map((item, index) => (
          <Link
            key={index}
            to={item.link || "#"}
            className="p-4 flex items-center shadow-md bg-primary rounded-lg cursor-pointer hover:shadow-lg border-2 border-accent"
          >
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
            <BarChart data={wastageBarData}>
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
              <Pie
                data={inventoryPieData}
                dataKey="value"
                nameKey="category"
                outerRadius={80}
              >
                {inventoryPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
