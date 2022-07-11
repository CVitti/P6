export default class Media{
    constructor(options){
        this.title = options.title;
        this.likes = options.likes;
        this.id = options.id;
    }
    create(mediaContent){
        let mediaTitle = `<p class="mediaTitle spacing">${this.title}</p>`;
        let mediaLikes = `
                        <div class="divLikes" aria-label="likes">
                            <div class="smallSpacing">${this.likes}</div>
                            <i class="fa-solid fa-heart fa-lg"></i>
                        </div>`;
        this.article = `<article class="articleMedia">
                            <a href="#" aria-label="${this.title}, vue agrandie" data-id="${this.id}" id="${this.id}" class="mediaLink" role="button" aria-haspopup="dialog" aria-controls="lightbox">
                            ${mediaContent}
                            </a>                            
                            ${mediaTitle}
                            ${mediaLikes}
                        </article>`;   
    }
}