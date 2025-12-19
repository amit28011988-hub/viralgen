import { NextResponse } from 'next/server';

const content = [
    { imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", top: "Success is not final", bottom: "Failure is not fatal: It is the courage to continue that counts" },
    { imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop", top: "The only way to do great work", bottom: "Is to love what you do" },
    { imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop", top: "Believe you can", bottom: "And you're halfway there" },
    { imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop", top: "Your limitation—it's only your imagination", bottom: "Push yourself, because no one else is going to do it for you" },
    { imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop", top: "Great things never come from comfort zones", bottom: "Dream it. Wish it. Do it." },
    { imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop", top: "Success doesn't just find you", bottom: "You have to go out and get it" },
    { imageUrl: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop", top: "The harder you work for something", bottom: "The greater you'll feel when you achieve it" },
    { imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop", top: "Don't stop when you're tired", bottom: "Stop when you're done" },
    { imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop", top: "Wake up with determination", bottom: "Go to bed with satisfaction" },
    { imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop", top: "Do something today", bottom: "That your future self will thank you for" },
    { imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop", top: "The secret of getting ahead", bottom: "Is getting started" },
    { imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop", top: "It always seems impossible", bottom: "Until it's done" },
    { imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop", top: "You are never too old", bottom: "To set another goal or to dream a new dream" },
    { imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop", top: "The best time to plant a tree was 20 years ago", bottom: "The second best time is now" },
    { imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=600&fit=crop", top: "Dream bigger", bottom: "Do bigger" },
    { imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop", top: "Opportunities don't happen", bottom: "You create them" },
    { imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop", top: "Don't watch the clock", bottom: "Do what it does. Keep going." },
    { imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop", top: "The best revenge", bottom: "Is massive success" },
    { imageUrl: "https://images.unsplash.com/photo-1475776408506-9a5371e7a068?w=800&h=600&fit=crop", top: "Life is 10% what happens to you", bottom: "And 90% how you react to it" },
    { imageUrl: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&h=600&fit=crop", top: "Fall seven times", bottom: "Stand up eight" },
    { imageUrl: "https://images.unsplash.com/photo-1445346366695-5bf62de05412?w=800&h=600&fit=crop", top: "What you get by achieving your goals", bottom: "Is not as important as what you become" },
    { imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", top: "Everything you've ever wanted", bottom: "Is on the other side of fear" },
    { imageUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop", top: "Believe in yourself", bottom: "Take on your challenges. Dig deep within yourself to conquer fears." },
    { imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop", top: "Nobody built like you", bottom: "You design yourself" },
    { imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop", top: "The future belongs to those", bottom: "Who believe in the beauty of their dreams" },
    { imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop", top: "It does not matter how slowly you go", bottom: "As long as you do not stop" },
    { imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop", top: "Never give up on a dream", bottom: "Just because of the time it will take to accomplish it" },
    { imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop", top: "Start where you are", bottom: "Use what you have. Do what you can." },
    { imageUrl: "https://images.unsplash.com/photo-1520338258525-1b7fa5a13e9b?w=800&h=600&fit=crop", top: "Good things come to those who hustle", bottom: "While they wait" },
    { imageUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop", top: "You don't have to be great to start", bottom: "But you have to start to be great" },
    { imageUrl: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=800&h=600&fit=crop", top: "The only impossible journey", bottom: "Is the one you never begin" },
    { imageUrl: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=800&h=600&fit=crop", top: "Don't limit your challenges", bottom: "Challenge your limits" },
    { imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop", top: "Life begins at the end", bottom: "Of your comfort zone" },
    { imageUrl: "https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&h=600&fit=crop", top: "Make each day your masterpiece", bottom: "Life is too short not to give it your all" },
    { imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop", top: "Be stronger than your excuses", bottom: "Your future self will thank you" },
    { imageUrl: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=800&h=600&fit=crop", top: "Doubt kills more dreams", bottom: "Than failure ever will" },
    { imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop", top: "The difference between who you are", bottom: "And who you want to be is what you do" },
    { imageUrl: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=600&fit=crop", top: "Don't be afraid to give up the good", bottom: "To go for the great" },
    { imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&h=600&fit=crop", top: "Your only limit", bottom: "Is you" },
    { imageUrl: "https://images.unsplash.com/photo-1478428828232-d0c732a1a4e1?w=800&h=600&fit=crop", top: "Sometimes we're tested", bottom: "Not to show our weaknesses, but to discover our strengths" },
    { imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop", top: "The struggle you're in today", bottom: "Is developing the strength you need for tomorrow" },
    { imageUrl: "https://images.unsplash.com/photo-1517030330255-a25c0aae42eb?w=800&h=600&fit=crop", top: "If you're going through hell", bottom: "Keep going" },
    { imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop", top: "Success is not how high you have climbed", bottom: "But how you make a positive difference to the world" },
    { imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop", top: "The pain you feel today", bottom: "Will be the strength you feel tomorrow" },
    { imageUrl: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=800&h=600&fit=crop", top: "You are what you do", bottom: "Not what you say you'll do" },
    { imageUrl: "https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=800&h=600&fit=crop", top: "Small steps every day", bottom: "Lead to big changes over time" },
    { imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop", top: "Strive for progress", bottom: "Not perfection" },
    { imageUrl: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=600&fit=crop", top: "Be fearless in the pursuit", bottom: "Of what sets your soul on fire" },
    { imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop", top: "Work hard in silence", bottom: "Let success make the noise" },
    { imageUrl: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&h=600&fit=crop", top: "Every accomplishment starts", bottom: "With the decision to try" }
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