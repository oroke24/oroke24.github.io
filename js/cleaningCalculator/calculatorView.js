// js/script.js

document.addEventListener('DOMContentLoaded', function () {
    let currentTotal = 0; // Initialize a variable to hold the total price
    let selectedServices = [];

    const servicesList = document.getElementById('servicesList');
    const subTotal = document.getElementById('subTotal');
    const promoCode = document.getElementById('promoCode');
    const discounts = document.getElementById('discounts');
    const totalPriceSpan = document.getElementById('totalPrice');
    const subTotalHidden = document.getElementById('subTotalHidden');
    const discountsHidden = document.getElementById('discountsHidden');
    const totalFinal = document.getElementById('finalBookingTotal');

    const bookingForm = document.getElementById('booking-form');
    const selectedServicesListInput = document.getElementById('selectedServicesInput');
    const calculatedTotalInput = document.getElementById('totalPriceInput');
    const displayedServicesList = document.getElementById('displayedServicesList');


    promoCode.addEventListener('input', updateTotalPrice)
    const services = [
        { id: 'exteriorWash', name: 'Exterior Wash & Dry', price: 50.00 },
        { id: 'interiorCleanAndProtect', name: 'Interior Clean and Protect', price: 50.00 },
        { id: 'windowCleaning', name: 'Window Cleaning (Interior & Exterior)', price: 20.00 },
        { id: 'petHairRemoval', name: 'Pet Hair Removal', price: 60.00 },
        { id: 'leatherFabricConditioning', name: 'Leather or Fabric Conditioning', price: 60.00 },
        { id: 'odorElimination', name: 'Odor Elimination & Deodorizer', price: 15.00 },
        { id: 'tireDressing', name: 'Tire & Wheel Dressing', price: 20.00 },
        { id: 'headlightRestoration', name: 'Headlight Restoration', price: 60.00 },
        { id: 'engineBayDetail', name: 'Engine Bay Detail', price: 50.00 },
        { id: 'seatRemoval', name: 'Seat Removal', price: 75.00 },
        { id: 'sprayWaxApplication', name: 'Spray Wax Application (adds thin layer)', price: 25.00 },
        { id: 'ceramicCoating', name: 'Ceramic Coating Application (seals)', price: 30.00 },
        { id: 'polishApplication', name: 'Compound Polish Application (removes layer)', price: 100.00 },
        { id: 'waxApplication', name: 'Carnauba Wax Application (adds layer)', price: 100.00 },
    ];

    // Function to render the services into the HTML
    function renderServices() {
        servicesList.innerHTML = ''; // Clear existing content
        let title = document.createElement('div');
        title.classList="text-center"
        services.forEach((service, i) => {
            
            /*
            if(i === 0) {
                title.innerText = "Common choices";
                servicesList.appendChild(title);
            }
                */
            const serviceItem = document.createElement('div');
            serviceItem.classList.add('service-item'); // Add custom styling class

            serviceItem.innerHTML += `
    <div class="form-check form-switch d-flex justify-content-between align-items-center w-100">
        <div style="margin: 12px; padding: 4px; font-size:1.3em">
            <input class="form-check-input" type="checkbox" role="switch"
                id="switch${service.id}" data-price="${service.price}" data-name="${service.name}">
            <label class="form-check-label ms-2" for="switch${service.id}">
                ${service.name}
            </label>
        </div>
        <span class="service-price">$${service.price.toFixed(2)}</span>
    </div>
`;
            servicesList.appendChild(serviceItem);

            // Add event listener to the switch
            const switchInput = serviceItem.querySelector(`#switch${service.id}`);
            switchInput.addEventListener('change', updateTotalPrice);
        });
    }

    // Function to update the total price
    function updateTotalPrice() {
        currentTotal = 0; // Reset total
        selectedServices = [];
        const switches = servicesList.querySelectorAll('input[type="checkbox"]');

        switches.forEach(sw => {
            if (sw.checked) {
                const price = parseFloat(sw.dataset.price);
                const name = sw.dataset.name;
                currentTotal += price;
                selectedServices.push({ name: name, price: price })
            }
        });

        let promo = 0;
        let percentage = 6;
        let expensiveDiscount = (Math.floor(currentTotal / 100).toFixed(0) * percentage);
        if (promoCode.value === "clean15" || promoCode.value === "Clean15") promo = 15; // 15%
        if (promoCode.value === "holiday30" || promoCode.value === "Holiday30") promo = 30; // 30%
        //if(promoCode.value === "clean25") promo = 25; // 15%
        console.log('promo discount: ', promo);
        console.log('expensiveDiscount: ', expensiveDiscount);

        // Update the displayed totals
        subTotalHidden.value = `$${currentTotal.toFixed(2)}`;
        subTotal.textContent = `$${currentTotal.toFixed(2)}`;

        let discountLines = [];
        if (expensiveDiscount > 0) {
            discountLines.push(`- ${expensiveDiscount}% OFF! (at or over $${(expensiveDiscount / percentage) * 100})`);
        }
        if (promo > 0) {
            discountLines.push(`- ${promo}% OFF! (promo code applied)`);
        }

        discounts.innerText = discountLines.join('\n');
        discountsHidden.value = discounts.innerText;
        let amountOff = (expensiveDiscount + promo) / 100 * currentTotal;
        let newTotal = currentTotal - amountOff;


        totalPriceSpan.textContent = `$${newTotal.toFixed(2)}`;
        totalFinal.textContent = `$${currentTotal}-$${amountOff.toFixed(2)}(${expensiveDiscount + promo}%) = $${newTotal.toFixed(2)}`;

        if (selectedServicesListInput) {
            selectedServicesListInput.value = selectedServices
            .map(service => `${service.name} ${service.price.toFixed(2)}`)
            .join('\n\n\n');
        }
        if (calculatedTotalInput) {
            calculatedTotalInput.value = `$${currentTotal}-$${amountOff.toFixed(2)}(${expensiveDiscount + promo}%) = $${newTotal.toFixed(2)}`;
        }

        displayedServicesList.innerHTML = '';
        if (selectedServices.length === 0) {
            displayedServicesList.innerHTML = '<li>No Services selected yet.</li>'
        } else {
            selectedServices.forEach(s => {
                const li = document.createElement('li');
                li.textContent = `${s.name}`;
                displayedServicesList.appendChild(li);
            });
        }
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            console.log('Form submitting with total: ', calculatedTotalInput.value);
            console.log('Form submitting with services: ', selectedServicesListInput.value);
        });
    }
    // Initial render of services when the page loads
    renderServices();
    updateTotalPrice(); // Calculate initial total (should be 0)
});