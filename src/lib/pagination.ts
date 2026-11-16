/** How many country cards each page of the home screen shows (3 rows of 4 on desktop). */
export const PAGE_SIZE = 8

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): T[] {
  return items.slice((page - 1) * pageSize, page * pageSize)
}

export type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)

export function getPageItems(current: number, total: number, slots: 5 | 7 = 7): PageItem[] {
  if (total <= slots) return range(1, total)

  const edge = slots - 2
  if (current < edge) return [...range(1, edge), 'end-ellipsis', total]
  if (current > total - edge + 1) return [1, 'start-ellipsis', ...range(total - edge + 1, total)]

  const half = (slots - 5) / 2
  return [1, 'start-ellipsis', ...range(current - half, current + half), 'end-ellipsis', total]
}