import { useState, useRef } from 'react';

interface OrderChartProps {
  title: string;
  data: { date: string; value: number }[];
  maxValue: number;
  height?: number;
}

export default function OrderChart({ title, data, maxValue, height = 600 }: OrderChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [brushStart, setBrushStart] = useState<number | null>(null);
  const [brushEnd, setBrushEnd] = useState<number | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const chartWidth = 1200;
  const chartHeight = height;
  const padding = { top: 40, right: 20, bottom: 110, left: 40 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calculate points for the line with smooth curves (always show all data, transform handles zoom/pan)
  const points = data.map((item, index) => {
    const x = padding.left + (index / (data.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - (item.value / maxValue) * graphHeight;
    return { x, y, value: item.value, date: item.date, index };
  });

  // Create smooth curve path using quadratic bezier curves
  const createSmoothPath = () => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        // Use control point between current and next for smooth curve
        const cp1x = curr.x;
        const cp1y = curr.y;
        const cp2x = (curr.x + next.x) / 2;
        const cp2y = (curr.y + next.y) / 2;
        path += ` Q ${cp1x} ${cp1y} ${cp2x} ${cp2y}`;
      } else {
        path += ` L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  const smoothPath = createSmoothPath();
  
  // Create area path (for gradient fill)
  const areaPath = `${smoothPath} L ${points[points.length - 1]?.x || 0} ${padding.top + graphHeight} L ${points[0]?.x || 0} ${padding.top + graphHeight} Z`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !containerRef.current || isPanning || isDragging) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const viewBoxWidth = chartWidth / zoom;
    const scaleX = svgRect.width / viewBoxWidth;
    const mouseX = ((e.clientX - svgRect.left) / scaleX) - panX;
    const mouseY = (e.clientY - svgRect.top) / scaleX;

    // Find the nearest point
    let nearestIndex = 0;
    let minDistance = Infinity;

    points.forEach((point) => {
      const distance = Math.abs(mouseX - point.x);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = point.index;
      }
    });

    // Only show tooltip if mouse is within the graph area
    if (
      mouseX >= padding.left &&
      mouseX <= padding.left + graphWidth &&
      mouseY >= padding.top &&
      mouseY <= padding.top + graphHeight
    ) {
      setHoveredIndex(nearestIndex);
      const tooltipX = e.clientX - containerRect.left;
      const tooltipY = e.clientY - containerRect.top - 50;
      setTooltipPosition({ x: tooltipX, y: tooltipY });
    } else {
      setHoveredIndex(null);
      setTooltipPosition(null);
    }
  };

  const handleMouseLeave = () => {
    if (!isPanning && !isDragging) {
      setHoveredIndex(null);
      setTooltipPosition(null);
    }
  };

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0 || e.shiftKey) return; // Only left mouse button, not shift
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMovePan = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPanning || !svgRef.current) return;
    
    const deltaX = e.clientX - panStart.x;
    const svgRect = svgRef.current.getBoundingClientRect();
    const viewBoxWidth = chartWidth / zoom;
    const scaleX = svgRect.width / viewBoxWidth;
    const adjustedDeltaX = deltaX / scaleX;
    
    setPanX((prev) => {
      const maxPan = chartWidth * (1 - 1 / zoom);
      const newPan = prev - adjustedDeltaX;
      return Math.max(-maxPan, Math.min(0, newPan));
    });
    
    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setIsDragging(false);
    if (brushStart !== null && brushEnd !== null) {
      // Apply zoom to selected area
      const start = Math.min(brushStart, brushEnd);
      const end = Math.max(brushStart, brushEnd);
      const range = end - start;
      if (range > 0) {
      const newZoom = Math.min(5, data.length / range);
      setZoom(newZoom);
      const centerX = (start + end) / 2;
      const centerXPixel = padding.left + (centerX / (data.length - 1)) * graphWidth;
      const newPanX = -(centerXPixel - chartWidth / 2);
      setPanX(Math.max(-chartWidth * (1 - 1 / newZoom), Math.min(0, newPanX)));
      }
      setBrushStart(null);
      setBrushEnd(null);
    }
  };

  // Zoom with mouse wheel
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const viewBoxWidth = chartWidth / zoom;
    const scaleX = svgRect.width / viewBoxWidth;
    const mouseX = ((e.clientX - svgRect.left) / scaleX) - panX;
    
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(1, Math.min(5, zoom * zoomFactor));
    
    // Zoom towards mouse position
    const zoomPoint = mouseX;
    const zoomRatio = (zoomPoint - panX) / (chartWidth / zoom);
    const newPanX = panX - (zoomPoint * (1 / newZoom - 1 / zoom)) + (chartWidth * (1 / newZoom - 1 / zoom) * zoomRatio);
    
    setZoom(newZoom);
    setPanX(Math.max(-chartWidth * (1 - 1 / newZoom), Math.min(0, newPanX)));
  };

  // Brush selection for zooming
  const handleBrushStart = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.shiftKey && !isPanning) {
      setIsDragging(true);
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const viewBoxWidth = chartWidth / zoom;
        const scaleX = svgRect.width / viewBoxWidth;
        const mouseX = ((e.clientX - svgRect.left) / scaleX) - panX;
        if (mouseX >= padding.left && mouseX <= padding.left + graphWidth) {
          const index = Math.round(((mouseX - padding.left) / graphWidth) * (data.length - 1));
          setBrushStart(index);
          setBrushEnd(index);
        }
      }
    }
  };

  const handleBrushMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging && brushStart !== null && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const viewBoxWidth = chartWidth / zoom;
      const scaleX = svgRect.width / viewBoxWidth;
      const mouseX = ((e.clientX - svgRect.left) / scaleX) - panX;
      if (mouseX >= padding.left && mouseX <= padding.left + graphWidth) {
        const index = Math.round(((mouseX - padding.left) / graphWidth) * (data.length - 1));
        setBrushEnd(index);
      }
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    const newZoom = Math.min(5, zoom * 1.2);
    // Keep the center of the visible area centered when zooming
    const currentViewBoxWidth = chartWidth / zoom;
    const newViewBoxWidth = chartWidth / newZoom;
    const centerPoint = panX + currentViewBoxWidth / 2;
    const newPanX = centerPoint - newViewBoxWidth / 2;
    const maxPan = chartWidth * (1 - 1 / newZoom);
    setZoom(newZoom);
    // Constrain panX to keep graph within bounds
    setPanX(Math.max(-maxPan, Math.min(0, newPanX)));
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(1, zoom / 1.2);
    if (newZoom === 1) {
      setPanX(0);
    } else {
      // Keep the center of the visible area centered when zooming out
      const currentViewBoxWidth = chartWidth / zoom;
      const newViewBoxWidth = chartWidth / newZoom;
      const centerPoint = panX + currentViewBoxWidth / 2;
      const newPanX = centerPoint - newViewBoxWidth / 2;
      const maxPan = chartWidth * (1 - 1 / newZoom);
      // Constrain panX to keep graph within bounds
      setPanX(Math.max(-maxPan, Math.min(0, newPanX)));
    }
    setZoom(newZoom);
  };

  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setBrushStart(null);
    setBrushEnd(null);
  };

  // Get brush coordinates for display
  const getBrushCoordinates = () => {
    if (brushStart === null || brushEnd === null) return null;
    const start = Math.min(brushStart, brushEnd);
    const end = Math.max(brushStart, brushEnd);
    const startX = padding.left + (start / (data.length - 1)) * graphWidth;
    const endX = padding.left + (end / (data.length - 1)) * graphWidth;
    return { startX, endX, start, end };
  };

  const brushCoords = getBrushCoordinates();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-3 hover:shadow-xl transition-shadow duration-300">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom Out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 5}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Zoom In"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors"
            title="Reset Zoom"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div 
        ref={containerRef} 
        className="w-full relative overflow-hidden"
        onWheel={(e) => {
          // Prevent page zoom when scrolling over chart area
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <svg
          ref={svgRef}
          width={chartWidth}
          height={chartHeight}
          viewBox={`${panX} 0 ${chartWidth / zoom} ${chartHeight}`}
          className="w-full h-auto cursor-move"
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleMouseMovePan(e);
            handleBrushMove(e);
          }}
          onMouseDown={(e) => {
            handleMouseDown(e);
            handleBrushStart(e);
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#ccfbf1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0" />
            </linearGradient>
            <filter id={`glow-${title.replace(/\s+/g, '-')}`}>
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Grid Lines */}
          {(() => {
            // For maxValue 20, show grid at 0, 5, 10, 15, 20; for others show proportional
            const ratios = maxValue === 20 
              ? [0, 0.25, 0.5, 0.75, 1]
              : [0, 0.25, 0.5, 0.75, 1];
            
            return ratios.map((ratio, idx) => {
              const y = padding.top + graphHeight - ratio * graphHeight;
              return (
                <line
                  key={idx}
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + graphWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
              );
            });
          })()}

          {/* Brush Selection Area */}
          {brushCoords && (
            <rect
              x={brushCoords.startX}
              y={padding.top}
              width={brushCoords.endX - brushCoords.startX}
              height={graphHeight}
              fill="rgba(20, 184, 166, 0.1)"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Area Fill with Gradient - Very Light Teal */}
          <path 
            d={areaPath} 
            fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
            style={{ opacity: 1 }}
          />

          {/* Smooth Line */}
          <path
            d={smoothPath}
            fill="none"
            stroke="#0d9488"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${title})`}
            style={{ transition: 'all 0.3s ease' }}
          />

          {/* Hover Vertical Line */}
          {hoveredIndex !== null && (
            <line
              x1={points.find(p => p.index === hoveredIndex)?.x || 0}
              y1={padding.top}
              x2={points.find(p => p.index === hoveredIndex)?.x || 0}
              y2={padding.top + graphHeight}
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity="0.8"
              style={{ transition: 'all 0.2s ease' }}
            />
          )}

          {/* Data Points with Animation */}
          {points.map((point) => {
            const isHovered = hoveredIndex === point.index;
            return (
              <circle
                key={point.index}
                cx={point.x}
                cy={point.y}
                r={isHovered ? 8 : 5}
                fill={isHovered ? '#0d9488' : '#14b8a6'}
                stroke="white"
                strokeWidth={isHovered ? 4 : 3}
                style={{ 
                  transition: 'all 0.2s ease',
                  filter: isHovered ? 'drop-shadow(0 0 8px rgba(13, 148, 136, 0.9))' : 'drop-shadow(0 2px 4px rgba(20, 184, 166, 0.3))'
                }}
              />
            );
          })}

          {/* Invisible hover areas */}
          {points.map((point) => (
            <rect
              key={`hover-${point.index}`}
              x={point.x - 20}
              y={padding.top}
              width="40"
              height={graphHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => {
                if (!isPanning && !isDragging) {
                  setHoveredIndex(point.index);
                }
              }}
            />
          ))}

          {/* Y-Axis Labels */}
          {(() => {
            // For maxValue 20, show 0, 5, 10, 15, 20; for others show proportional
            const labels = maxValue === 20 
              ? [0, 5, 10, 15, 20]
              : [0, 0.25, 0.5, 0.75, 1].map(ratio => Math.round(maxValue * ratio));
            
            return labels.map((value, idx) => {
              const ratio = maxValue === 20 ? value / 20 : value / maxValue;
              const y = padding.top + graphHeight - ratio * graphHeight;
              return (
                <text
                  key={idx}
                  x={padding.left - 20}
                  y={y + 5}
                  textAnchor="end"
                  className="text-sm fill-neutral-600 font-semibold"
                >
                  {value}
                </text>
              );
            });
          })()}

          {/* X-Axis Labels - Rotated diagonally */}
          {data.map((item, index) => {
            const x = padding.left + (index / (data.length - 1)) * graphWidth;
            // Show all labels for monthly data (12 items), show every 3rd for daily data (31 items)
            const shouldShow = data.length <= 12 || index % Math.ceil(data.length / 10) === 0 || index === data.length - 1;
            return shouldShow ? (
              <text
                key={index}
                x={x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="end"
                className="text-sm fill-neutral-600 font-semibold"
                transform={`rotate(-45 ${x} ${chartHeight - padding.bottom + 20})`}
              >
                {item.date}
              </text>
            ) : null;
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + graphHeight}
            stroke="#9ca3af"
            strokeWidth="2.5"
          />
          <line
            x1={padding.left}
            y1={padding.top + graphHeight}
            x2={padding.left + graphWidth}
            y2={padding.top + graphHeight}
            stroke="#9ca3af"
            strokeWidth="2.5"
          />
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && tooltipPosition && (
          <div
            className="absolute bg-white text-neutral-900 text-sm rounded-lg px-5 py-4 shadow-2xl pointer-events-none z-10 whitespace-nowrap border-2 border-neutral-200"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translateX(-50%)',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <div className="font-bold mb-2 text-neutral-900 text-base">{data[hoveredIndex]?.date}</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-600"></div>
              <span className="text-neutral-700 font-semibold">Orders: <span className="text-teal-600 font-bold">{data[hoveredIndex]?.value}</span></span>
            </div>
          </div>
        )}

        {/* Zoom Indicator */}
        {zoom > 1 && (
          <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {Math.round(zoom * 100)}%
          </div>
        )}
      </div>
    </div>
  );
}
