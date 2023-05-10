"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    const [copied, setCopied] = useState('');
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(""), 3000);
    }
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex justify-start items-start gap-3 cursor-pointer">
                    <Image
                        src={post?.creator?.image}
                        alt="user_image"
                        width={16}
                        height={16}
                        className="rounded-full object-contain"
                    />
                    <div className="flex flex-col">
                        <h3 className="mb-1 leading-none font-satoshi font-semibold text-gray-900">{post?.creator?.username}</h3>
                        <p className="font-inter text-xs text-gray-500">{post?.creator.email}</p>
                    </div>
                </div>
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={copied === post?.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        alt="copy_clipboard"
                        width={12}
                        height={12}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
            <p
                onClick={() => { handleTagClick && handleTagClick(post?.tag) }}
                className="font-inter blue_gradient cursor-pointer text-sm "
            >
                {post?.tag}
            </p>
            {/* {alert(post.creator.id)} */}
            {session?.user.id === post.creator._id && pathname === '/profile' && (
                <div className="mt-5 flex_center border-t border-gray-200 gap-4 pt-3">
                    <p className="font-inter text-sm green_gradient hover:text-green-600  cursor-pointer"
                        onClick={() => handleEdit(post)}
                    >Edit</p>
                    <p className="font-inter text-sm orange_gradient hover:text-primary-orange cursor-pointer"
                        onClick={() => handleDelete(post)}
                    >Delete</p>
                </div>
            )}
        </div>
    )
}

export default PromptCard