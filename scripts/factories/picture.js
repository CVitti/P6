import Media from "./media.js";

export default class Picture extends Media{
    constructor(options, firstName){
        super(options);
        this.image = options.image;
        this.title = options.title;
        this.firstName = firstName;
        this.create();
    }
    create(){
        let mediaContent = `<img src="assets/images/${this.firstName}/${this.image}" alt="${this.title}" class="mediaContent">`;
        super.create(mediaContent);
    }
}