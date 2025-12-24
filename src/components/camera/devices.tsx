'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  devices: MediaDeviceInfo[]
  value: string
  onChange: (id: string) => void
}

export function DeviceSelector({ devices, value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange} disabled={!devices.length}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select camera" />
      </SelectTrigger>
      <SelectContent>
        {devices.length === 0 ? (
          <span className="px-2 py-1 text-xs text-muted-foreground">No camera found</span>
        ) : (
          devices.map((d) => (
            <SelectItem key={d.deviceId} value={d.deviceId}>
              {d.label || `Camera ${d.deviceId.slice(0, 5)}`}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
