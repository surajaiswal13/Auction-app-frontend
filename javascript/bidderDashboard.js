async function fetchItems(filter=false, search=false) {
    const token = localStorage.getItem("token");
    let response;
    let data;

    if (filter == true){
      const category = document.getElementById("category").value;
      const biddingStatus = document.getElementById("biddingStatus").value;
      const endTime = document.getElementById("endTime").value;
      const url = 'http://127.0.0.1:8000/api/items?category='+category+'&bidding_status='+biddingStatus+'&end_time='+endTime
      response = await axios.get(url, { headers: {"Authorization" : `Token ${token}`} });
      data = await response.data;
    }
    else if(search == true){
      const search = document.getElementById("search").value;
      console.log(search);
      const url = 'http://127.0.0.1:8000/api/items?search='+search
      response = await axios.get(url, { headers: {"Authorization" : `Token ${token}`} });
      data = await response.data;
    }
    else {
      response = await axios.get('http://127.0.0.1:8000/api/items', { headers: {"Authorization" : `Token ${token}`} });
      data = await response.data;
    }

    const itemsList = document.getElementById("items");
    itemsList.innerHTML = ""

    // Iterate through each item and create a list item for each
    for (let item of data) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        const para = document.createElement("p")
        link.classList.add('btn', 'btn-success');
        const div = document.createElement("div")
        div.classList.add('text-center');
        link.textContent = "Place a bid";
        const name = "Name: " + item.name
        const description = "Description: " + item.description;
        const startingPrice = "Starting Price: " + item.starting_price;
        const highestBid = "Highest Bid: " + (item.highest_bid == null ? "NA" : item.highest_bid);
        const time = new Date(item.end_time);
        const endTime = "End time: " + time;
        const image = item.image;
        para.innerHTML = name + "<br>" + description + "<br>" + startingPrice 
                            + "<br>" + highestBid + "<br>" + endTime + "<br>" 
                            + "<img src="+ image +" alt='No Image found' width='200' height='200'>";
        // # get a button add eventlistner on that
        link.addEventListener("click", () => goToSingleItem(item));
        div.appendChild(link)
        listItem.appendChild(para);
        listItem.appendChild(div);
        itemsList.appendChild(listItem);

    }
}

fetchItems()

const filterBtn = document.getElementById("filterForm");
filterBtn.addEventListener("click",function(event) {
event.preventDefault();
fetchItems(filter=true);
});

const searchBtn = document.getElementById("searchForm");
searchBtn.addEventListener("click",function(event) {
event.preventDefault();
fetchItems(filter=false, search=true);
});

async function goToSingleItem(item) {
try {
    const url = `http://127.0.0.1:5501/bidderDetailDashboard.html?id=${item.id}`;
    window.location.href = url;
} catch (error) {
    console.error(error);   
}
}