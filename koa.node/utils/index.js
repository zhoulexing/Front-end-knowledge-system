
const mimeNames = {  
    ".css": "text/css",  
    ".html": "text/html",  
    ".js": "application/javascript",  
    ".mp3": "audio/mpeg",  
    ".mp4": "video/mp4",  
    ".ogg": "application/ogg",   
    ".ogv": "video/ogg",   
    ".oga": "audio/ogg",  
    ".txt": "text/plain",  
    ".wav": "audio/x-wav",  
    ".webm": "video/webm"
};  
module.exports.getMimeNameFromExt = ext => {
    const result = mimeNames[ext.toLowerCase()];  
       
    if (result == null)  
        result = "application/octet-stream";  
       
    return result;  
}