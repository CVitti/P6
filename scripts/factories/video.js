class Video extends Media{
    constructor(options, firstName){
        // console.log("Video : ", options);
        let mediaContent = `<video class="mediaContent"><source src="assets/images/${firstName}/${options.video}" type="video/mp4"></video>`;
        super(options, mediaContent);
    }
}