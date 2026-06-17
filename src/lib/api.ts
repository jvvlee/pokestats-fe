const INGEST_URL = process.env.NEXT_PUBLIC_INGEST_URL ?? 'http://localhost:8080'
const ANALYTICS_URL = process.env.NEXT_PUBLIC_ANALYTICS_URL ?? 'http://localhost:8000'

export async function castVote(pokemonId: number, sessionId: string): Promise<void> {
  const res = await fetch(`${INGEST_URL}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pokemon_id: pokemonId, session_id: sessionId }),
  })
  if (!res.ok) throw new Error(`Vote failed: ${res.statusText}`)
}

export interface PokemonVote {
  id: number
  name: string
  sprite_official_art: string
  votes: number
}

export interface TypeVote {
  type: string
  votes: number
}

export interface GenerationVote {
  generation: number
  votes: number
}

export async function getVotesByPokemon(): Promise<PokemonVote[]> {
  const res = await fetch(`${ANALYTICS_URL}/analytics/votes-by-pokemon`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch votes by pokemon')
  return res.json()
}

export async function getVotesByType(): Promise<TypeVote[]> {
  const res = await fetch(`${ANALYTICS_URL}/analytics/votes-by-type`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch votes by type')
  return res.json()
}

export async function getVotesByGeneration(): Promise<GenerationVote[]> {
  const res = await fetch(`${ANALYTICS_URL}/analytics/votes-by-generation`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch votes by generation')
  return res.json()
}

export interface PokeListItem {
  name: string
  url: string
}

export interface PokeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokeListItem[]
}

export async function getPokemonList(limit = 20, offset = 0): Promise<PokeListResponse> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Failed to fetch pokemon list')
  return res.json()
}

export function idFromPokeApiUrl(url: string): number {
  return parseInt(url.replace(/\/$/, '').split('/').pop()!)
}
