const bars = [28, 43, 35, 60, 47, 72, 62, 50, 81, 69, 92, 77, 62, 85, 100, 89]
export default function FrequencyMock() {
  return (
    <div className="mock-app frequency-app">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-sm font-semibold tracking-tight">
          frequency<span className="text-accent-soft">↗</span>
        </span>
        <span className="text-[8px] text-gray-400">OVERVIEW / ANALYTICS</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="text-lg font-medium">The bigger picture.</div>
        <span className="tag !text-[7px]">Last 30 days ↗</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {['$48,920', '24,816', '+32.6%'].map((value, i) => (
          <div key={value} className="border border-white/10 p-3">
            <p className="text-[7px] text-gray-400">
              {['TOTAL REVENUE', 'ACTIVE USERS', 'GROWTH RATE'][i]}
            </p>
            <p className="mt-2 text-xl tracking-tight">{value}</p>
            <p className="mt-1 text-[7px] text-accent-soft">↗ Up this month</p>
          </div>
        ))}
      </div>
      <div className="mt-5 border border-white/10 p-4">
        <span className="text-[9px]">Revenue performance</span>
        <div className="mt-4 flex h-28 items-end gap-2">
          {bars.map((height, i) => (
            <div
              key={i}
              style={{ height: `${height}%` }}
              className="flex-1 bg-gradient-to-t from-[#132a63] to-accent"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[6px] text-gray-400">
          <span>JUN 01</span>
          <span>JUN 15</span>
          <span>JUN 30</span>
        </div>
      </div>
    </div>
  )
}
