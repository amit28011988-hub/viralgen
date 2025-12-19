const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const FB_PAGE_ID = process.env.FB_PAGE_ID;

// Motivational content (same as your API)
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
    // Add all 50 posts here (truncated for brevity - copy from your route.ts)
];

async function createMemeImage(imageUrl, topText, bottomText) {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext('2d');

    // Load and draw the background image
    const image = await loadImage(imageUrl);
    ctx.drawImage(image, 0, 0, 800, 600);

    // Draw top text (yellow bar)
    ctx.fillStyle = '#facc15';
    ctx.fillRect(0, 0, 800, 100);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(topText, 400, 65);

    // Draw bottom text (black bar)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 500, 800, 100);
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(bottomText, 400, 555);

    return canvas.toBuffer('image/png');
}

async function getPageId() {
    try {
        const response = await axios.get(`https://graph.facebook.com/v18.0/me/accounts`, {
            params: { access_token: FB_ACCESS_TOKEN }
        });

        const page = response.data.data.find(p => p.name === 'Momentum Mindset Auto Poster');
        return page ? page.id : null;
    } catch (error) {
        console.error('Error getting page ID:', error.message);
        return null;
    }
}

async function postToFacebook() {
    try {
        console.log('Generating meme...');

        // Get random post
        const post = content[Math.floor(Math.random() * content.length)];

        // Create meme image
        const imageBuffer = await createMemeImage(post.imageUrl, post.top, post.bottom);

        // Save temporarily
        fs.writeFileSync('/tmp/meme.png', imageBuffer);

        // Get page ID if not provided
        let pageId = FB_PAGE_ID;
        if (!pageId) {
            pageId = await getPageId();
            console.log('Found Page ID:', pageId);
        }

        if (!pageId) {
            throw new Error('Could not find page ID');
        }

        console.log('Uploading to Facebook...');

        // Upload photo to Facebook
        const FormData = require('form-data');
        const form = new FormData();
        form.append('source', fs.createReadStream('/tmp/meme.png'));
        form.append('message', `${post.top}\n\n${post.bottom}\n\n#Motivation #Success #MindsetMatters`);
        form.append('access_token', FB_ACCESS_TOKEN);

        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${pageId}/photos`,
            form,
            { headers: form.getHeaders() }
        );

        console.log('✅ Posted successfully!', response.data);

        // Cleanup
        fs.unlinkSync('/tmp/meme.png');

    } catch (error) {
        console.error('❌ Error posting to Facebook:', error.response?.data || error.message);
        process.exit(1);
    }
}

postToFacebook();
