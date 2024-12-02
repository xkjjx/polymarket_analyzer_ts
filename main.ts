import { MarketsData, EventsData, PolymarketEvents } from "./polymarketEvents.ts";

const endpoint: string = "https://gamma-api.polymarket.com/";

export async function getAllMarkets(): Promise<MarketsData | null> {
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

export async function getAllMarketsExpiringAfterToday(): Promise<MarketsData | null> {
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

export async function getAllEvents(): Promise<EventsData | null> {
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

export async function getAllEventsExpiringAfterToday(): Promise<EventsData | null> {
  try {
    let allEvents: EventsData = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const request: string = `${endpoint}events?end_date_min=${new Date().toISOString()}&offset=${offset}&limit=${limit}`;
      const response = await fetch(request);

      if (!response.ok) {
        console.error(`Error fetching events: ${response.status} ${response.statusText}`);
        return null;
      }

      const data: EventsData = await response.json();

      // Add the fetched events to the allEvents array
      allEvents = allEvents.concat(data);

      // If the number of events fetched is less than the limit, we've reached the last page
      if (data.length < limit) {
        break;
      }

      // Update the offset for the next request
      offset += limit;
    }

    return allEvents;
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
  let polymarketEvents: PolymarketEvents = new PolymarketEvents();
  try {
    const events = await getAllEventsExpiringAfterToday();
    if (events) {
      polymarketEvents.addEventsData(events);
    } else {
      console.log("No events retrieved or an error occurred.");
    }
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
  }

  polymarketEvents.printAllEventsWithDetails();

  // const eventPrompts: string[] = polymarketEvents.getEventPrompts();

  // console.log(eventPrompts[1])
}
