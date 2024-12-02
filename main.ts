const endpoint: string = "https://gamma-api.polymarket.com/"

export async function getAllMarkets(): Promise<JSON> {
  const response = await fetch(endpoint + "markets")
  return response.json()
}

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(await getAllMarkets());
}
