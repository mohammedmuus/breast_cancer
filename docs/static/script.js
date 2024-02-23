// Function to hide the default image
function hideDefaultImage() {
    $('#output_result_div img').hide();
}

// Function to show loader
async function predictCancer() {
    // Get user inputs
    const clumpThickness = parseFloat(
        document.getElementById("clumpThickness").value
    );
    const cellSize = parseFloat(document.getElementById("cellSize").value);
    const cellShape = parseFloat(document.getElementById("cellShape").value);
    const adhesion = parseFloat(document.getElementById("adhesion").value);
    const epithelialSize = parseFloat(
        document.getElementById("epithelialSize").value
    );
    const bareNuclei = parseFloat(document.getElementById("bareNuclei").value);
    const chromatin = parseFloat(document.getElementById("chromatin").value);
    const nucleoli = parseFloat(document.getElementById("nucleoli").value);
    const mitoses = parseFloat(document.getElementById("mitoses").value);

    // Make a prediction using the Flask server
    const response = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `clumpThickness=${clumpThickness}&cellSize=${cellSize}&cellShape=${cellShape}&adhesion=${adhesion}&epithelialSize=${epithelialSize}&bareNuclei=${bareNuclei}&chromatin=${chromatin}&nucleoli=${nucleoli}&mitoses=${mitoses}`,
    });

    // Parse the response as JSON
    const result = await response.json();

    // Display the loader
    $('.loader-container').fadeIn();

    // Dismiss loader after 4 seconds
    setTimeout(async function () {
        $('.loader-container').fadeOut();

        // Check result and show appropriate image


        const predictionValue = Number(result.prediction);
        hideDefaultImage();
        if (predictionValue === 4) {
            $('#output_result_div img[src="/static/img/high_risk.svg"]').show();
            $('#output_result_div img[src="/static/img/low_risk.svg"]').hide();
        } else {
            $('#output_result_div img[src="/static/img/low_risk.svg"]').show();
            $('#output_result_div img[src="/static/img/high_risk.svg"]').hide();
        }
    }, 4000);
}

// Button click event handler
$('#showLoaderBtn').click(function () {
    hideDefaultImage();
    predictCancer();
});

// Form submit event handler
$('#predictionForm').submit(async function (event) {
    event.preventDefault();
    hideDefaultImage();
    predictCancer();
});
