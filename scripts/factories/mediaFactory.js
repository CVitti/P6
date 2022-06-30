class MediaFactory{
    constructor(options, firstName){
        if (options.image) {
            return new Picture(options, firstName);
        }else if (options.video) {
            return new Video(options, firstName);
        }
    }
}