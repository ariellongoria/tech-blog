async function newPost(e) {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    const user_id = req.sessions.user_id;

    console.log(req.session);

    if (title && content) {
        const response = await fetch("/api/posts/", {
            method: "POST",
            body: JSON.stringify({
                title,
                content,
                user: { username },
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("form").addEventListener("submit", newPost);
