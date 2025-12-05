import { ReactNode } from 'react';

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  accentColor: string;
}

export default function DashboardCard({ icon, title, value, accentColor }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
      </div>
      <h3 className="text-neutral-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

