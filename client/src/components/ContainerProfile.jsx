import "./containerProfile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import BtnProfile from "./BtnProfile";
//import Posts from "./posts/posts";

//fetch id from context api
const id = "63af0594151ed1332c88f2ad";
function ContainerProfile() {
  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [delResponse, setdelResponse] = useState(null);
  const [editResponse, setEditResponse] = useState(null);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [changedImage, setChangedImage] = useState(false)
  const [content, setcontent] = useState(null);
  const [open, setOpen] = useState(false);
  const [idd, setIdd] = useState(null);
  const [value, setValue] = useState(0); // integer state

  // const [post, setPost] = useState([]);
  //all posts
  useEffect(() => {
    console.log('in useEffect')
    axios
      .get(`http://localhost:5000/api/posts/singleuserpost/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);
  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };





const viewDetails = (id) => {
  navigate({
    pathname: "/post",
    search: createSearchParams({
      id: id,
    }).toString(),
  });
};

const deletePost = (event, id) => {
  event.stopPropagation();
  axios.delete(`http://localhost:5000/api/posts/${id}`).then((response) => {
    setdelResponse(response.data);
  });
};

const editPost = (event, location, description, id, image) => {

  event.stopPropagation()

  setLocation(location)
  setcontent(description)
  setImage(image)
  setOpen(true)
  setIdd(id)

};
const editImage = (e) => {

  setImage(e.target.files[0]);
  setChangedImage(true)

}

function useForceUpdate() {

  setValue(value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}

const updatePost = async (e) => {
  e.preventDefault();
  const data = new FormData()
  data.append('file', image)
  //upload image to server
  let responseOne = changedImage && await axios.post("http://localhost:5000/api/images/upload", data).then(response => {


    return response.data
  }

  )



  if (!changedImage) {
    console.log('here')
    axios.put(`http://localhost:5000/api/posts/${idd}`, {
      location,
      description: content,
      image: image,
      authorID: "63af0594151ed1332c88f2ad",
    })
      .then((response) => {

        console.log("success:", response.data);
        useForceUpdate()
      })
  }

  if (responseOne?.success) {
    console.log('here')
    axios.put(`http://localhost:5000/api/posts/${id}`, {
      location,
      description: content,
      image: responseOne.Image._id,
      authorID: "63af0594151ed1332c88f2ad",
    })
      .then((response) => {

        console.log("success:", response.data);
        useForceUpdate()
      })
  }




};

return (
  <>


    <div className="container" style={{ border: "1px solid white" }}>
      {/* get all posts */}
      {listOfPosts.map((value, key) => {
        let array = value.image?.img?.data?.data
        let binaryString = `data:image/jpeg;base64,${arrayBufferToBase64(array)}`

        return (
          <div key={key}>
            <div
              className="post"
              style={{
                border: "1px solid white",
                width: "300px",
                height: "300px",
              }}
              onClick={() => viewDetails(value._id)}
            >

              <div className="location">{value.location}</div>
              <div className="content">{value.description}</div>
              <div className="image">
                <span
                  className="material-symbols-outlined"
                  onClick={(event) => deletePost(event, value._id)}
                >
                  delete
                </span>
                <span className="material-symbols-outlined"
                  onClick={(event) => editPost(event, value.location, value.description, value._id, value.image._id)}>
                  edit
                </span>
                <img
                  src={binaryString}
                  style={{ width: "100%", height: "15em" }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {open && (
        <form>
          <input
            type="text"
            name="location"
            id=""
            value={location}
            style={{ width: "30em", marginBottom: "2em" }}
            placeholder="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <textarea
            name="content"
            id=""
            cols="30"
            rows="10"
            value={content}
            placeholder="your description"
            style={{ width: "30em", marginBottom: "2em" }}
            onChange={(e) => {
              setcontent(e.target.value);
            }}
          ></textarea>
          <br />
          <input
            type="file"
            name="file"

            onChange={editImage}
          />
          <br />
          <button
            type="submit"
            style={{ zIndex: "10", marginTop: "10em", marginBottom: "3em" }}
            onClick={updatePost}
          >
            Update Post
          </button>
        </form>
      )}
    </div>

    <BtnProfile />

  </>
);
}

export default ContainerProfile;