



class Upload{
    files: any;
 


    
  onClick(fileUploads) {
    const fileUpload = fileUploads;
    fileUpload.onchange = () => {

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
     
    };


  return  this.files[0].data;
  }

 
}