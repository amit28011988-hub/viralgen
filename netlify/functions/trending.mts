import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    // Fetch from multiple subreddits
    const subreddits = ['GetMotivated', 'pics', 'memes', 'wholesomememes'];
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

    // Fetch top posts from the day
    try {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}/top/.json?limit=25&t=day`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: 'Failed to fetch from Reddit' }), { status: 500 });
        }

        const data = await res.json();

        // Filter for valid image posts
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
            return new Response(JSON.stringify({ error: 'No images found' }), { status: 404 });
        }

        const randomPost = posts[Math.floor(Math.random() * posts.length)];

        return new Response(JSON.stringify({
            imageUrl: randomPost.url,
            title: randomPost.title,
            subreddit: subreddit,
            author: randomPost.author
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
    }
};
