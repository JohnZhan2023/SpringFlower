// 花朵字符集
const flowerCharacters = {
    petals: ['❀', '✿', '❁', '✾', '❃', '✽', '❋', '✼', '❇', '✻', '❈', '✺', '❉', '✹', '❊', '✸', '✷', '✶', '✵', '✴', '✳', '✲', '✱', '✯', '✮', '✭', '✬', '✫'],
    centers: ['◉', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '○', '◌', '◍', '◆', '◇', '◈', '❖', '❋', '✿', '♥'],
    stems: ['|', '┃', '┆', '┇', '┊', '┋', '╎', '╏', '║', '❚', '❘'],
    leaves: ['✧', '✦', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '❥', '❦', '❧', '☘', '❀', '≈', '～', '⌇', '≀', '〰️'],
    buds: ['⚬', '◍', '◌', '◦', '○', '◯', '⊙', '⦿', '◉', '⊚', '●'] // 花苞字符
};

// 花朵颜色
const flowerColors = [
    '#FF5E62', '#FF9966', '#FEB47B', '#FFEE99', '#91EAE4', '#86A8E7', 
    '#7F7FD5', '#E684AE', '#F4B0C7', '#FFAAA5', '#FFD3B6', '#D4F0F0', 
    '#B5EAEA', '#A6D0DD', '#D58D7C', '#BE9FE1', '#C5A3FF', '#FFB7C5'
];

// 莎士比亚名句 - 将在所有花苞打开后显示
const shakespeareQuote = "Shall I compare thee to a summer's day? Thou art more lovely and more temperate.";

// 爱心消息集
const loveMessages = [
    "Like these spring blossoms, my love for you grows every day.",
    "Each flower represents a reason why I love you.",
    "May this garden bring warmth to your heart, just as you do to mine.",
    "You are the most beautiful bloom in my life.",
    "I wish every day could be as lovely as you.",
    "Our love story is more beautiful than any spring garden.",
    "May our love continue to bloom like these endless flowers.",
    "In this garden of flowers, each one whispers my thoughts of you.",
    "Your smile outshines all the flowers of spring.",
    "From the moment we met, my world blossomed into color."
];

// 跟踪未打开的花苞数量
let closedBuds = 0;
let totalBuds = 8; // 我们将创建8个花苞

// DOM 元素
const flowerGarden = document.getElementById('flowerGarden');
const loveMessageElem = document.getElementById('loveMessage');
const newFlowerBtn = document.getElementById('newFlowerBtn');
const customMessageBtn = document.getElementById('customMessageBtn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 更新按钮文本为英文
    newFlowerBtn.textContent = "Plant New Flower";
    customMessageBtn.textContent = "Write Love Note";
    
    // 创建初始花朵 (一些正常花朵)
    for (let i = 0; i < 15; i++) {
        createFlower();
    }
    
    // 创建一些花苞 (需要点击才能绽放)
    for (let i = 0; i < totalBuds; i++) {
        createFlowerBud();
    }
    
    // 显示随机爱心消息
    showRandomLoveMessage();
    
    // 添加事件监听器
    newFlowerBtn.addEventListener('click', createFlower);
    customMessageBtn.addEventListener('click', askForCustomMessage);
    
    // 添加背景粒子效果
    createBackgroundParticles();
    
    // 添加键盘事件 - 按空格键创建新花朵
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            createFlower();
        }
    });
    
    // 添加音乐按钮
    addMusicButton();
});

