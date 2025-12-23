document.addEventListener('DOMContentLoaded', function() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.card');
        
        const cardsGrid = document.querySelector('.cards-grid');
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'По выбранной категории пока нет блюд';
        noResults.style.display = 'none';
        noResults.style.gridColumn = '1 / -1';
        noResults.style.textAlign = 'center';
        noResults.style.padding = '60px 20px';
        noResults.style.color = '#999';
        noResults.style.fontSize = '18px';
        cardsGrid.appendChild(noResults);
        
        function filterCards(category) {
            let hasResults = false;
            
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    hasResults = true;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            if (hasResults) {
                noResults.style.display = 'none';
            } else {
                noResults.style.display = 'block';
            }
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                const category = this.dataset.category;
                
                filterCards(category);
            });
        });
        
        filterCards('all');
        
        function updateFilterButtons() {
            const isMobile = window.innerWidth <= 768;
            const filterContainer = document.querySelector('.filter-buttons');
            
            if (isMobile) {
                filterContainer.style.justifyContent = 'flex-start';
                filterContainer.style.overflowX = 'auto';
                filterContainer.style.flexWrap = 'nowrap';
            } else {
                filterContainer.style.justifyContent = 'center';
                filterContainer.style.overflowX = 'visible';
                filterContainer.style.flexWrap = 'wrap';
            }
        }
        
        updateFilterButtons();
        window.addEventListener('resize', updateFilterButtons);
    });