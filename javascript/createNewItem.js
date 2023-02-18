function createNewItem() {
    /**
     * Attaches an event listener to the form submit button, and sends a POST request to create a new item
     * with the form data. Uses the token from local storage for authentication.
    */

    // Get the form element and attach the event listener
    const createItemForm = document.getElementById("create-item-form");

    createItemForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get the form data
        const token = localStorage.getItem("token");
        const data = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            starting_price: document.getElementById("startingPrice").value,
            end_time: document.getElementById("endTime").value,
            bidding_status: document.getElementById("biddingStatus").value,
            category: document.getElementById("category").value,
            image: document.getElementById("image").files[0]
            };

        // Set the request headers
        const config = { headers: {"Authorization" : `Token ${token}`,
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data',} }

        // Send the POST request to create the new item
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/items/?user=true`, data, config);
            alert("Item created")
        } catch (error) {
            console.log(error);
        }
    }
    )
}

// Call the function to attach the event listener
createNewItem();