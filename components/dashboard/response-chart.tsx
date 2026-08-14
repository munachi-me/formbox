"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Card } from "@/components/ui/card";

interface Data {
  month: string,
  value: number
}

const datas: Data[] = [
  {month: 'Mar', value: 72},
  {month: 'Apr', value: 80},
  {month: 'May', value: 55},
  {month: 'Jun', value: 86},
  {month: 'Jul', value: 65},
  {month: 'Aug', value: 104},
];

export function ResponseChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState<number>(null);
  const [num, setNum] = useState<number[]>([]);
  const [timeframe, setTimeframe] = useState<string>('6')
  const [data, setData] = useState<Data[]>([])

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const bars =
      chartRef.current.querySelectorAll(".chart-bar");

    const context = gsap.context(() => {
      gsap.fromTo(
        bars,
        {
          scaleY: 0,
          transformOrigin: "bottom",
        },
        {
          scaleY: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
    }, chartRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const values = data.map(d => d.value);
      const maxNum = Math.max(...values);
      
      setNum(values);
      setMax(maxNum);
    }
  }, [data]);

  useEffect(() => {
    let time = Number(timeframe)
    let d = []
    for(let i=0; i<time; i++){
      d.push(datas[i])
    }
    setData(d)
  }, [timeframe]);


  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="flex items-start justify-between p-5">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Response activity
          </h2>

          <p className="mt-1 text-xs text-gray-600">
            Responses collected over the last {timeframe} months
          </p>
        </div>

        <select
          value={timeframe}
          className="rounded-lg border border-white/[0.07] bg-ink px-2.5 py-1.5 text-xs text-gray-400 outline-none"
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="6" className="bg-ink">Last 6 months</option>
          <option value="3" className="bg-ink">Last 3 months</option>
        </select>
      </div>

      <div ref={chartRef} className="flex h-full items-end gap-2 sm:gap-3 p-5">
        {data.map((d, index) => {
          const height = `${(d.value / max) * 100}%`;

          return (
            <div
              key={index}
              className="group flex flex-col flex-1 items-center justify-end gap-1 min-h-40 h-full"
            >
              <div
                className="chart-bar relative w-full rounded-md bg-purple/50 transition-colors duration-200 group-hover:bg-purple"
                style={{ height: `${height}` }}
              >
                <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md border border-white/[0.07] bg-ink-light px-2 py-1 text-[10px] text-gray-300 group-hover:block">
                  {d.value}
                </div>
              </div>
              <span className="text-[10px] text-gray-700">{d.month}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}