import Image from 'next/image'
import type { PokemonVote } from '@/lib/api'

interface Props {
  data: PokemonVote[]
}

export default function Leaderboard({ data }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((p, i) => (
        <div
          key={p.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
        >
          <span className="w-6 text-sm font-bold text-zinc-400">{i + 1}</span>
          <Image src={p.sprite_official_art} alt={p.name} width={40} height={40} />
          <span className="flex-1 text-sm font-medium capitalize">{p.name}</span>
          <span className="text-sm font-semibold">{p.votes} votes</span>
        </div>
      ))}
    </div>
  )
}
