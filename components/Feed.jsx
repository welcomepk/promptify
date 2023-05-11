'use client';
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log("Feed 👋");
    // fetching all prompts
    const fetchPosts = async () => {
        setIsLoading(true);
        const response = await fetch("/api/prompt?timestamp" + Date.now());
        const data = await response.json();
        console.log(data);
        setPrompts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {

    }
    const handleTagClick = async () => {

    }
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a Tag or a Username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer" />
            </form>

            {
                isLoading
                    ? "Loading..."
                    : (
                        <PromptCardList
                            data={prompts}
                            handleTagClick={handleTagClick}
                        />
                    )
            }

        </section>
    )
}

// Feed.getInitialProps = async () => {
//     const response = await fetch("/api/prompt?timestamp=" + Date.now(), { cache: 'no-cache' });
//     const data = await response.json();
//     return { prompts: data };
// };

export default Feed