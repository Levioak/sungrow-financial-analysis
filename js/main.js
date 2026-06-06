/**
 * 阳光电源财务分析平台 - 主交互模块
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initBackToTop();
    initChartResize();
    initSmoothScroll();

    // 初始化所有图表
    setTimeout(initCharts, 200);
});

// ===== 导航交互 =====
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // 移动端汉堡菜单
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
        });
    }

    // 导航点击切换
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 关闭移动端菜单
            navMenu.classList.remove('open');

            const targetId = this.getAttribute('href').substring(1);

            // 更新导航激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 切换显示区域
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // 更新 URL hash
            history.pushState(null, null, '#' + targetId);

            // 延迟触发图表 resize 确保正确渲染
            setTimeout(triggerAllResize, 300);
        });
    });

    // 初始加载时根据 hash 判断
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }

    // 监听浏览器前进/后退
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        const targetLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    });
}

// ===== 返回顶部 =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 图表自适应 =====
function initChartResize() {
    let resizeTimer;

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(triggerAllResize, 200);
    });
}

function triggerAllResize() {
    document.querySelectorAll('.chart-box').forEach(function(dom) {
        try {
            const chart = echarts.getInstanceByDom(dom);
            if (chart) chart.resize();
        } catch(e) {
            // 静默处理
        }
    });
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // 由导航逻辑处理
            }
        });
    });
}

// ===== 数据加载状态 =====
(function SimulateMarketCap() {
    // 模拟市值加载（实际可接入API）
    const capElement = document.getElementById('marketCap');
    if (capElement) {
        // 基于 2024 净利润 110.36 亿和 PE 15.8
        const marketCap = (110.36 * 15.8).toFixed(0);
        capElement.textContent = marketCap + '亿';
        const changeElement = capElement.closest('.metric-card').querySelector('.metric-change');
        if (changeElement) {
            changeElement.textContent = 'PE 15.8x | 约 ' + (marketCap / 100).toFixed(1) + ' 亿';
            changeElement.className = 'metric-change stable';
        }
    }
})();

// ===== 控制台输出 =====
console.log('%c☀️ 阳光电源(300274) 财务分析平台', 'font-size: 20px; font-weight: bold; color: #f5a623;');
console.log('%c数据来源：公司年报、券商研报 | 仅供参考，不构成投资建议', 'font-size: 12px; color: #8e8ea0;');
console.log('%c部署于 Cloudflare Pages', 'font-size: 12px; color: #1a3a6b;');
