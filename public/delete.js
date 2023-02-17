const deleteLink = document.querySelector(".trash");
deleteLink.addEventListener("click", () => {
  const endpoint = deleteLink.dataset.req;

  fetch(endpoint, { method: "DELETE" })
    .then((data) => {
      data.json().then((result) => {
        window.location.href = result.redirect;

        return result.redirect;
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
