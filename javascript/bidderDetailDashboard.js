async function fetchItemDetail() {
    /*
    Fetches the details of the item with the ID specified in the URL parameter. 
    Uses the token stored in local storage for authentication.
    Populates the item details on the page along with the item image.
    Enables the user to place a bid on the item.
    */
   
    // Extract the item ID from the URL parameter.
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Get the authentication token from local storage.
    const token = localStorage.getItem("token");

    // Fetch the item details using the API.
    const response = await axios.get('http://127.0.0.1:8000/api/items/'+id, { headers: {"Authorization" : `Token ${token}`} });
    const data = await response.data;

    // Format the item details.
    const name = "Name: " + data.name;
    const description ="Description: " + data.description;
    const startingPrice = "Starting Price: " + data.starting_price;
    const currentBid ="Current Winning Bid: " + (data.highest_bid == null ? "NA" : data.highest_bid);
    const category = "Category: " + data.category;
    const biddingStatus = "Bidding Status: " + data.bidding_status;
    const endTime ="End Time: " + data.end_time;
    const sellerUserName ="Seller UserName: " + data.seller.username;
    const sellerEmail ="Seller Email: " + data.seller.email;
    const image = "<img src="+ data.image +" alt='No Image found' width='300' height='300'>" ;

    // Populate the item details on the page.
    const para = document.getElementById("itemDetails")
    para.innerHTML = name + "<br>" + description + "<br>" + startingPrice + "<br>" + currentBid + "<br>" 
            + endTime + "<br>" + category + "<br>" + biddingStatus + "<br>" + sellerUserName + "<br>" 
            + sellerEmail + "<br><br>" + image

    // Enable the user to place a bid on the item.
    const createBidForm = document.getElementById("create-bid");

    createBidForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Create an object with the bid data and the item ID.
        const data = {
            amount: document.getElementById("bidAmount").value,
            item: id
            };
        // Configure the headers for the API request, including the authentication token.
        const config = { headers: {"Authorization" : `Token ${token}`,
                                    'Accept': 'application/json'} }

        try {
            // Send a POST request to the API to place the bid.
            const response = await axios.post(`http://127.0.0.1:8000/api/bids/`, data, config);
            alert("Hurray!, bid placed")
        } catch (error) {
            console.log(error);
            alert("Failed ot place a bid")
        }
    }
    )
}


// Call the fetchItemDetail function to populate the page with the item details.
fetchItemDetail();
