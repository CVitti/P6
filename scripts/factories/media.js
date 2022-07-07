export default class Media{
    constructor(options){
        this.title = options.title;
        this.likes = options.likes;
        this.id = options.id;
    }
    create(mediaContent){
        let mediaTitle = `<h2 class="mediaTitle spacing">${this.title}</h2>`;
        let mediaLikes = `
                        <div class="divLikes" aria-label="likes">
                            <div class="smallSpacing">${this.likes}</div>
                            <i class="fa-solid fa-heart fa-lg"></i>
                        </div>`;
        this.article = `<article class="articleMedia">
                            <a href="#" aria-label="${this.title}, vue agrandie" data-id="${this.id}" class="mediaLink">
                            ${mediaContent}
                            </a>                            
                            ${mediaTitle}
                            ${mediaLikes}
                        </article>`;   
    }
}