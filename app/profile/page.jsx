"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session.user.id}/posts`)
            const data = await res.json()
            setPosts(data)
        }
        if (session?.user.id) {
            fetchPosts();
        }

    }, [])

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                const filterdPosts = posts.filter(p => p._id !== post._id)
                setPosts(filterdPosts);
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalised profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile