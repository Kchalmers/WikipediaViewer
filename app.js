function Wikipedia() {
    const self = this;
    this.initialize = function () {
        $(".random").click(this.getRandomArticle);
        $(".search").click(this.searchArticles);
        $(document).keypress(function(event){
            if(event.keyCode === 13){
                self.searchArticles()
            }
        })
    };
    this.getRandomArticle = function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    };
    this.searchArticles = function () {
        $.ajax({
            url: `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=${$(".searchValues").val()}`,
            success(response){
                $(".display").empty();
                self.displayArticleList(response)
            }
        })
    };
    this.displayArticleList = function (info) {
        const data = info.query.pages;
        for(let i = 0; i < Object.keys(data).length; i++){
            var a = document.createElement('a');
            a.href =  `https://en.wikipedia.org/?curid=${Object.keys(data)[i]}`;
            a.target = "_blank";
            let newCard = document.createElement('div');
            newCard.className = "card";
            let newTitle = document.createElement('div');
            newTitle.className = "title";
            newTitle.innerHTML = data[Object.keys(data)[i]].title;
            let summary = data.extract;
            newCard.append(newTitle);
            let newSum = document.createElement('div');
            newSum.className = "sum";
            newSum.innerHTML = data[Object.keys(data)[i]].extract;
            newCard.append(newTitle, newSum);
            a.append(newCard);
            $(".display").append(a);
        }
    }
}

$(document).ready(function () {
    const search = new Wikipedia();
    search.initialize();
});