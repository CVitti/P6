class Media{
    constructor(options, mediaContent){
        this.create(options, mediaContent);
    }
    create(options, mediaContent){
        let mediaTitle = `<h2 class="mediaTitle">${options.title}</h2>`;
        let mediaLikes = `<div class="divLikes">${options.likes}<i class="fa-solid fa-heart fa-lg"></i></div>`;
        let article = `<article class="articleMedia">${mediaContent}${mediaTitle}${mediaLikes}</article>`;
        document.getElementById("divMedias").innerHTML += article;        
    }
}