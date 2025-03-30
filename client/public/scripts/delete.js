document.addEventListener("click", function (event) {
    if (event.target.closest("#delete_btn")) {
        const button = event.target.closest("#delete_btn");

        document.body.style.pointerEvents = "none";
        alertContainer.style.display = "flex";
        alertContainer.style.pointerEvents = "auto";

        // Get the associated form
        const deleteForm = button.closest("form");
        confirmBtnYes.onclick = function () {
            deleteForm.submit();
        };
        confirmBtnNo.onclick = function () {
            alertContainer.style.display = "none";
            document.body.style.pointerEvents = "auto";
        };
    }
});
