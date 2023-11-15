window.onload = function () {
    const Image = document.querySelector('.Image-image');
  
    if (Image) {
      const Images = document.querySelectorAll('.detail-shoes-image');
  
      Images.forEach(image => {
        image.addEventListener('click', () => {
          const src = image.getAttribute('src');
          Image.src = src;
        });
      });
    }
  };
  