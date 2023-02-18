async function fetchUsersItems() {
    /* 
    Fetches a list of items created by the user from the backend API, 
    iterates through the data to create a list item for each item, 
    adds event listeners to links to update and delete individual items.
    */

    // Get user's authentication token from local storage
    const token = localStorage.getItem("token");

    // Send a GET request to the API to get the user's items
    const response = await axios.get('http://127.0.0.1:8000/api/items?user=true', { headers: {"Authorization" : `Token ${token}`} });
    
    // Get the data from the response
    const data = await response.data;

    // Get the list element where the items will be displayed
    const itemsList = document.getElementById("items");

    // Iterate through each item and create a list item for each
    for (let item of data) {
        // Create a list item element
        const listItem = document.createElement("li");
        // Create a paragraph element
        const para = document.createElement("p")
        // Create an anchor element
        const link = document.createElement("a");
        // Set the anchor element's href attribute
        link.href = "#name";
        // Set the anchor element's text content to the item's name
        const name = "Name: " + item.name;
        link.textContent = name;
        // Set the description of the item
        const description = "Description: " + item.description;
        // Set the end time of the item
        const time = new Date(item.end_time);
        const endTime = "End time: " + time
        // Set the inner HTML of the paragraph element to include the description, 
        // starting price, end time, and image of the item
        para.innerHTML = description + "<br>" + "Starting price: " + item.starting_price 
                            + "<br>" + endTime + "<br>" 
                            + "<img src="+ item.image +" alt='No Image found' width='300' height='300'>";
        // Add an event listener to the link to update the item form with the item's details
        link.addEventListener("click", () => getSingleItemAndUpdateForm(item));
        // Add the link and the paragraph element to the list item element
        listItem.appendChild(link);
        listItem.appendChild(para);
        // Add the list item element to the items list
        itemsList.appendChild(listItem);
    }
}

// Call the fetchUsersItems function to display the user's items
fetchUsersItems();

// Get a single item and update the form with its details
async function getSingleItemAndUpdateForm(item) {
    /*
    Sends a GET request to the backend API to get a single item, 
    then updates the form on the page with the item's details.
    */

    try {
        // Get user's authentication token from local storage
        const token = localStorage.getItem("token");

        // Send a GET request to the API to get the item
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${item.id}?user=true`, { headers: {"Authorization" : `Token ${token}`} });
        
        // Get the data from the response
        const data = response.data;

        // Update the form with the item's details
        document.getElementById("name").value = data.name;
        document.getElementById("description").value = data.description;
        document.getElementById("startingPrice").value = data.starting_price;
        const time = new Date(data.end_time);
        const end_time = time.toISOString().slice(0, -8);
        document.getElementById("endTime").value = end_time;

        // Add event listeners to the update button
        document.getElementById("update-item").addEventListener("click", () => updateItem(data.id));
        // Add event listeners to the delete button
        document.getElementById("delete-item").addEventListener("click", () => deleteItem(data.id));
    } catch (error) {
        console.error(error);   
    }
}

async function updateItem(itemId) {
    /*
    Make an update request to update an Item
    */

    const token = localStorage.getItem("token");
    const data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        starting_price: document.getElementById("startingPrice").value,
        end_time: document.getElementById("endTime").value,
        image: document.getElementById("image").files[0]
        };

    const config = { headers: {"Authorization" : `Token ${token}`,
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data',} }

    try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/items/${itemId}/?user=true`, data, config);
    } catch (error) {
        console.log(error);
    }
}

async function deleteItem(itemId) {
    /*
    Make a http request to delete an item
    */
   
    const token = localStorage.getItem("token");
    const config = { headers: {"Authorization" : `Token ${token}`} }
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/items/${itemId}/?user=true`, config);
    } catch (error) {
        console.log(error);
    }
}

const registerBtn = document.getElementById("createItem");
registerBtn.addEventListener("click", (e) => {
    try {
        window.location.href = "createNewItem.html";
    } catch (error) {
        alert("Cannot go to login page")
    }
})