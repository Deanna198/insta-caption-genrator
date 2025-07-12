const uploadSection = document.getElementById('uploadSection');
const fileInput = document.getElementById('fileInput');
const captionText = document.getElementById('captionText');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const newCaptionBtn = document.getElementById('newCaptionBtn');
const removeImage = document.getElementById('removeImage');
const toast = document.getElementById('toast');

let uploadedImage = null;

// Sample captions for different types of photos
const sampleCaptions = [
    "Living my best life ✨ #blessed #goodvibes #lifestyle",
    "Chasing sunsets and dreams 🌅 #sunset #wanderlust #adventure",
    "Simple moments, endless memories 💫 #memories #grateful #life",
    "Finding beauty in everyday moments 🌸 #beauty #mindfulness #present",
    "Adventure awaits around every corner 🗺️ #adventure #explore #journey",
    "Grateful for this beautiful day 🙏 #gratitude #blessed #thankful",
    "Making memories that will last forever 📸 #memories #friends #goodtimes",
    "Life is better with good friends and great food 🍽️ #friendship #foodie #happiness",
    "Every day is a new opportunity to shine ⭐ #motivation #positivity #shine",
    "Collecting moments, not things 💎 #minimalism #experiences #life"
];

// File upload handlers
uploadSection.addEventListener('click', () => {
    if (!uploadedImage) {
        fileInput.click();
    }
});

uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.classList.add('dragover');
});

uploadSection.addEventListener('dragleave', () => {
    uploadSection.classList.remove('dragover');
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

function handleFileUpload(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage = e.target.result;
            displayUploadedImage(uploadedImage);
        };
        reader.readAsDataURL(file);
    } else {
        showToast('Please upload an image file');
    }
}

function displayUploadedImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'uploaded-image';
    img.alt = 'Uploaded image';

    uploadSection.innerHTML = '';
    uploadSection.appendChild(img);
    uploadSection.appendChild(removeImage);
    removeImage.style.display = 'block';
}

removeImage.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadedImage = null;
    removeImage.style.display = 'none';
    uploadSection.innerHTML = `
        <div class="upload-content">
            <div class="upload-icon">📸</div>
            <div class="upload-text">Drop your photo here</div>
            <div class="upload-subtext">or</div>
            <button class="upload-btn" onclick="document.getElementById('fileInput').click()">
                upload photo
            </button>
        </div>
        <button class="image-overlay" id="removeImage">×</button>
    `;
    captionText.value = '';
    fileInput.value = '';
});

generateBtn.addEventListener('click', () => {
    if (!uploadedImage) {
        showToast('Please upload an image first');
        return;
    }

    const btnText = generateBtn.querySelector('.btn-text');
    const loading = generateBtn.querySelector('.loading');

    btnText.classList.add('hidden');
    loading.classList.remove('hidden');
    generateBtn.disabled = true;

    // Simulate AI processing
    setTimeout(() => {
        const randomCaption = sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)];
        captionText.value = randomCaption;
        captionText.readOnly = false;

        btnText.classList.remove('hidden');
        loading.classList.add('hidden');
        generateBtn.disabled = false;

        showToast('Caption generated successfully!');
    }, 2000);
});

copyBtn.addEventListener('click', () => {
    if (!captionText.value) {
        showToast('No caption to copy');
        return;
    }

    navigator.clipboard.writeText(captionText.value).then(() => {
        showToast('Caption copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy caption');
    });
});

newCaptionBtn.addEventListener('click', () => {
    if (!uploadedImage) {
        showToast('Please upload an image first');
        return;
    }

    const randomCaption = sampleCaptions[Math.floor(Math.random() * sampleCaptions.length)];
    captionText.value = randomCaption;
    showToast('New caption generated!');
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}