import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
    return ( 
        <div className="home">
            <h2>{ title }</h2>
            {blogs.map((blogEl) => (
                <div className="blog-preview" key={blogEl.id}>
                    <Link to={`/blogs/${blogEl.id}`}>
                        <h2>{ blogEl.title }</h2>
                        <p>Whitten by { blogEl.author }</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;