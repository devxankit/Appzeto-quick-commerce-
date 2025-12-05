import { useDeliveryStatus } from '../context/DeliveryStatusContext';

interface DeliveryHeaderProps {
  userName?: string;
}

export default function DeliveryHeader({ userName = 'Pratik' }: DeliveryHeaderProps) {
  const { isOnline, setIsOnline } = useDeliveryStatus();

  return (
    <div className="bg-white shadow-sm">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="px-4 py-2 bg-neutral-500 text-white text-xs font-medium text-center">
          Offline
        </div>
      )}
      
      {/* Header Content */}
      <div className="px-4 py-3">
        {/* App Title */}
        <h1 className={`text-xl font-bold text-center mb-3 transition-colors ${
          isOnline ? 'text-green-600' : 'text-neutral-500'
        }`}>
          Delivery App
        </h1>
        
        {/* User Info Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isOnline ? 'bg-green-600' : 'bg-neutral-400'
            }`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-700 text-sm">Hello</span>
              <span className="text-neutral-900 text-xs font-medium">{userName}</span>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isOnline ? 'bg-green-600' : 'bg-neutral-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                isOnline ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}




