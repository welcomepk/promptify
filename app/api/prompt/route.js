import { connectDB } from "@utils/db";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    try {
        await connectDB();
        const prompts = await Prompt.find({}).populate('creator').sort({ updatedAt: "-1" })
        const headers = { 'Cache-Control': 'no-cache', 'Content-Type': 'application/json' };
        return new Response(JSON.stringify(prompts), { status: 200, headers })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

