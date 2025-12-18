import { NextResponse } from 'next/server';

const content = [
    {
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        top: "Success is not final",
        bottom: "Failure is not fatal: It is the courage to continue that counts"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
        top: "The only way to do great work",
        bottom: "Is to love what you do"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
        top: "Believe you can",
        bottom: "And you're halfway there"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
        top: "Your limitation—it's only your imagination",
        bottom: "Push yourself, because no one else is going to do it for you"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
        top: "Great things never come from comfort zones",
        bottom: "Dream it. Wish it. Do it."
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        top: "Success doesn't just find you",
        bottom: "You have to go out and get it"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop",
        top: "The harder you work for something",
        bottom: "The greater you'll feel when you achieve it"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
        top: "Don't stop when you're tired",
        bottom: "Stop when you're done"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
        top: "Wake up with determination",
        bottom: "Go to bed with satisfaction"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        top: "Do something today",
        bottom: "That your future self will thank you for"
    }
];

export async function GET() {
    const item = content[Math.floor(Math.random() * content.length)];

    return NextResponse.json({
        imageUrl: item.imageUrl,
        title: item.top,
        subreddit: "motivation",
        author: item.bottom
    });
}