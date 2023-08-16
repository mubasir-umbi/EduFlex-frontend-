import { toast } from "react-toastify";



 const imageUploads = (pics) => {

    if (!pics) {
      return toast.error("Please Select a image");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernwebapp");
      data.append("cloud_name", "mubasir umbi");

      fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const url = data.url.toString()
          console.log(url, 'am urlllllllllllll');
          return url
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please select a image");
      return;
    }
  };


  export default imageUploads