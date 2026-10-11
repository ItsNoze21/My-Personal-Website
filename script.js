const library = [
    {
        id: "hunger-games",
        title: "The Hunger Games",
        cover: "assets/books/the-hunger-games.jpeg",
        rating: 4,
        review: "Put review here",
        books: []
    },
];

function seriesCard(series) {
    return `
        <div class="series-card" data-show="dialog-${series.id}">
        <img src="${series.cover}" alt="${series.title} book cover" />
        <h3>${series.title}</h3>
        </div>
    `;
}

function seriesDialog(series) {
    return `
        <dialog class="series-dialog" id="dialog-${series.id}">
            <img src="${series.cover}" alt="${series.title} book cover" />
            <h3>${series.title}</h3>
            <p>${series.review}</p>
            <form method="dialog"><button>← All series</button></form>
        </dialog>
    `
}

const grid = document.getElementById("view-series-list");
grid.innerHTML = library.map(seriesCard).join("");

const holder = document.getElementById("dialog-holder");
holder.innerHTML = library.map(seriesDialog).join("");

document.querySelectorAll("[data-show]").forEach((el) => {
    el.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = document.getElementById(el.dataset.show);
        dialog.showModal();

        const card = el.getBoundingClientRect();
        const box = dialog.getBoundingClientRect();


        const dx = (card.left + card.width / 2) - (box.left + box.width / 2);
        const dy = (card.top + card.height / 2) - (box.top + box.height / 2);

        const scale = card.width / box.width;

        dialog.animate(
            [
                {transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0},
                {transform: "translate(0px, 0px) scale(1)", opacity: 1},
            ],
            {duration: 300, easing: "ease-out"}
        );
    });
});