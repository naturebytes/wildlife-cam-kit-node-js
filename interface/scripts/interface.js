class Interface {

  constructor(controller) {
    this.controller = controller;
    this.shutterSound = new Audio("../audio/shutter.mp3");

    this.photoButton = document.querySelector("#take-photo");
    this.previewCloseButton = document.querySelector("#close-preview");
    this.previewDeleteButton = document.querySelector("#delete-preview");
    this.preview = document.querySelector("#preview");
    this.previewImage = document.querySelector("#preview-image");
    this.photos = document.querySelector("#photos");
    this.stream = document.querySelector("#stream");

    this.takePhoto = this.takePhoto.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.deletePreview = this.deletePreview.bind(this);
    this.renderThumbnail = this.renderThumbnail.bind(this);
    this.unrenderThumbnail = this.unrenderThumbnail.bind(this);

    this.registerEventListeners();
  }

  registerEventListeners() {
    this.photoButton.addEventListener("click", this.takePhoto);
    this.previewCloseButton.addEventListener("click", this.closePreview);
    this.previewDeleteButton.addEventListener("click", this.deletePreview);

    document.addEventListener("thumbnailsUpdated",
      (data) => this.renderThumbnails(data.detail.fileNames));
    document.addEventListener("photoTaken",
      (data) => this.renderThumbnail(data.detail.fileName));
    document.addEventListener("photoDeleted",
      (data) => this.unrenderThumbnail(data.detail.fileName));
  }

  takePhoto(evt) {
    this.stream.style.outline = "2px solid white";
    this.shutterSound.play();
    this.controller.takePhoto();
    evt.preventDefault();
  }

  deletePhoto(id) {
    this.controller.deletePhoto(id);
  }

  unrenderThumbnail(id) {
    document.getElementById(id).remove();
  }

  showPreview(id) {
    this.previewImage.src = `photos/${id}`;
    this.previewImage.ref = id;
    this.preview.className = "";
  }

  closePreview(evt) {
    this.preview.className = "hidden";
    evt.preventDefault();
  }

  deletePreview(evt) {
    this.preview.className = "hidden";
    this.deletePhoto(this.previewImage.ref);

    evt.preventDefault();
  }

  renderThumbnails(files) {
    this.photos.innerHTML = "";
    files.reverse();
    files.forEach(this.renderThumbnail);
  }

  renderThumbnail(file) {
    if(file === ".DS_Store")
      return;

    this.stream.style.outline = "2px solid #2196F3";

    let newElement = document.createElement("img");
    newElement.src = `photos/${file}`;
    newElement.className = "thumbnail";
    newElement.id = file;

    newElement.addEventListener("click", () => this.showPreview(file));

    this.photos.insertBefore(newElement, this.photos.firstChild);
  }

}

window.addEventListener("load", _ => {
  let controller = new Controller();
  let gui = new Interface(controller);
});
