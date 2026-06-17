'use client'

import Image from 'next/image'

interface Props {
  id: number
  name: string
  onVote: (id: number) => void
  voted: boolean
}

export default function PokemonCard({ id, name, onVote, voted }: Props) {
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-700">
      <Image src={sprite} alt={name} width={96} height={96} />
      <p className="text-sm font-medium capitalize">{name}</p>
      <button
        onClick={() => onVote(id)}
        disabled={voted}
        className="mt-1 px-4 py-1.5 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {voted ? 'Voted!' : 'Vote'}
      </button>
    </div>
  )
}
