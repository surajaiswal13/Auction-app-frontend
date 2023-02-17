const createItemForm = document.getElementById("create-item-form");

createItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
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

    const config = { headers: {"Authorization" : `Token ${token}`,
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data',} }

    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/items/?user=true`, data, config);
    } catch (error) {
        console.log(error);
    }
}
)