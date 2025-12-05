import { ReactNode } from 'react';

interface AlertCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  accentColor: string;
}

export default function AlertCard({ icon, title, value, accentColor }: AlertCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        <div>
          <h3 className="text-neutral-600 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold" style={{ color: accentColor }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

