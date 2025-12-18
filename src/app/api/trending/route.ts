import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch from multiple subreddits to get variety: GetMotivated, pics, memes
        const subreddits = ['GetMotivated', 'pics', 'memes', 'wholesomememes'];
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

        // Fetch top posts from the day
        const res = await fetch(`https://www.reddit.com/r/${subreddit}/top/.json?limit=25&t=day`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) {
            console.error("Reddit API Error:", res.status, res.statusText);
            return NextResponse.json({ error: 'Failed to fetch from Reddit' }, { status: 500 });
        }

        const data = await res.json();

        // Filter for valid image posts (not videos, not external links usually)
        const posts = data.data.children
            .map((child: any) => child.data)
            .filter((post: any) => {
                return (
                    post.url &&
                    post.url.match(/\.(jpg|jpeg|png)$/i) &&
                    !post.is_video &&
                    !post.over_18
                );
            });

        if (posts.length === 0) {
            return NextResponse.json({ error: 'No images found' }, { status: 404 });
        }

        const randomPost = posts[Math.floor(Math.random() * posts.length)];

        return NextResponse.json({
            imageUrl: randomPost.url,
            title: randomPost.title, // Use title as the "Caption"
            subreddit: subreddit,
            author: randomPost.author
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
