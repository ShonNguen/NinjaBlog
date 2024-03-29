import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState(''); 
    const [author, setAuthor] = useState('mario'); 
    const [isPending, setIsPending] = useState(false); 
    const history = useHistory(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author }; 

        setIsPending(true); 

        // to run json - npx json-server --watch data/db.json --port 8000
        fetch('http://localhost:8000/blogs',{
            method: 'POST', 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then( () => {
            console.log('new blog added'); 
            setIsPending(false); 
            history.push('/'); 
        })
    }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog title</label>
                <input 
                    type="text" 
                    required
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <label>Blog body</label>
                <textarea 
                    required
                    value={ body }
                    onChange={ (e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author</label>
                <select 
                    value={ author }
                    onChange={ (e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add blog</button> }
                { isPending && <button>Adding blog...</button>}
            </form>

            <p>title: { title }</p>
            <p>body: { body }</p>
            <p>author: { author }</p>
        </div>    
    );
}
 
export default Create;