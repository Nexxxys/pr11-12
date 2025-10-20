// Общий JavaScript для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage.endsWith(linkHref) || 
            (currentPage.endsWith('/') && linkHref === 'index.html') ||
            (currentPage.endsWith('pages/') && linkHref === '../index.html')) {
            link.classList.add('active');
        }
    });
    
    // Анимация прогресс-баров на главной
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length > 0) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Обработчик кнопки скачивания резюме
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Резюме будет скачано!');
            // Здесь можно добавить реальную логику скачивания
        });
    }
    
    // Инициализация страницы проектов
    initProjectsPage();
    
    // Инициализация страницы дневника
    initDiaryPage();
    
    // Инициализация страницы контактов
    initContactsPage();
});

// Функциональность для страницы проектов
function initProjectsPage() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-large');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Убираем активный класс у всех кнопок
                filterBtns.forEach(b => b.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                const filter = this.textContent.toLowerCase();
                
                // Фильтрация проектов
                projectCards.forEach(card => {
                    if (filter === 'все') {
                        card.style.display = 'grid';
                    } else {
                        const tech = card.querySelector('.project-tech').textContent.toLowerCase();
                        if (tech.includes(filter)) {
                            card.style.display = 'grid';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Обработчики для кнопок "Подробнее"
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectTitle = this.closest('.project-info').querySelector('h3').textContent;
            alert(`Подробнее о проекте: ${projectTitle}`);
            // Здесь можно добавить переход на страницу проекта
        });
    });
}

// Функциональность для страницы дневника
function initDiaryPage() {
    const addEntryBtn = document.querySelector('.add-entry-btn');
    
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', function() {
            const newEntry = {
                date: prompt('Введите дату (например: 20 дек):'),
                title: prompt('Введите название задания:'),
                completed: confirm('Задание выполнено?')
            };
            
            if (newEntry.date && newEntry.title) {
                addNewTimelineItem(newEntry);
            }
        });
    }
    
    // Анимация прогресс-баров курсов
    const courseBars = document.querySelectorAll('.course-progress-fill');
    courseBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

function addNewTimelineItem(entry) {
    const timeline = document.querySelector('.progress-timeline');
    const newItem = document.createElement('div');
    newItem.className = `timeline-item ${entry.completed ? 'completed' : 'not-completed'}`;
    newItem.innerHTML = `
        <div class="timeline-date">${entry.date}</div>
        <div class="timeline-content">
            <span class="timeline-title">${entry.title}</span>
            <span class="timeline-status">${entry.completed ? '✓' : '✗'}</span>
        </div>
    `;
    
    timeline.appendChild(newItem);
    
    // Анимация появления нового элемента
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
        newItem.style.transition = 'all 0.5s ease';
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateX(0)';
    }, 100);
}

// Функциональность для страницы контактов
function initContactsPage() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert(`Сообщение отправлено!\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`);
                contactForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля!');
            }
        });
    }
}