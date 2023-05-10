'use client';
import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {

    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // fetching all prompts
    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch("/api/prompt");
                const data = await response.json();
                setPrompts(data);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        fetchPrompts();

    }, []);

    const handleSearchChange = (e) => {

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
                isLoading ? "Loading..." : (
                    <PromptCardList
                        prompts={prompts}
                        handleTagClick={() => { }}
                    />)
            }

        </section>
    )
}

export default Feed