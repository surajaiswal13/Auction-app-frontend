async function fetchUsersItems() {
    const token = localStorage.getItem("token");
    const response = await axios.get('http://127.0.0.1:8000/api/items?user=true', { headers: {"Authorization" : `Token ${token}`} });
    const data = await response.data;

    const itemsList = document.getElementById("items");

    // Iterate through each item and create a list item for each
    for (let item of data) {
        const listItem = document.createElement("li");
        const para = document.createElement("p")
        const link = document.createElement("a");
        link.href = "#name";
        const name = "Name: " + item.name;
        link.textContent = name;
        const description = "Description: " + item.description;
        const time = new Date(item.end_time);
        const endTime = "End time: " + time
        para.innerHTML = description + "<br>" + "Starting price: " + item.starting_price 
                            + "<br>" + endTime + "<br>" 
                            + "<img src="+ item.image +" alt='No Image found' width='300' height='300'>";
        link.addEventListener("click", () => getSingleItemAndUpdateForm(item));
        listItem.appendChild(link);
        listItem.appendChild(para);
        itemsList.appendChild(listItem);
    }
}

fetchUsersItems();

// Get a single item and update the form with its details
async function getSingleItemAndUpdateForm(item) {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://127.0.0.1:8000/api/items/${item.id}?user=true`, { headers: {"Authorization" : `Token ${token}`} });
        const data = response.data;
        document.getElementById("name").value = data.name;
        document.getElementById("description").value = data.description;
        document.getElementById("startingPrice").value = data.starting_price;
        const time = new Date(data.end_time);
        const end_time = time.toISOString().slice(0, -8);
        document.getElementById("endTime").value = end_time;
        document.getElementById("update-item").addEventListener("click", () => updateItem(data.id));
        document.getElementById("delete-item").addEventListener("click", () => deleteItem(data.id));
    } catch (error) {
        console.error(error);   
    }
}

async function updateItem(itemId) {
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

// Delete a item
async function deleteItem(itemId) {
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