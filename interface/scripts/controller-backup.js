class Controller {

  constructor() {

    this.photos = document.querySelector("#photos");
    this.preview = document.querySelector("#preview");
    this.previewImage = document.querySelector("#preview-image");
    this.stream = document.querySelector("stream");

    this.updatePhotos.bind(this);
    this.showPhoto.bind(this);
    this.hidePhoto.bind(this);

    registerEventListeners();
  }

  registerEventListeners() {
    

    document.querySelector("")
  }

  updatePhotos(data) {
    if(!data.success)
      return;


  }

  displayPhoto(file) {

  }

}
