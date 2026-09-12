function toggleMenu() {
    const nav = document.getElementById("mainNav");
    nav.classList.toggle("active");
}


// ===============================
// PENCARIAN BERITA
// ===============================
function searchNews() {
    const input = document.getElementById("searchInput")
        .value
        .toLowerCase();

    const news = document.querySelectorAll(".news-card");

    news.forEach(function(card) {
        const text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


// ===============================
// BERITA OTOMATIS
// ===============================
async function loadNews() {

    const newsList = document.getElementById("newsList");

    if (!newsList) return;

    newsList.innerHTML = `
        <div class="news-card">
            <div class="news-content">
                <span>LOADING</span>
                <h3>Mengambil berita game terbaru...</h3>
                <p>Mohon tunggu sebentar.</p>
            </div>
        </div>
    `;

    const rssUrl =
    "https://news.google.com/rss/search?q=Mobile%20Legends%20Indonesia&hl=id&gl=ID&ceid=ID:id";

    const apiUrl =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rssUrl);

    try {

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== "ok") {
            throw new Error("Gagal mengambil berita");
        }

        newsList.innerHTML = "";

        const articles = data.items.slice(0, 10);

        articles.forEach(function(item) {

            const article = document.createElement("article");
            article.className = "news-card";

            const image = document.createElement("div");
            image.className = "news-image image-one";

            if (item.thumbnail) {
                image.style.backgroundImage =
                    `url("${item.thumbnail}")`;
                image.style.backgroundSize = "cover";
                image.style.backgroundPosition = "center";
            }

            const content = document.createElement("div");
            content.className = "news-content";

            const category = document.createElement("span");
            category.textContent = "GAME & ESPORTS";

            const title = document.createElement("h3");

            const link = document.createElement("a");
            link.href = item.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = item.title;

            title.appendChild(link);

            const description = document.createElement("p");

            const temp = document.createElement("div");
            temp.innerHTML = item.description || "";

            description.textContent =
                temp.textContent
                    .replace(/\s+/g, " ")
                    .trim()
                    .substring(0, 160) + "...";

            const date = document.createElement("small");

            const published =
                new Date(item.pubDate);

            date.textContent =
                published.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

            content.appendChild(category);
            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(date);

            article.appendChild(image);
            article.appendChild(content);

            newsList.appendChild(article);
        });

    } catch (error) {

        console.error(error);

        newsList.innerHTML = `
            <div class="news-card">
                <div class="news-content">
                    <span>ERROR</span>
                    <h3>Berita belum dapat dimuat</h3>
                    <p>
                        Silakan coba lagi beberapa saat.
                    </p>
                </div>
            </div>
        `;
    }
}


// Jalankan saat halaman dibuka
document.addEventListener("DOMContentLoaded", function() {
    loadNews();
});
