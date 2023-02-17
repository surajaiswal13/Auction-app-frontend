async function fetchItemDetail() {
    // fetching the id
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = localStorage.getItem("token");
    const response = await axios.get('http://127.0.0.1:8000/api/items/'+id, { headers: {"Authorization" : `Token ${token}`} });
    const data = await response.data;

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

    const para = document.getElementById("itemDetails")

    para.innerHTML = name + "<br>" + description + "<br>" + startingPrice + "<br>" + currentBid + "<br>" 
            + endTime + "<br>" + category + "<br>" + biddingStatus + "<br>" + sellerUserName + "<br>" 
            + sellerEmail + "<br><br>" + image

    const createBidForm = document.getElementById("create-bid");

    createBidForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = {
            amount: document.getElementById("bidAmount").value,
            item: id
            };

        const config = { headers: {"Authorization" : `Token ${token}`,
                                    'Accept': 'application/json'} }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/bids/`, data, config);
        } catch (error) {
            console.log(error);
            alert("Failed ot place a bid")
        }
    }
    )
}

fetchItemDetail();

function createBid(event, itemId){
    event.preventDefault();
}