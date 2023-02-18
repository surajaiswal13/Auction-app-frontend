function dashboard(){
    /*
    This function is used to redirect the user to either seller or bidder dashboard based on the button clicked by the user
    */

    // Getting the seller button from the DOM
    const seller = document.getElementById('seller');

    // Adding event listener to the seller button to redirect to the seller dashboard
    seller.addEventListener('click', (event) => {
        window.location.href = 'sellerDashboard.html'
    });

    // Getting the bidder button from the DOM
    const bidder = document.getElementById('bidder');

    // Adding event listener to the bidder button to redirect to the bidder dashboard
    bidder.addEventListener('click', (event) => {
        window.location.href = 'bidderDashboard.html'
    });

}

dashboard();