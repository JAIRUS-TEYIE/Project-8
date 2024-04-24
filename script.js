
let varheader = document.getElementsByTagName("header");
varheader[0].style.color = "blue";
varheader[0].style.fontWeight = "bolder"
varheader[0].style.fontSize = "30px";
varheader[0].style.width = "100%";
varheader[0].style.height = "50px";
varheader[0].style.background = "orange";
varheader[0].style.display = "flex";
varheader[0].style.position = "fixed";
varheader[0].style.justifyContent = "center";
varheader[0].style.alignItems = "center";

$(document).ready(function() {
    $('#Carmodel').submit(function(event) {
        event.preventDefault();

        const modelName = $('#modelName').val().trim();

        if (modelName === '') {
            alert('Enter a car model.');
            return;
        }

        fetchCarModel(modelName);
    });

    function fetchCarModel(model) {
        const apiUrl = `https://api.api-ninjas.com/v1/cars?model=${model}`;

        $.ajax({
            method: 'GET',
            url: apiUrl,
            headers: {
                'X-Api-Key': 'bM+rZSJYn3vmYYfCobn8CA==ur2To8UXLaP2ARuJ'
            },
            contentType: 'application/json',
            success: function(result) {
                if (result && result.length > 0) {
                    fetchCarImages(result);
                } else {
                    displayError('Sorry! Model not found. Try again later.');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                displayError('Error fetching car models. Please try again later.');
            }
        });
    }

    function fetchCarImages(cars) {
        const defaultImageUrl = 'https://via.placeholder.com/100'; // Placeholder image URL (100x100)

        const promises = cars.map(car => {
            return new Promise((resolve, reject) => {
                const imageApiUrl = `https://api.api-ninjas.com/v1/car-image?make=${car.make}&model=${car.model}&year=${car.year}`;

                $.ajax({
                    method: 'GET',
                    url: imageApiUrl,
                    headers: {
                        'X-Api-Key': 'bM+rZSJYn3vmYYfCobn8CA==ur2To8UXLaP2ARuJ'
                    },
                    contentType: 'application/json',
                    success: function(response) {
                        const imageUrl = response.url || defaultImageUrl; // Use default image URL if no specific image found
                        resolve({ ...car, image: imageUrl });
                    },
                    error: function(error) {
                        console.error('Error fetching car image:', error);
                        const imageUrl = defaultImageUrl; // Use default image URL on error
                        resolve({ ...car, image: imageUrl });
                    }
                });
            });
        });

        Promise.all(promises)
            .then(carsWithImages => {
                displayResult(carsWithImages);
            })
            .catch(error => {
                console.error('Error fetching car images:', error);
                displayResult(cars); // Display results even if images fail to load
            });
    }

    function displayResult(cars) {
        const resultDiv = $('#result');
        resultDiv.empty();

        if (cars && cars.length > 0) {
            const resultList = $('<ul></ul>');

            cars.forEach(car => {
                const listItem = `<li>${car.make} ${car.model} (${car.year}) <img src="${car.image}" width="100" height="100"></li>`;
                resultList.append(listItem);
            });

            resultDiv.append(resultList);
        } else {
            displayError('No matching models found. Try again later.');
        }
    }

    function displayError(message) {
        const resultDiv = $('#result');
        resultDiv.empty();
        resultDiv.text(message);
    }
});