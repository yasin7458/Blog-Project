import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [isadd, setIsAdd] = useState(true);
  const [Update, setUpdate] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleSubmit = () => {

    const blogData = { title, description, category, image, date };

    if (isadd) {
      fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
      });

    } else {
      fetch(`http://localhost:3000/blogs/${Update}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
      });
    }
  };

  const handleEdit = (blog) => {
    setIsAdd(false);
    setUpdate(blog.id);
    setTitle(blog.title);
    setDescription(blog.description);
    setCategory(blog.category);
    setImage(blog.image);
    setDate(blog.date);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    });
  };

  return (
    <div className="blog-page">

      <div className="blog-header ">
        <h2>Blog Management System</h2>
      </div>

      <div className="container-fluid px-lg-4">

        <div className="row g-3">

          <div className="col-lg-4 col-md-12">

            <div className="blog-form">

              <h3 className="form-title"> {isadd ? "Add New Blog" : "Edit Blog"} </h3>

              <form onSubmit={handleSubmit}>

                <div className="mb-2">
                  <label className="form-label"> Blog Title </label>
                  <input type="text" className="form-control" placeholder="Enter blog title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="mb-2">
                  <label className="form-label"> Description </label>
                  <textarea className="form-control" rows="3" placeholder="Enter blog description" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                </div>

                <div className="mb-2">
                  <label className="form-label"> Category </label>

                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required >
                    <option value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Education">Education</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Finance">Finance</option>
                    <option value="Photography">Photography</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Environment">Environment</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label"> Image URL </label>
                  <input type="url" className="form-control" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label"> Publish Date </label>
                  <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <button type="submit" className="add-blog w-100" > {isadd ? "Add Blog" : "Update Blog"} </button>
              </form>

            </div>
          </div>

          <div className="col-lg-8 col-md-12">

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2"></div>

            <div className="row g-4">

              {blogs.map((element) => (

                <div className="col-xl-6 col-md-6 col-sm-12" key={element.id}>

                  <div className="blog-card h-100">

                    <img src={element.image} className="blog-image" alt={element.title} />

                    <div className="p-3" style={{ background: "linear-gradient(136deg, #ECE9E6 0%, #ffffff 100%)" }}>

                      <div className="d-flex justify-content-between align-items-center gap-2 mb-3">

                        <span className="badge bg-secondary"> {element.category} </span>

                        <small className="text-secondary"> {element.date} </small>

                      </div>

                      <h5 className="blog-title"> {element.title} </h5>

                      <p className="blog-description"> {element.description} </p>

                      <div className="d-flex gap-2 mt-3">

                        <button className="Edit-Btn" onClick={() => handleEdit(element)} > Edit </button>

                        <button className="Delete-Btn" onClick={() => handleDelete(element.id)}> Delete </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))};
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