// 创建花朵函数
function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    
    const x = Math.random() * 90 + 5; // 5% to 95% width
    const y = Math.random() * 70 + 20; // 20% to 90% height
    const scale = Math.random() * 0.5 + 0.7; // 0.7 to 1.2 scale
    const delay = Math.random() * 5; // 0 to 5s delay
    const swayDuration = Math.random() * 4 + 3; // 3 to 7s sway duration
    
    flower.style.left = `${x}%`;
    flower.style.bottom = `${y}%`;
    flower.style.transform = `scale(${scale})`;
    flower.style.animationDuration = `${swayDuration}s`;
    flower.style.animationDelay = `${delay}s`;
    
    // 花朵颜色
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    
    // 创建花朵结构
    createFlowerPetals(flower, color);
    createFlowerCenter(flower, color);
    createFlowerStem(flower);
    
    // 添加到花园
    flowerGarden.appendChild(flower);
    
    // 添加出现动画
    flower.style.animation = `bloom 1s ease forwards, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
}

// 创建花苞 (闭合状态的花朵)
function createFlowerBud() {
    const bud = document.createElement('div');
    bud.className = 'flower bud';
    
    const x = Math.random() * 90 + 5; // 5% to 95% width
    const y = Math.random() * 70 + 20; // 20% to 90% height
    const scale = Math.random() * 0.5 + 0.7; // 0.7 to 1.2 scale
    
    bud.style.left = `${x}%`;
    bud.style.bottom = `${y}%`;
    bud.style.transform = `scale(${scale})`;
    
    // 花朵颜色
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    
    // 创建花苞
    createBudShape(bud, color);
    createFlowerStem(bud);
    
    // 标记为花苞
    bud.setAttribute('data-bud', 'true');
    
    // 增加计数器
    closedBuds++;
    
    // 添加点击事件 - 点击后开花
    bud.addEventListener('click', function() {
        if (this.getAttribute('data-bud') === 'true') {
            openFlowerBud(this, color);
            this.setAttribute('data-bud', 'false');
            
            // 减少计数器
            closedBuds--;
            
            // 检查是否所有花苞都已开放
            if (closedBuds === 0) {
                setTimeout(showShakespeareQuote, 1000);
            }
        }
    });
    
    // 添加到花园
    flowerGarden.appendChild(bud);
    
    // 添加轻微的呼吸动画
    bud.style.animation = `budPulse 3s ease-in-out infinite`;
}

// 创建花苞形状
function createBudShape(bud, color) {
    // 花苞中心
    const budCenter = document.createElement('div');
    budCenter.className = 'bud-center';
    budCenter.style.position = 'absolute';
    budCenter.style.left = '50%';
    budCenter.style.top = '50%';
    budCenter.style.transform = 'translate(-50%, -50%)';
    budCenter.style.fontSize = '2.5rem';
    budCenter.style.color = shiftColor(color, 0, 0, -20); // 暗一点的颜色
    budCenter.style.textShadow = '0 0 8px ' + shiftColor(color, 0, 0, -30);
    budCenter.style.cursor = 'pointer';
    budCenter.innerText = flowerCharacters.buds[Math.floor(Math.random() * flowerCharacters.buds.length)];
    
    // 添加悬停效果
    budCenter.addEventListener('mouseover', function() {
        this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    budCenter.addEventListener('mouseout', function() {
        this.style.transform = 'translate(-50%, -50%)';
    });
    
    // 添加提示文本
    budCenter.title = "Click to bloom";
    
    bud.appendChild(budCenter);
}

// 花苞开放函数
function openFlowerBud(bud, color) {
    // 移除花苞中心
    bud.innerHTML = '';
    
    // 创建花朵结构
    createFlowerPetals(bud, color);
    createFlowerCenter(bud, color);
    createFlowerStem(bud);
    
    // 播放绽放动画
    bud.style.animation = 'bloom 1.5s ease forwards, sway 5s ease-in-out 1.5s infinite';
}

// 创建花瓣
function createFlowerPetals(flower, baseColor) {
    const numPetals = Math.floor(Math.random() * 6) + 6; // 6 to 12 petals
    const petalChar = flowerCharacters.petals[Math.floor(Math.random() * flowerCharacters.petals.length)];
    
    for (let i = 0; i < numPetals; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // 位置计算
        const angle = (i / numPetals) * Math.PI * 2;
        const radius = Math.random() * 10 + 20; // 20-30px radius
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // 应用样式
        petal.style.left = `calc(50% + ${x}px)`;
        petal.style.top = `calc(50% + ${y}px)`;
        petal.innerText = petalChar;
        
        // 颜色变化
        const hueShift = Math.random() * 30 - 15; // -15 to +15 hue shift
        petal.style.color = shiftColor(baseColor, hueShift);
        
        // 动画变化
        petal.style.animationDuration = `${Math.random() * 10 + 10}s`; // 10-20s
        petal.style.animationDelay = `${Math.random() * 2}s`; // 0-2s delay
        
        flower.appendChild(petal);
    }
}

// 创建花朵中心
function createFlowerCenter(flower, baseColor) {
    const center = document.createElement('div');
    center.className = 'petal';
    center.style.left = '50%';
    center.style.top = '50%';
    center.style.fontSize = '2.5rem';
    center.style.transform = 'translate(-50%, -50%)';
    center.innerText = flowerCharacters.centers[Math.floor(Math.random() * flowerCharacters.centers.length)];
    
    // 中心颜色比花瓣更加饱和
    center.style.color = shiftColor(baseColor, 30, 20, 10);
    
    flower.appendChild(center);
}

// 创建花茎
function createFlowerStem(flower) {
    const stem = document.createElement('div');
    stem.style.position = 'absolute';
    stem.style.bottom = '-60px';
    stem.style.left = '50%';
    stem.style.transform = 'translateX(-50%)';
    stem.style.color = '#4CAF50';
    stem.style.fontSize = '1.5rem';
    stem.style.lineHeight = '1';
    stem.style.textShadow = '0 0 5px #4CAF50';
    
    // 茎
    const stemChar = flowerCharacters.stems[Math.floor(Math.random() * flowerCharacters.stems.length)];
    stem.innerHTML = stemChar + '<br>' + stemChar + '<br>' + stemChar;
    
    // 叶子
    if (Math.random() > 0.3) { // 70% chance to have leaves
        const leaf = document.createElement('span');
        leaf.style.position = 'absolute';
        leaf.style.color = '#8BC34A';
        leaf.style.fontSize = '1.2rem';
        leaf.style.textShadow = '0 0 5px #8BC34A';
        leaf.style.transform = 'rotate(' + (Math.random() > 0.5 ? 30 : -30) + 'deg)';
        leaf.style.left = Math.random() > 0.5 ? '10px' : '-10px';
        leaf.style.top = Math.floor(Math.random() * 3) * 20 + '%';
        leaf.innerHTML = flowerCharacters.leaves[Math.floor(Math.random() * flowerCharacters.leaves.length)];
        stem.appendChild(leaf);
    }
    
    flower.appendChild(stem);
}

// 显示莎士比亚名句
function showShakespeareQuote() {
    // 创建特殊效果的消息容器
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'shakespeare-quote';
    quoteContainer.style.position = 'fixed';
    quoteContainer.style.top = '50%';
    quoteContainer.style.left = '50%';
    quoteContainer.style.transform = 'translate(-50%, -50%)';
    quoteContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    quoteContainer.style.color = '#fff';
    quoteContainer.style.padding = '2rem';
    quoteContainer.style.borderRadius = '10px';
    quoteContainer.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
    quoteContainer.style.textAlign = 'center';
    quoteContainer.style.maxWidth = '80%';
    quoteContainer.style.zIndex = '1000';
    quoteContainer.style.opacity = '0';
    quoteContainer.style.transition = 'opacity 2s ease';
    
    // 文本内容
    const quoteText = document.createElement('p');
    quoteText.style.fontSize = '1.8rem';
    quoteText.style.fontFamily = 'Georgia, serif';
    quoteText.style.lineHeight = '1.6';
    quoteText.style.margin = '0 0 1rem 0';
    quoteText.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    
    // 作者署名
    const quoteAuthor = document.createElement('p');
    quoteAuthor.style.fontSize = '1.2rem';
    quoteAuthor.style.fontStyle = 'italic';
    quoteAuthor.style.marginTop = '1rem';
    quoteAuthor.style.textAlign = 'right';
    quoteAuthor.innerHTML = '- William Shakespeare';
    
    // 添加到容器
    document.body.appendChild(quoteContainer);
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteAuthor);
    
    // 用打字机效果显示引言
    typewriterEffect(quoteText, shakespeareQuote, 70);
    
    // 淡入效果
    setTimeout(() => {
        quoteContainer.style.opacity = '1';
    }, 100);
    
    // 为花朵添加特殊的庆祝动画
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.style.animation = 'celebrate 10s ease infinite';
    });
    
    // 创建背景烟花效果
    createFireworks();
}

// 创建烟花效果
function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.position = 'fixed';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.width = '4px';
            firework.style.height = '4px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            firework.style.boxShadow = '0 0 10px 2px currentColor';
            firework.style.opacity = '0';
            firework.style.zIndex = '999';
            
            document.body.appendChild(firework);
            
            // 爆炸效果
            setTimeout(() => {
                firework.style.opacity = '1';
                firework.style.transform = 'scale(30)';
                firework.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.5s ease';
                setTimeout(() => {
                    firework.style.opacity = '0';
                }, 500);
                
                // 创建粒子
                for (let j = 0; j < 20; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.position = 'fixed';
                    particle.style.left = firework.style.left;
                    particle.style.top = firework.style.top;
                    particle.style.width = '2px';
                    particle.style.height = '2px';
                    particle.style.borderRadius = '50%';
                    particle.style.backgroundColor = firework.style.backgroundColor;
                    particle.style.boxShadow = '0 0 5px 1px currentColor';
                    particle.style.zIndex = '998';
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 150 + 50;
                    const speedFactor = Math.random() * 0.5 + 0.5;
                    
                    document.body.appendChild(particle);
                    
                    particle.animate([
                        { transform: 'translate(-50%, -50%)', opacity: 1 },
                        { 
                            transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                            opacity: 0
                        }
                    ], {
                        duration: 1000 * speedFactor,
                        easing: 'cubic-bezier(0, 0.5, 0.5, 1)',
                        fill: 'forwards'
                    });
                    
                    setTimeout(() => {
                        document.body.removeChild(particle);
                    }, 1000 * speedFactor);
                }
                
                setTimeout(() => {
                    document.body.removeChild(firework);
                }, 1500);
            }, 100);
        }, i * 800);
    }
}

// 颜色偏移函数
function shiftColor(hex, hueShift = 0, satShift = 0, lightShift = 0) {
    // 将hex转换为HSL
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // 应用偏移
    h = (h * 360 + hueShift) % 360;
    h = h < 0 ? 360 + h : h;
    h /= 360;
    
    s = Math.min(Math.max(s + satShift/100, 0), 1);
    l = Math.min(Math.max(l + lightShift/100, 0), 1);

    // 转回RGB
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    // 转为hex
    r = Math.round(r * 255).toString(16).padStart(2, '0');
    g = Math.round(g * 255).toString(16).padStart(2, '0');
    b = Math.round(b * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

// 显示随机爱心消息
function showRandomLoveMessage() {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    typewriterEffect(loveMessageElem, message);
}

// 打字机效果
function typewriterEffect(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 询问自定义消息
function askForCustomMessage() {
    const customMessage = prompt('Write your love message:', 'I love you forever!');
    if (customMessage && customMessage.trim() !== '') {
        typewriterEffect(loveMessageElem, customMessage);
    }
}

// 创建背景粒子效果
function createBackgroundParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // 位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 动画
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        document.body.appendChild(particle);
    }
}

// 添加音乐按钮
function addMusicButton() {
    const musicBtn = document.createElement('button');
    musicBtn.innerHTML = '♫ Play Music';
    musicBtn.style.position = 'fixed';
    musicBtn.style.bottom = '20px';
    musicBtn.style.right = '20px';
    
    const audio = document.createElement('audio');
    audio.src = 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3';
    audio.loop = true;
    
    document.body.appendChild(audio);
    
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.innerHTML = '♫ Pause Music';
        } else {
            audio.pause();
            musicBtn.innerHTML = '♫ Play Music';
        }
    });
    
    document.body.appendChild(musicBtn);
}

// 双击屏幕也可以创建花朵
document.addEventListener('dblclick', (e) => {
    // 阻止双击选中文字
    e.preventDefault();
    createFlower();
});

// 鼠标移动时创建跟随效果
let mouseTrailTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTrailTimeout);
    
    mouseTrailTimeout = setTimeout(() => {
        if (Math.random() > 0.7) { // 30% 几率生成
            const trail = document.createElement('div');
            trail.innerText = '✿';
            trail.style.position = 'fixed';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            trail.style.fontSize = '1.5rem';
            trail.style.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            trail.style.pointerEvents = 'none';
            trail.style.textShadow = '0 0 5px currentColor';
            trail.style.transition = 'all 0.5s';
            trail.style.opacity = '0.8';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.transform = `translate(${Math.random() * 40 - 20}px, ${-Math.random() * 50 - 20}px) rotate(${Math.random() * 360}deg)`;
                trail.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                document.body.removeChild(trail);
            }, 1000);
        }
    }, 50);
}); 