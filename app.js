document.getElementById("searchButton").addEventListener("click", searchWikipedia);

async function searchWikipedia() {
    const query = document.getElementById("searchQuery").value.trim();
    
    if (query === "") {
        alert("Please enter a search query!");
        return;
    }

    // Clear previous results
    document.getElementById("results").innerHTML = "";

    // Construct the Wikipedia API URL
    const apiUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=${query}&utf8=1`;

    try {
        // Fetch the data from Wikipedia API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if there are any search results
        if (data.query.search.length === 0) {
            document.getElementById("results").innerHTML = "<p>No results found. Please try again.</p>";
        } else {
            // Display the results
            data.query.search.forEach(result => {
                const resultItem = document.createElement("div");
                resultItem.classList.add("result-item");

                // Create the title and snippet
                const title = document.createElement("a");
                title.href = `https://en.wikipedia.org/?curid=${result.pageid}`;
                title.target = "_blank";
                title.textContent = result.title;

                const snippet = document.createElement("p");
                snippet.innerHTML = result.snippet + " ...";

                // Append title and snippet to the result item
                resultItem.appendChild(title);
                resultItem.appendChild(snippet);

                // Append the result item to the results container
                document.getElementById("results").appendChild(resultItem);
            });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("results").innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}
