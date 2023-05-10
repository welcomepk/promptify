"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from 'next/navigation';
import Form from "@components/Form"

const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState();
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const router = useRouter();
    const searchParams = useSearchParams();

    const prompId = searchParams.get("id");

    // get prompt details
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${prompId}`)
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if (prompId)
            getPromptDetails();
    }, [prompId])

    const editPrompt = async (e) => {
        e.preventDefault();

        if (!prompId) alert("prompt Id required")
        else {

            setSubmitting(true);
            try {
                const res = await fetch(`/api/prompt/${prompId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })
                if (res.ok) {
                    router.push('/');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }

        }
    }

    return <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
}

export default UpdatePrompt