// JavaScript для главной страницы index.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('Главная страница загружена!');
    
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage.endsWith(linkHref) || 
            (currentPage.endsWith('/') && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Анимация прогресс-баров навыков
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        // Запускаем анимацию с задержкой
        setTimeout(() => {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-in-out';
                }, 200);
            });
        }, 500);
    }
    
    // Обработчик кнопки скачивания резюме
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Создаем эффект нажатия
            this.style.transform = 'translateY(0)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
            
            // Имитация скачивания
            alert('Резюме Ким Олег Николаевич.pdf начинает скачиваться...');
            
            // Здесь можно добавить реальную логику скачивания
            // window.open('resume.pdf', '_blank');
        });
    }
    
    // Анимация карточек проектов при наведении
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Добавляем задержку для появления
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
        
        // Обработчик клика по карточке проекта
        card.addEventListener('click', function() {
            const projectNumber = this.textContent;
            alert(`Переход к проекту: ${projectNumber}\nПодробная информация на странице "Проекты"`);
            
            // Добавляем эффект пульсации
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-item, .project-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Запускаем анимацию при загрузке и скролле
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаем сразу на случай если элементы уже в зоне видимости
    
    // Плавная прокрутка для якорей (если будут добавлены)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.textContent = `© ${currentYear} Ким Олег Николаевич. Все права защищены.`;
    }
    
    // Эффект параллакс для герой секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Интерактивность для навыков
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Анимация фото при загрузке
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            profilePhoto.style.transition = 'all 0.8s ease';
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Консоль приветствие
    console.log('%cДобро пожаловать на сайт Ким Олег Николаевич!', 
        'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cГруппа: ЭФБО-18-24', 
        'color: #764ba2; font-size: 14px;');
});

// Дополнительные функции для главной страницы
function simulateTypingEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Функция для изменения темы (можно добавить переключатель)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Экспорт функций для глобального использования
window.mainPageFunctions = {
    simulateTypingEffect,
    toggleTheme
};