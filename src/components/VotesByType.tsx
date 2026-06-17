import type { TypeVote } from '@/lib/api'

interface Props {
  data: TypeVote[]
}

export default function VotesByType({ data }: Props) {
  const max = data[0]?.votes ?? 1
  return (
    <div className="flex flex-col gap-2">
      {data.map((t) => (
        <div key={t.type} className="flex items-center gap-3">
          <span className="w-20 text-sm capitalize text-right">{t.type}</span>
          <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${(t.votes / max) * 100}%` }}
            />
          </div>
          <span className="w-16 text-sm">{t.votes} votes</span>
        </div>
      ))}
    </div>
  )
}
