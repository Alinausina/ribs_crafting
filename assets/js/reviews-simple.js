
document.addEventListener('DOMContentLoaded', function() {

    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.getElementById('ratingText');
    
    let currentRating = 0;
    
    const ratingTexts = {
        0: 'Поставьте оценку',
        1: 'Ужасно',
        2: 'Плохо',
        3: 'Нормально',
        4: 'Хорошо',
        5: 'Отлично'
    };
    
    function setRating(rating) {
        currentRating = rating;
        
        stars.forEach(star => {
            star.classList.remove('active');
        });
        
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('active');
        }
        
        ratingInput.value = rating;
        
        ratingText.textContent = ratingTexts[rating];
    }
    
    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRating(rating);
        });
        
        star.addEventListener('mouseover', function() {
            if (currentRating > 0) return;
            
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, i) => {
                s.classList.remove('hover');
                if (i < hoverRating) {
                    s.classList.add('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    const fileInput = document.getElementById('photo');
    const uploadButton = document.getElementById('uploadButton');
    const fileInfo = document.getElementById('fileInfo');
    
    uploadButton.addEventListener('click', function(e) {
        if (e.target !== fileInput) {
            fileInput.click();
        }
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            const fileSize = this.files[0].size;
            const maxSize = 5 * 1024 * 1024;
            
            if (fileSize > maxSize) {
                fileInfo.textContent = 'Файл слишком большой (макс. 5MB)';
                fileInfo.style.color = '#ff6b00';
                this.value = '';
            } else {
                fileInfo.textContent = 'Выбран файл: ' + fileName;
                fileInfo.style.color = '#4CAF50';
            }
        } else {
            fileInfo.textContent = 'Файл не выбран';
            fileInfo.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    });
    
    const submitButton = document.getElementById('submitButton');
    
    submitButton.addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const rating = parseInt(ratingInput.value);
        const review = document.getElementById('review').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage += 'Пожалуйста, введите ваше имя\n';
        }
        
        if (rating === 0) {
            isValid = false;
            errorMessage += 'Пожалуйста, поставьте оценку\n';
        }
        
        if (!review) {
            isValid = false;
            errorMessage += 'Пожалуйста, напишите отзыв\n';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        const formData = {
            name: name,
            rating: rating,
            review: review,
            photo: fileInput.files[0] ? fileInput.files[0].name : 'Не загружено'
        };
        
        console.log('Отправка отзыва:', formData);
        
        alert('Спасибо за ваш отзыв! Он будет опубликован после проверки.');
        
        document.getElementById('name').value = '';
        setRating(0);
        document.getElementById('review').value = '';
        fileInput.value = '';
        fileInfo.textContent = 'Файл не выбран';
        fileInfo.style.color = 'rgba(255, 255, 255, 0.7)';
    });
    
    setRating(0);
});