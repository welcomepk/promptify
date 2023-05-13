'use client';
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import axios from "axios";
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

const fetchData = async () => {
    const response = await axios.get("/api/prompt?timestamp" + Date.now());
    return response.data;
};

const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        console.log("Feed 👋");
        // fetchPosts();
        fetchData().then((newData) => {
            setPrompts(newData);
        });
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

export default Feed