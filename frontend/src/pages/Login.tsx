import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');

  const handleContinue = () => {
    // Handle login logic here
    if (mobileNumber.length === 10) {
      // Navigate to home or verify OTP
      navigate('/');
    }
  };

  const handleZomatoLogin = () => {
    // Handle Zomato login logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ overflow: 'hidden', backgroundColor: '#ffffff', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
        aria-label="Back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Video Section */}
      <div className="overflow-hidden relative flex-1" style={{ minHeight: 0, border: 'none', padding: 0, margin: 0, marginLeft: '2px', backgroundColor: '#ffffff', zIndex: 0, width: 'calc(100% - 2px)', boxSizing: 'border-box', position: 'relative' }}>
        <video
          src="/assets/login/loginvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%', 
            margin: 0, 
            padding: 0, 
            border: 'none', 
            outline: 'none', 
            boxShadow: 'none',
            verticalAlign: 'top',
            objectFit: 'cover',
            background: 'transparent',
            position: 'relative',
            zIndex: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
        />
        {/* White overlay at bottom to ensure seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-white" style={{ zIndex: 1 }}></div>
      </div>

      {/* Login Section */}
      <div className="bg-white flex flex-col items-center flex-shrink-0 relative" style={{ border: 'none', margin: 0, marginTop: '-3px', marginLeft: '-2px', boxShadow: 'none', outline: 'none', backgroundColor: '#ffffff', zIndex: 1, padding: '8px 0px 24px', paddingTop: '10px', width: 'calc(100% + 4px)', boxSizing: 'border-box', position: 'relative' }}>
        {/* Extended background to cover any gap - extends upward */}
        <div className="absolute top-0 bg-white" style={{ marginTop: '-3px', height: '4px', zIndex: 0, left: '-2px', right: '-2px', width: 'calc(100% + 4px)' }}></div>
        {/* Mobile Number Input */}
        <div className="w-full mb-2.5 px-4 relative z-10" style={{ maxWidth: '100%' }}>
          <div className="flex items-center bg-white border border-neutral-300 rounded-lg overflow-hidden focus-within:border-neutral-400 transition-colors">
            <div className="px-3 py-2.5 text-sm font-medium text-neutral-400 border-r border-neutral-300 bg-white">
              +91
            </div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter mobile number"
              className="flex-1 px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:outline-none bg-white"
              style={{ color: '#9ca3af', backgroundColor: '#ffffff' }}
              maxLength={10}
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="w-full mb-1.5 px-4 relative z-10" style={{ maxWidth: '100%' }}>
          <button
            onClick={handleContinue}
            disabled={mobileNumber.length !== 10}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors border px-3 ${
              mobileNumber.length === 10
                ? 'bg-orange-50 text-orange-600 border-orange-500 hover:bg-orange-100'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed border-neutral-300'
            }`}
          >
            Continue
          </button>
        </div>

        {/* OR Separator */}
        <div className="flex items-center gap-2.5 w-full mb-1.5 px-4 relative z-10">
          <div className="flex-1 h-px bg-neutral-200"></div>
          <span className="text-xs text-neutral-500">OR</span>
          <div className="flex-1 h-px bg-neutral-200"></div>
        </div>

        {/* Login with Appzeto Button */}
        <div className="w-full mb-3 px-4 relative z-10" style={{ maxWidth: '100%' }}>
          <button
            onClick={handleZomatoLogin}
            className="w-full py-2.5 rounded-lg font-semibold text-sm bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 px-3"
          >
            <span>Login with</span>
            <span className="font-bold">appzeto</span>
          </button>
        </div>

        {/* Privacy Text */}
        <p className="text-[10px] text-neutral-500 text-center max-w-sm leading-tight px-4 relative z-10">
          Access your saved addresses from Appzeto automatically!
        </p>
      </div>
    </div>
  );
}

