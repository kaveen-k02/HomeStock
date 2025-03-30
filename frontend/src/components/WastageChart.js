import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WastageChart = ({ filteredData }) => {
    return (
        <div className="bg border-background border-4 p-4 rounded shadow mt-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wasted" fill="#264653" /> 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WastageChart;
