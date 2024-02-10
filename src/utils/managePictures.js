export const loadPicture = async (pictureFile) => {
  if(pictureFile) {
    const formData = new FormData();
    formData.append("image", pictureFile);
    console.log(formData);
    await fetch('/api/pictures',{
      method:"POST",
      body: formData,
      // headers:{"Content-Type": "multipart/form-data"}
    })
    .then(response=> response.json())
    .then(response=> response.imagePath)
    .catch(error=> console.log('Failed to send picture to API', error)) 
  }
}

export const deletePicture = async (pictureName) => {
  if(pictureName) {
    const formData = new FormData();
    formData.append("imageName", pictureName);
    console.log(formData);
    await fetch('/api/pictures',{
      method:"DELETE",
      body: formData,
      // headers:{"Content-Type": "multipart/form-data"}
    })
    .then(response=> response.json())
    .then(response=> console.log(response.imageName))
    .catch(error=> console.log('Failed to send picture to API', error)) 
  }
}