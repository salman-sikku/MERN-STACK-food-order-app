import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserCountChart = ({ userData }) => {
  // Calculate total users count
  const totalUsers = userData.length;

  // Data for the chart
  const data = [
    { name: 'Total Users', users: totalUsers }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#d35400" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserCountChart;
