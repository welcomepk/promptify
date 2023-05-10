import PromptCard from "./PromptCard";

const PromptCardList = ({ prompts, handleTagClick }) => {
    return (<div className="mt-16 prompt_layout">
        {
            prompts.map(prompt => {
                return <PromptCard
                    key={prompt._id}
                    post={prompt}
                    handleTagClick={handleTagClick}
                />
            })
        }
    </div>)
}

export default PromptCardList;