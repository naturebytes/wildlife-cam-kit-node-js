# Wildlife Cam Kit (NodeJS)
---
Created for use with the NatureBytes Wildlife camera kit, this runs a web interface which controls an instance of [MJPEG-Streamer-Experimental](https://github.com/jacksonliam/mjpg-streamer).

# Usage
#### MJPEG-Streamer
In order to start a stream from the Raspberry Pi, you will need to setup MJPEG-Streamer.
Run the following commands to get started:
```bash
# Run apt-get install git if the command can't be found
git clone https://github.com/jacksonliam/mjpg-streamer.git
cd mjpg-streamer-experimental
sudo apt-get install libjpeg8-dev
sudo apt-get install libv4l-dev
sudo apt-get install subversion
sudo make mjpg_streamer input_raspicam.so output_http.so

# Feel free to fiddle with the FPS (fps) and quality (q) parameters
./mjpg_streamer -o "output_http.so -p 8081" -i "input_raspicam.so -fps 22 -q 14 -hf"
```
#### Node.JS Server
It's up to you if you want to run this on the same Pi or on a separate computer. Set ```web.port``` in the config.js file to the port which you would like the web server to listen on. Additionally, set the details under the `streamer` property to those of the pi you are using (the port is the one used in the command above).

Finally, start the Node.JS server using the following commands:
```bash
npm install
npm start
```
