$('#fileInput').on('change', function() {
  //console.log("file name is " + this.value);
  let formData = new FormData(this.form);
  formData.append("file", 'TXT.png');
  //console.log(formData);
  Post('/upload', formData);
  
  
  /*console.log(this.files[0]);
  let fileReader = new FileReader();
  fileReader.onload = function () {
    console.log(this.result);
    let view = new Uint8Array(this.result);
    console.log(view);
    if(/^image\/[jpeg|png|gif]/.test(this.type)) {
      $(`<img src="${ this.result }" />`).appendTo("body");
    }
  }
  fileReader.readAsArrayBuffer(this.files[0]);
  fileReader.readAsDataURL(this.files[0]);*/
});
