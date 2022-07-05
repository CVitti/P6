import Video from "./video.js";
import Picture from "./picture.js";

export default class MediaFactory{
    constructor(media, firstName){
        if(media.image){
            return new Picture(media, firstName);
        }else if(media.video){
            return new Video(media, firstName);
        }
    }
}