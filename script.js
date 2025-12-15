// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // 1. Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Анимация иконки меню
            const icons = this.querySelectorAll('.menu-icon');
            if (navLinks.classList.contains('active')) {
                // Превращаем в крестик
                icons[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                icons[1].style.opacity = '0';
                icons[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                // Возвращаем в гамбургер
                icons[0].style.transform = '';
                icons[1].style.opacity = '';
                icons[2].style.transform = '';
            }
        });
        
        // Закрываем меню при клике на ссылку
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icons = menuToggle.querySelectorAll('.menu-icon');
                icons[0].style.transform = '';
                icons[1].style.opacity = '';
                icons[2].style.transform = '';
            });
        });
    }
    
    // 2. Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3. Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }
            
            // Имитация отправки
            alert(`Спасибо, ${name}! Ваше сообщение отправлено. Мы ответим на ${email} в ближайшее время.`);
            
            // Очищаем форму
            this.reset();
        });
    }
    
    // 4. Обновляем год в футере
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 5. Добавляем активный класс к текущему разделу при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

});
