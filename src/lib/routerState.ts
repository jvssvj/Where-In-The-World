/**
 * Cards and border links navigate with `state: { from }`, where `from` is the home URL
 * (path + query: page, search, region) the user came from. "Close" sends them back there.
 */
export function getFrom(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    const { from } = state
    if (typeof from === 'string' && from.startsWith('/')) return from
  }
  return '/'
}
