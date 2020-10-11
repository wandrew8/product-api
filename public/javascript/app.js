// const form = document.querySelector(".add-product-form")
// form.addEventListener("submit", () => {
//     const image = document.querySelector(".cloudinaryImage");
//     console.log("form submitted")
//     console.log(image.src)
// })

const myWidget = cloudinary.createUploadWidget({
    cloudName: 'dcokaa0ia', 
    folder: 'worldtreats',
    uploadPreset: 'world-treats'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        const imageHolder = document.querySelector(".imageHolder");
        const url = result.info.thumbnail_url;
        imageHolder.innerHTML = `<img class="cloudinaryImage" src="${url}" />`
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);

    