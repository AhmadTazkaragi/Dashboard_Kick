"use client"; // ضروري في Next.js (App Router)

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'JUL', sales: 40 },
  { name: 'AUG', sales: 42 },
  { name: 'SEP', sales: 45 },
  { name: 'OCT', sales: 70 },
  { name: 'NOV', sales: 50 },
  { name: 'DEC', sales: 360 },
];
const SalesGraph = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sale Graph</h2>
        <div className="flex gap-2">
          {['WEEKLY', 'MONTHLY', 'YEARLY'].map((period) => (
            <button
              key={period}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-colors
                ${period === 'MONTHLY' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <hr className="mb-8 border-gray-100" />

      {/* Chart */}
      <div className="w-full flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#666', fontSize: 11, fontWeight: 600 }}
              tickMargin={10}
              angle={-20}
              textAnchor="end"
              height={30}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#999', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#4F8AFF" // لون الخط الأزرق
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 6, fill: '#4F8AFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesGraph;