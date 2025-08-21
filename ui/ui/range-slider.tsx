"use client";

import React, { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
  step?: number;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  formatLabel = (val) => val.toString(),
  step = 1,
  className = "",
}: RangeSliderProps) {
  // Initialize with full duration if no value provided, otherwise use provided value
  const [range, setRange] = useState<[number, number]>(value || [min, max]);

  // Update internal state when props change
  React.useEffect(() => {
    setRange(value || [min, max]);
  }, [value, min, max]);

  // Handle change and call parent onChange
  const handleChange = (newRange: [number, number]) => {
    setRange(newRange);
    onChange(newRange);
  };

  return (
    <div
      className={`relative w-full h-12 bg-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>

      {/* Selected range */}
      <div
        className="absolute top-0 h-full bg-purple-500 rounded-lg"
        style={{
          left: `${((range[0] - min) / (max - min)) * 100}%`,
          width: `${((range[1] - range[0]) / (max - min)) * 100}%`,
        }}
      />

      {/* Start handle */}
      <div
        className="absolute top-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-pointer transform -translate-y-1/2 shadow-md hover:scale-110 transition-transform"
        style={{
          left: `calc(${((range[0] - min) / (max - min)) * 100}% - 8px)`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startValue = range[0];
          const rect = e.currentTarget.parentElement!.getBoundingClientRect();

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const deltaPercent = (deltaX / rect.width) * 100;
            const deltaValue = (deltaPercent / 100) * (max - min);
            const newStart = Math.max(
              min,
              Math.min(range[1] - step, startValue + deltaValue),
            );
            handleChange([newStart, range[1]]);
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />

      {/* End handle */}
      <div
        className="absolute top-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full cursor-pointer transform -translate-y-1/2 shadow-md hover:scale-110 transition-transform"
        style={{
          left: `calc(${((range[1] - min) / (max - min)) * 100}% - 8px)`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startValue = range[1];
          const rect = e.currentTarget.parentElement!.getBoundingClientRect();

          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const deltaPercent = (deltaX / rect.width) * 100;
            const deltaValue = (deltaPercent / 100) * (max - min);
            const newEnd = Math.max(
              range[0] + step,
              Math.min(max, startValue + deltaValue),
            );
            handleChange([range[0], newEnd]);
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />

      {/* Time markers */}
      <div className="absolute bottom-0 left-0 text-xs text-gray-600 transform translate-y-full pt-1">
        {formatLabel(min)}
      </div>
      <div className="absolute bottom-0 right-0 text-xs text-gray-600 transform translate-y-full pt-1">
        {formatLabel(max)}
      </div>
    </div>
  );
}
