// スムーズスクロール
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

// ハンバーガーメニュー用の要素を動的に追加
function createHamburgerMenu() {
    const header = document.querySelector('.header-content');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(hamburger);
    
    // ハンバーガーメニューのトグル
    hamburger.addEventListener('click', function() {
        const navList = document.querySelector('.nav-list');
        navList.classList.toggle('active');
        
        // ハンバーガーアニメーション
        const spans = hamburger.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// スクロール時のヘッダー固定アニメーション
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 下にスクロール
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上にスクロール
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// 画像の遅延読み込み
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// フェードインアニメーション
function fadeInAnimation() {
    const elements = document.querySelectorAll('.section');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        elementObserver.observe(element);
    });
}

// 価格表のホバーエフェクト
function priceTableEffects() {
    const priceRows = document.querySelectorAll('.price-table tbody tr');
    priceRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// カウントアップアニメーション（価格表示用）
function countUpAnimation() {
    const priceElements = document.querySelectorAll('.price-table .highlight');
    
    const countUp = (element) => {
        const text = element.textContent;
        const match = text.match(/¥(\d+)/);
        if (match) {
            const target = parseInt(match[1]);
            const duration = 1000;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = `¥${current}`;
            }, 16);
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    priceElements.forEach(element => {
        observer.observe(element);
    });
}

// モバイルタッチ対応
function mobileTouch() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // タッチデバイスでのホバーエフェクトの代替
        const cards = document.querySelectorAll('.product-card, .news-item');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 300);
            });
        });
    }
}

// フォーム送信の仮実装（お問い合わせフォーム用）
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームバリデーション
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // 送信成功のメッセージ表示
                alert('お問い合わせありがとうございます。\n担当者より連絡させていただきます。');
                form.reset();
            }
        });
    });
}

// ページトップへ戻るボタン
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: opacity 0.3s, transform 0.3s;
    `;
    
    document.body.appendChild(button);
    
    // スクロール時の表示/非表示
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'scale(1)';
            }, 10);
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            setTimeout(() => {
                button.style.display = 'none';
            }, 300);
        }
    });
    
    // クリックでトップへスクロール
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// アクセシビリティ対応
function improveAccessibility() {
    // キーボードナビゲーション
    const navItems = document.querySelectorAll('.nav-list a');
    navItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && index < navItems.length - 1) {
                navItems[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                navItems[index - 1].focus();
            }
        });
    });
    
    // スキップリンクの追加
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'メインコンテンツへスキップ';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background-color: #2c5aa0;
        color: white;
        padding: 8px;
        z-index: 100;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    createHamburgerMenu();
    lazyLoadImages();
    fadeInAnimation();
    priceTableEffects();
    countUpAnimation();
    mobileTouch();
    initializeForms();
    createScrollToTopButton();
    improveAccessibility();
    
    // ローディング完了
    document.body.classList.add('loaded');
});

// ウィンドウリサイズ時の処理
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // リサイズ後の処理
        const navList = document.querySelector('.nav-list');
        if (window.innerWidth > 480 && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    }, 250);
});