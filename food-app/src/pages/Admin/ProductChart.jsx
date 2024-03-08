import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductChart = ({ products }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (products && products.length > 0) {
      // Prepare data for the chart
      const chartData = products.map(product => ({
        name: product.name,
        price: product.price
      }));

      // Cleanup function
      return () => {
        // No cleanup needed for Recharts
      };
    }
  }, [products]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={products}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#d35400" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductChart;
