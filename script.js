
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
                displayResult(result);
            },
            error: function(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
                displayError('Sorry! model not found in our store. Try again later.');
            }
        });
    }

    function displayResult(result) {
        const resultDiv = $('#result');
        resultDiv.empty();

        if (result && result.length > 0) {
            const resultList = $('<ul></ul>');

            result.forEach(car => {
                const listItem = `<li>${car.make} ${car.model} (${car.year})</li>`;
                resultList.append(listItem);
            });

            resultDiv.append(resultList);
        } else {
            displayError('Sorry! model not found. Try again later.');
        }
    }

    function displayError(message) {
        const resultDiv = $('#result');
        resultDiv.empty();
        resultDiv.text(message);
    }
});
