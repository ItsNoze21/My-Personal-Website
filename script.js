
const library = [
    {
        id: "hunger-games",
        type: "series",
        title: "The Hunger Games",
        cover: "assets/books/the-hunger-games.jpeg",
        rating: 4,
        review: "The Hunger Games is one of my favorite book series. It has excellent worldbuilding and well thought out characters. Definitely a great choice for anyone who likes dystopian novels.",
        books: [
            {
                id: "hunger-games-1",
                title: "The Hunger Games",
                cover: "assets/books/the-hunger-games.jpeg",
                status: "Read",
                rating: 4,
                review: "The Hunger Games is an excellent dystopian novel. Its great writing and first person point-of-view really help immerse the reader into the story."
            },
            {
                id: "hunger-games-2",
                title: "Catching Fire",
                cover: "assets/books/catching-fire.jpeg",
                status: "Read",
                rating: 4.5,
                review: "Catching Fire is an great sequel to the already amazing original. It builds upon the original story without feeling extra.[[spoiler: the book was sad, yet incredibly engaging.]]"
            },
            {
                id: "hunger-games-3",
                title: "Mockingjay",
                cover: "assets/books/mockingjay.jpeg",
                status: "Read",
                rating: 5,
                review: "Mockingjay was a perfect ending to the series. It mixed sadness with new beginnings, and masterfully harnesses your emotions to draw you in."
            }
        ]
    },
        {
        id: "1984",
        type: "standalone",
        title: "1984",
        cover: "assets/books/1984.jpg",
        rating: "TBD",
        review: "Currently Reading",
        books: [

        ],
    }
];

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[character]));
}

function formatReview(review = "") {
    return escapeHTML(review).replace(
        /\[\[spoiler: (.*?)\]\]/g,
        (_, spoiler) => `
            <span class="spoiler" role="button" tabindex="0"
                  aria-expanded="false">
                <span class="spoiler-text">${spoiler}</span>
            </span>
        `
    );
}

function seriesCard(series) {
    return `
        <button
            class="series-card"
            type="button"
            data-show-series="${escapeHTML(series.id)}"
        >
            <img
                class="series-cover"
                src="${escapeHTML(series.cover)}"
                alt="${escapeHTML(series.title)} book cover"
            />
            <h3>${escapeHTML(series.title)}</h3>
        </button>
    `;
}

function seriesDialog(series) {
    return `
        <dialog class="series-dialog" id="dialog-${escapeHTML(series.id)}">
            <div class="series-dialog-content">
                <img
                    class="series-cover"
                    src="${escapeHTML(series.cover)}"
                    alt="${escapeHTML(series.title)} book cover"
                />

                <div class="series-dialog-info">
                    <h3>${escapeHTML(series.title)}</h3>

                    <p>${formatReview(series.review || "No review added yet.")}</p>

                    <p>
                        ${series.rating == null
                            ? "No rating"
                            : `${series.type === "series" ? "Series Rating" : "Rating"}: ${escapeHTML(series.rating)}/5`
                        }
                    </p>
                </div>
            </div>
    ${series.type === "series" ? `
    <section class="books-section">
        <h3>Books in this series</h3>

        <div class="books-grid">
            ${(series.books || []).map(book => `
                <button
                    class="book-card"
                    type="button"
                    data-show-book="${escapeHTML(book.id)}"
                    data-series-id="${escapeHTML(series.id)}">

                    <img class="book-cover"
                        src="${escapeHTML(book.cover)}"
                        alt="${escapeHTML(book.title)} book cover"/>
                                <h4>${escapeHTML(book.title)}</h4>
                            </button>
                        `).join("")}
                    </div>
                </section>
            ` : ""}
        </dialog>
    `;
}

function bookDialog(series, book) {
    return `
        <dialog
            class="series-dialog book-dialog"
            id="book-${escapeHTML(book.id)}"
        >
            <div class="series-dialog-content">
                <img
                    class="series-cover"
                    src="${escapeHTML(book.cover)}"
                    alt="${escapeHTML(book.title)} book cover"
                />

                <div class="series-dialog-info">
                    <p class="book-series-name">
                        ${escapeHTML(series.title)}
                    </p>

                    <h3>${escapeHTML(book.title)}</h3>

                    <p>
                        ${book.rating == null
                            ? "Not rated"
                            : `Rating: ${escapeHTML(book.rating)}/5`
                        }
                    </p>

                    <p>${formatReview(book.review || "No review added yet.")}</p>
                </div>
            </div>
        </dialog>
    `;
}

function openDialogWithAnimation(dialog, originCard) {
    dialog.showModal();
    requestAnimationFrame(() => {
        const cardBox = originCard.getBoundingClientRect();
        const dialogBox = dialog.getBoundingClientRect();

        if (!cardBox.width || !cardBox.height || !dialogBox.width || !dialogBox.height) {
            return;
        }

        const dx = cardBox.left + cardBox.width / 2 - (dialogBox.left + dialogBox.width / 2);
        const dy = cardBox.top + cardBox.height / 2 - (dialogBox.top + dialogBox.height / 2);
        const scale = Math.min(
            cardBox.width / dialogBox.width,
            cardBox.height / dialogBox.height,
            1
        );
        dialog.animate(
            [
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})` ,
                opacity: 0 },
                { transform: "none", opacity: 1 }
            ],
            {
                duration: 350,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)"
            }
        )
    })
}

const grid = document.getElementById("view-series-list");
const holder = document.getElementById("dialog-holder");

if (!grid || !holder) {
    console.error(
        "Required HTML elements not found:",
        { grid, holder }
    );

    

} else {
    
    grid.innerHTML = library.map(seriesCard).join("");

   
    holder.innerHTML = library.map(series => `
    ${seriesDialog(series)}
    ${(series.books || []).map(book =>
        bookDialog(series, book)
    ).join("")}
    `).join("");


grid.addEventListener("click", event => {
    const card = event.target.closest("[data-show-series]");
    if (!card) return;

    const dialog = document.getElementById(
        `dialog-${card.dataset.showSeries}`
    );

    if (dialog) {
        openDialogWithAnimation(dialog, card);
    } else {
        console.error(
            "Series dialog not found:",
            card.dataset.showSeries
        );
    }
});

    // Open an individual book dialog.
    // Open an individual book dialog with an expanding animation.
holder.addEventListener("click", event => {
    const card = event.target.closest("[data-show-book]");
    if (!card) return;

    const dialog = document.getElementById(
        `book-${card.dataset.showBook}`
    );

    if (dialog) {
        openDialogWithAnimation(dialog, card);
    } else {
        console.error(
            "Book dialog not found:",
            card.dataset.showBook
        );
    }
});

    // Close a dialog when clicking its backdrop.
    holder.addEventListener("click", event => {
        if (!(event.target instanceof HTMLDialogElement)) return;

        const dialog = event.target;
        const rect = dialog.getBoundingClientRect();

        const insideDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!insideDialog) {
            dialog.close();
        }
    });
}

document.addEventListener("click", event => {
        const spoiler = event.target.closest(".spoiler");
        if (!spoiler) return;

        spoiler.classList.toggle("revealed");

        spoiler.setAttribute(
            "aria-expanded",
            spoiler.classList.contains("revealed")
        );
    });

    document.addEventListener("keydown", event => {
        if (event.target.matches(".spoiler") &&
        (event.key === "Enter" || event.key === " ")
    ) {
        event.preventDefault();
        event.target.click();
    }
});