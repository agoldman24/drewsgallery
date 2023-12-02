import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://drewsgallery.herokuapp.com/api"
      : "http://localhost:9000/api",
});
