interface MarketData {
    id: string;
    question: string;
    description: string;
    lastTradePrice: number;
    [key: string]: any;
}

export type MarketsData = MarketData[];

interface EventData {
    id: string;
    title: string;
    description: string;
    markets: MarketsData;
    [key: string]: any;
}

export type EventsData = EventData[];


export class PolymarketEvents {
    private eventsData: EventsData = [];

    addEventsData(eventsData: EventsData): void {
        this.eventsData.push(...eventsData);
    }

    printAllEventsWithDetails(): void {
        for (const eventData of this.eventsData) {
            console.log(`Event: ${eventData.title}`);
            console.log(`Description: ${eventData.description}`);
            console.log("Markets:");
            const sumOfLastTradePrices = eventData.markets.reduce((acc, marketData) => acc + marketData.lastTradePrice, 0);
            for (const marketData of eventData.markets) {
                console.log(`  - ${marketData.question}`);
                console.log(`    ${marketData.description}`);
                console.log(`    ImpliedProbability: ${marketData.lastTradePrice / sumOfLastTradePrices}`);
                console.log(marketData);
            }
        }
    }

    getEventPrompts(): string[] {
        const eventPrompts: string[] = [];
    
        for (const eventData of this.eventsData) {
            const sumOfLastTradePrices = eventData.markets.reduce((acc, marketData) => acc + marketData.lastTradePrice, 0);
            const eventPrompt: string = `
    Here is the title for the event we are considering:
    ${eventData.title}
    
    Here is a description with more information about it:
    ${eventData.description}
    
    Here are the markets that you can bet on:
    ${eventData.markets.map(market => `
      - Question for market: ${market.question}
        Description: ${market.description}
        Chances: ${market.lastTradePrice / sumOfLastTradePrices}`).join("")}
    
    Now write a short, formal summary going over these odds - DO NOT reference the actual event/market representation used here.
    Feel free to include/exclude technical details as you see fit, there's no need to include everything.
            `.trim();
    
            eventPrompts.push(eventPrompt);
        }
    
        return eventPrompts;
    }
    
}