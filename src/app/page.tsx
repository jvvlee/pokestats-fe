'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import PokemonCard from '@/components/PokemonCard'
import { castVote, getPokemonList, idFromPokeApiUrl, type PokeListItem } from '@/lib/api'
import { getSessionId } from '@/lib/session'

const PAGE_SIZE = 20

export default function Home() {
  const [pokemon, setPokemon] = useState<PokeListItem[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [voted, setVoted] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemon = useCallback(async (offset: number) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPokemonList(PAGE_SIZE, offset)
      setPokemon(data.results)
      setTotal(data.count)
    } catch {
      setError('Failed to load Pokémon. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPokemon(offset)
  }, [fetchPokemon, offset])

  const handleVote = async (id: number) => {
    try {
      await castVote(id, getSessionId())
      setVoted((prev) => new Set(prev).add(id))
    } catch {
      alert('Failed to submit vote. Is the ingest service running?')
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Vote for your favourite Pokémon</h1>
        <Link href="/stats" className="text-sm text-blue-500 hover:underline">
          View Stats →
        </Link>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-center text-zinc-500 py-16">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {pokemon.map((p) => {
            const id = idFromPokeApiUrl(p.url)
            return (
              <PokemonCard
                key={id}
                id={id}
                name={p.name}
                onVote={handleVote}
                voted={voted.has(id)}
              />
            )
          })}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="px-4 py-2 rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-zinc-50 transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-zinc-500">
          {offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total}
        </span>
        <button
          onClick={() => setOffset((o) => o + PAGE_SIZE)}
          disabled={offset + PAGE_SIZE >= total || loading}
          className="px-4 py-2 rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-zinc-50 transition-colors"
        >
          Next
        </button>
      </div>
    </main>
  )
}
