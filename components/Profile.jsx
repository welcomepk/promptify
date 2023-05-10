import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

    return (
        <section className="w-full">
            <h1 className="text-left head_text mb-3"><span className="blue_gradient">{name} Profile</span></h1>
            <p className="text-left">{desc}</p>
            <div className="feed">

                <div className="prompt_layout ">
                    {
                        data.map(prompt => {
                            return <PromptCard
                                key={prompt._id}
                                post={prompt}
                                handleEdit={() => handleEdit && handleEdit(prompt)}
                                handleDelete={() => handleDelete && handleDelete(prompt)}
                            />
                        })
                    }
                </div>
            </div>

        </section>
    )
}

export default Profile