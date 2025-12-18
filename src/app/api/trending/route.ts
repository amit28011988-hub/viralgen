import { NextResponse } from 'next/server';

// Motivational quotes database
const quotes = [
    { top: "Success is not final", bottom: "Failure is not fatal: It is the courage to continue that counts" },
    { top: "The only way to do great work", bottom: "Is to love what you do" },
    { top: "Believe you can", bottom: "And you're halfway there" },
    { top: "Your limitation—it's only your imagination", bottom: "Push yourself, because no one else is going to do it for you" },
    { top: "Great things never come from comfort zones", bottom: "Dream it. Wish it. Do it." },
    { top: "Success doesn't just find you", bottom: "You have to go out and get it" },
    { top: "The harder you work for something", bottom: "The greater you'll feel when you achieve it" },
    { top: "Don't stop when you're tired", bottom: "Stop when you're done" },
    { top: "Wake up with determination", bottom: "Go to bed with satisfaction" },
    { top: "Do something today", bottom: "That your future self will thank you for" }
];

export async function GET() {
    try {
        // Use Unsplash for random images (no API key needed for basic usage)
        const topics = ['nature', 'city', 'people', 'technology', 'business'];
        const topic = topics[Math.floor(Math.random() * topics.length)];

        const res = await fetch(`https://source.unsplash.com/800x600/?${topic}`, {
            redirect: 'follow'
        });

        if (!res.ok) {
            console.error("Unsplash API Error:", res.status);
            return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
        }

        // Get the random quote
        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        return NextResponse.json({
            imageUrl: res.url, // Unsplash redirects to actual image URL
            title: quote.top,
            subreddit: topic,
            author: quote.bottom
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
