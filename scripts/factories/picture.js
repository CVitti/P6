class Picture extends Media{
    constructor(options, firstName){
        // console.log("Picture : ", options);
        let mediaContent = `<img src="assets/images/${firstName}/${options.image}" alt="" class="mediaContent">`;
        super(options, mediaContent);
    }
}