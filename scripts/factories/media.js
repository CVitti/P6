export default class Media{
    constructor(options){
        this.title = options.title;
        this.likes = options.likes;
    }
    create(mediaContent){
        let mediaTitle = `<h2 class="mediaTitle spacing">${this.title}</h2>`;
        let mediaLikes = `
                        <div class="divLikes" aria-label="likes">
                            <div>${this.likes}</div>
                            <i class="fa-solid fa-heart fa-lg"></i>
                        </div>`;
        this.article = `<article class="articleMedia">
                            <a href="#" aria-label="${this.title}, vue agrandie">
                            ${mediaContent}
                            </a>                            
                            ${mediaTitle}
                            ${mediaLikes}
                        </article>`;   
    }
}