
document.addEventListener("DOMContentLoaded", (event) => {
    // Add an event listener for when the user clicks the submit button to pay
    document.getElementById("donate").addEventListener("click", (e) => {
        e.preventDefault();
        const PBFKey = "FLWPUBK_TEST-3bb6cd9b2f4c842811e1a052c84fb9dc-X"; // paste in the public key from your dashboard here
        const txRef = ''+Math.floor((Math.random() * 1000000000) + 1); //Generate a random id for the transaction reference
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;


        // getpaidSetup is Rave's inline script function. it holds the payment data to pass to Rave.
        getpaidSetup({
            PBFPubKey: PBFKey,
            amount: amount,
            currency: "USD",  // Select the currency. leaving it empty defaults to NGN
            txref: txRef, // Pass your UNIQUE TRANSACTION REFERENCE HERE.
            onclose: function() {
                console.log('Closed payment')
            },
            customer: {
                email: email,
                phone_number: phone,
                name: name,
            },
            callback: function(response) {
                flw_ref = response.tx.flwRef;// collect flwRef returned and pass to a server page to complete status check.
                console.log("This is the response returned after a charge", response);
                if(response.tx.chargeResponse ==='00' || response.tx.chargeResponse === '0') {
                    // redirect to a success page
                    alert('success')
                } else {
                    // redirect to a failure page.
                    alert('Failed')
                }
            }
        });
    });
});