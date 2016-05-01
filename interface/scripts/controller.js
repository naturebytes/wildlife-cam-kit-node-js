class Controller {

  constructor() {
    this.updateThumbnails = this.updateThumbnails.bind(this);

    this.socket = io();
    this.registerSocketListeners();
  }

  registerSocketListeners() {
    this.socket.on("connect", this.updateThumbnails);
    this.socket.on("listAll", (data) => this.fireEvent("thumbnailsUpdated", data));
    this.socket.on("takePhoto", (data) => this.fireEvent("photoTaken", data));
    this.socket.on("deletePhoto", (data) => this.fireEvent("photoDeleted", data));
  }

  takePhoto() {
    this.socket.emit("takePhoto");
  }

  deletePhoto(id) {
    this.socket.emit("deletePhoto", id);
  }

  updateThumbnails() {
    this.socket.emit("listAll");
  }

  fireEvent(name, data) {
    if(!data.success)
      return;

    let event = new CustomEvent(name, {'detail': data});
    document.dispatchEvent(event);
  }

}
