import type { GenerationVote } from '@/lib/api'

interface Props {
  data: GenerationVote[]
}

export default function VotesByGeneration({ data }: Props) {
  const max = Math.max(...data.map((g) => g.votes), 1)
  return (
    <div className="flex flex-col gap-2">
      {data.map((g) => (
        <div key={g.generation} className="flex items-center gap-3">
          <span className="w-20 text-sm text-right">Gen {g.generation}</span>
          <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full h-4">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all"
              style={{ width: `${(g.votes / max) * 100}%` }}
            />
          </div>
          <span className="w-16 text-sm">{g.votes} votes</span>
        </div>
      ))}
    </div>
  )
}
