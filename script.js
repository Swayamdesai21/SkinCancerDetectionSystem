document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('selectedImage').src = event.target.result;
            document.getElementById('selectedImage').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('predictedClass').textContent = data.class;
        document.getElementById('confidenceScore').textContent = data.confidence;
        document.getElementById('progressConfidence').style.width = data.confidence + '%';
    })
    .catch(error => console.error('Error:', error));
});