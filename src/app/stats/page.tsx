import Link from 'next/link'
import Leaderboard from '@/components/Leaderboard'
import VotesByType from '@/components/VotesByType'
import VotesByGeneration from '@/components/VotesByGeneration'
import { getVotesByPokemon, getVotesByType, getVotesByGeneration } from '@/lib/api'

export default async function StatsPage() {
  const [byPokemon, byType, byGeneration] = await Promise.all([
    getVotesByPokemon(),
    getVotesByType(),
    getVotesByGeneration(),
  ])

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Vote Stats</h1>
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          ← Back to voting
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold mb-3">Top Pokémon</h2>
          <Leaderboard data={byPokemon} />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Votes by Type</h2>
          <VotesByType data={byType} />
        </section>

        <section className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Votes by Generation</h2>
          <VotesByGeneration data={byGeneration} />
        </section>
      </div>
    </main>
  )
}
