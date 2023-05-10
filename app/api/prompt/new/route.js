import { connectDB } from "@utils/db"
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()
    try {
        await connectDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log("❌ error create prompt: ", error)
        return new Response("Failed to create new prompt", { status: 500 })
    }
}