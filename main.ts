const endpoint: string = "https://gamma-api.polymarket.com/";

interface Market {
  id: string;
  [key: string]: any;
}

interface Event {
  id: string;
  title: string;
  description: string;
  [key: string]: any;
}

type Markets = Market[];
type Events = Event[];

export async function getAllMarkets(): Promise<Markets | null> {
  try {
    const response = await fetch(`${endpoint}markets`);
    if (!response.ok) {
      console.error(`Error fetching all markets: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`An error occurred while fetching all markets: ${error}`);
    return null;
  }
}

export async function getAllMarketsExpiringAfterToday(): Promise<Markets | null> {
  try {
    const request: string = `${endpoint}markets?end_date_min=${new Date().toISOString()}`;
    console.log(request);
    const response = await fetch(request);
    if (!response.ok) {
      console.error(`Error fetching markets expiring after today: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`An error occurred while fetching markets expiring after today: ${error}`);
    return null;
  }
}

export async function getAllEvents(): Promise<Events | null> {
  try {
    const response = await fetch(`${endpoint}events`);
    if (!response.ok) {
      console.error(`Error fetching all events: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`An error occurred while fetching all events: ${error}`);
    return null;
  }
}

export async function getAllEventsExpiringAfterToday(): Promise<Events | null> {
  try {
    const request: string = `${endpoint}events?end_date_min=${new Date().toISOString()}`;
    console.log(request);
    const response = await fetch(request);
    if (!response.ok) {
      console.error(`Error fetching events expiring after today: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`An error occurred while fetching events expiring after today: ${error}`);
    return null;
  }
}

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  try {
    const events = await getAllEventsExpiringAfterToday();
    if (events) {
      for (const event of events) {
        console.log(event.title);
        console.log(event.description);
      }
    } else {
      console.log("No events retrieved or an error occurred.");
    }
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
  }
}
