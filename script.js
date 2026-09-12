function toggleMenu() {
  const nav = document.getElementById("mainNav");

  nav.classList.toggle("active");
}


function searchNews() {

  const input =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

  const news =
    document.querySelectorAll(".news-card");

  news.forEach(function(card) {

    const text =
      card.innerText.toLowerCase();

    if (text.includes(input)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }

  });

}
