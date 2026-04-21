// 全局状态
let currentStep = 1;
let soundEnabled = true;
let bargainCount = 0;
let currentPrice = 888;
let confirmClickCount = 0;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initConfetti();
    initFakeRecords();
});

// 步骤切换
function goToStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + step).classList.add('active');
    currentStep = step;
    
    // 特殊步骤的初始化
    if (step === 3) {
        resetBargain();
    } else if (step === 4) {
        startLoading();
    } else if (step === 5) {
        initEscapeButton();
    }
    
    playSound('click');
}

// ========== 步骤1: 五彩纸屑 ==========
function initConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        createConfetti(container);
    }
}

function createConfetti(container) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#FF6B6B', '#FFD700', '#4ECDC4', '#95E1D3'][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = Math.random();
    confetti.style.animation = `fall ${3 + Math.random() * 3}s linear infinite`;
    confetti.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(confetti);
}

// 添加纸屑下落动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ========== 步骤3: 砍价逻辑 ==========
function resetBargain() {
    bargainCount = 0;
    currentPrice = 888;
    updatePriceDisplay();
}

function handleBargain() {
    bargainCount++;
    const btn = document.getElementById('bargainBtn');
    const message = document.getElementById('bargainMessage');
    const encouragement = document.getElementById('encouragement');
    const specialHint = document.getElementById('specialHint');
    
    // 按钮点击动画
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 100);
    
    let cutAmount = 0;
    let messageText = '';
    let messageColor = '#FF4444';
    let encouragementText = '';
    let hintText = '';
    
    // 根据点击次数计算砍价金额
    if (bargainCount <= 5) {
        // 第1-5刀：快速期
        cutAmount = 30 + Math.random() * 50;
        messageText = `🎉 太棒了！砍掉了 ${cutAmount.toFixed(2)} 元！`;
        messageColor = '#00AA00';
        const encouragements = ['手气真好！继续砍！', '砍得飞快！太厉害了！', '这刀法可以啊！', '一刀一个准！', '运气爆棚！'];
        encouragementText = encouragements[Math.floor(Math.random() * encouragements.length)];
    } else if (bargainCount <= 12) {
        // 第6-12刀：正常期
        cutAmount = 10 + Math.random() * 20;
        messageText = `💪 继续努力！砍掉了 ${cutAmount.toFixed(2)} 元！`;
        messageColor = '#FF8800';
        const encouragements = ['加油！就快成功了！', '稳扎稳打！', '保持节奏！', '马上就到了！', '离目标越来越近！'];
        encouragementText = encouragements[Math.floor(Math.random() * encouragements.length)];
        if (bargainCount === 10) {
            hintText = '💡 已经砍了10刀了，坚持住！';
        }
    } else if (bargainCount <= 17) {
        // 第13-17刀：减速期
        cutAmount = 5 + Math.random() * 10;
        messageText = `😅 哎呀，砍少了！只砍掉 ${cutAmount.toFixed(2)} 元！`;
        messageColor = '#FF4444';
        encouragementText = '别灰心！再试试！';
        hintText = '⚠️ 越到后面越难砍，这很正常！';
    } else if (bargainCount <= 20) {
        // 第18-20刀：卡在0.99元
        cutAmount = 0.1 + Math.random() * 0.2;
        if (currentPrice - cutAmount > 0.99) {
            cutAmount = currentPrice - 0.99;
        }
        messageText = `😰 就差一丢丢了！还差 0.99 元！`;
        messageColor = '#FF0000';
        encouragementText = '天啊！就差一点点了！';
        hintText = '🔥🔥🔥 99%了！冲啊！🔥🔥🔥';
    } else if (bargainCount === 21) {
        // 第21刀：进度倒退
        cutAmount = -0.5;
        messageText = `😱 哎呀！手滑了！价格回弹了 0.5 元！`;
        messageColor = '#8B0000';
        encouragementText = '别慌！这是正常操作！';
        hintText = '⚠️ 拼多多套路：手滑倒退！';
        btn.querySelector('.button-text').textContent = '再砍一刀弥补！';
    } else if (bargainCount <= 23) {
        // 第22-23刀：恢复
        cutAmount = 0.2 + Math.random() * 0.1;
        messageText = `💪 继续砍！还差一点点！`;
        messageColor = '#FF8800';
        encouragementText = '追回来了！加油！';
    } else if (bargainCount <= 26) {
        // 第24-26刀：卡在0.01元
        cutAmount = 0.005 + Math.random() * 0.005;
        if (currentPrice - cutAmount > 0.01) {
            cutAmount = currentPrice - 0.01;
        }
        messageText = `🔥 就差 0.01 元了！！！最后一刀！`;
        messageColor = '#FF0000';
        encouragementText = '就差0.01元！！！疯狂点击！';
        hintText = '🚨🚨🚨 99.99%！！！最后冲刺！🚨🚨🚨';
        btn.classList.add('blink-text');
        btn.classList.add('crazy-shake');
    } else if (bargainCount <= 28) {
        // 第27-28刀：假失败
        cutAmount = 0;
        messageText = `❌ 网络不稳定，请重试！`;
        messageColor = '#666';
        encouragementText = '别被骗了！再点一次！';
        hintText = '💢 经典套路：假失败！继续砍！';
    } else {
        // 第29-30刀：成功
        cutAmount = currentPrice;
        messageText = `🎊 恭喜您！砍价成功！`;
        messageColor = '#00AA00';
        encouragementText = '🎉🎉🎉 成功啦！！！🎉🎉🎉';
        hintText = '✨✨✨ 你终于砍到了神秘大奖！✨✨✨';
    }
    
    // 更新价格
    currentPrice = Math.max(0, currentPrice - cutAmount);
    currentPrice = Math.round(currentPrice * 100) / 100;
    
    // 显示消息
    message.textContent = messageText;
    message.style.color = messageColor;
    
    // 显示鼓励语
    if (encouragement) {
        encouragement.textContent = encouragementText;
        encouragement.style.opacity = '0';
        setTimeout(() => {
            encouragement.style.transition = 'opacity 0.3s';
            encouragement.style.opacity = '1';
        }, 100);
    }
    
    // 显示特殊提示
    if (specialHint) {
        specialHint.textContent = hintText;
        if (hintText) {
            specialHint.classList.add('super-blink');
        } else {
            specialHint.classList.remove('super-blink');
        }
    }
    
    // 更新显示
    updatePriceDisplay();
    
    // 添加砍价记录
    addBargainRecord(cutAmount);
    
    // 播放音效
    playSound('bargain');
    
    // 检查是否完成
    if (currentPrice === 0) {
        setTimeout(() => {
            showSuccessAnimation();
            setTimeout(() => {
                goToStep(4);
            }, 2000);
        }, 1000);
    }
}

function updatePriceDisplay() {
    const priceElement = document.getElementById('currentPrice');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // 更新价格（带动画）
    priceElement.style.transform = 'scale(1.2)';
    priceElement.style.color = '#FF0000';
    setTimeout(() => {
        priceElement.textContent = currentPrice.toFixed(2);
        priceElement.style.transform = 'scale(1)';
    }, 200);
    
    // 更新进度条
    const progress = ((888 - currentPrice) / 888) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = progress.toFixed(1) + '%';
    
    // 特殊进度标注
    if (progress >= 99 && progress < 100) {
        progressText.style.color = '#FF0000';
        progressText.style.fontSize = '20px';
        progressText.style.fontWeight = 'bold';
    }
}

function addBargainRecord(amount) {
    const recordsList = document.getElementById('recordsList');
    const record = document.createElement('div');
    record.className = 'record-item';
    
    const phone = '1' + Math.floor(30 + Math.random() * 60) + '****' + Math.floor(1000 + Math.random() * 9000);
    const amountText = amount > 0 ? `砍了 ${amount.toFixed(2)}元` : '手滑了';
    record.textContent = `${phone} 刚刚${amountText}`;
    
    recordsList.insertBefore(record, recordsList.firstChild);
    
    // 保持最多显示10条
    if (recordsList.children.length > 10) {
        recordsList.removeChild(recordsList.lastChild);
    }
}

function showSuccessAnimation() {
    const message = document.getElementById('bargainMessage');
    message.innerHTML = '🎉🎉🎉 砍价成功！🎉🎉🎉';
    message.style.fontSize = '32px';
    message.style.color = '#FFD700';
    
    // 创建礼花效果
    createFireworks();
}

function createFireworks() {
    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.textContent = ['🎊', '🎉', '✨', '⭐'][Math.floor(Math.random() * 4)];
        firework.style.position = 'fixed';
        firework.style.fontSize = '30px';
        firework.style.left = '50%';
        firework.style.top = '50%';
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '9999';
        document.body.appendChild(firework);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        const animation = setInterval(() => {
            posX += vx * 0.02;
            posY += vy * 0.02;
            firework.style.transform = `translate(${posX}px, ${posY}px)`;
            firework.style.opacity = Math.max(0, 1 - Math.abs(posY) / 200);
            
            if (Math.abs(posY) > 200) {
                clearInterval(animation);
                firework.remove();
            }
        }, 20);
    }
}

function initFakeRecords() {
    // 初始化假的砍价记录滚动
    setInterval(() => {
        if (currentStep === 3) {
            const recordsList = document.getElementById('recordsList');
            if (recordsList && recordsList.children.length > 3) {
                const record = document.createElement('div');
                record.className = 'record-item';
                const phone = '1' + Math.floor(30 + Math.random() * 60) + '****' + Math.floor(1000 + Math.random() * 9000);
                const amount = Math.floor(10 + Math.random() * 50);
                record.textContent = `${phone} 刚刚砍了 ${amount}元`;
                recordsList.insertBefore(record, recordsList.firstChild);
                
                if (recordsList.children.length > 10) {
                    recordsList.removeChild(recordsList.lastChild);
                }
            }
        }
    }, 3000);
}

// ========== 步骤4: 加载动画 ==========
function startLoading() {
    const loadingFill = document.getElementById('loadingFill');
    const loadingText = document.getElementById('loadingText');
    const messages = [
        '正在核实您的砍价记录...',
        '正在生成免费订单...',
        '正在包装您的奖品...',
        '正在从仓库调货...'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        loadingFill.style.width = progress + '%';
        
        if (progress % 25 === 0 && messageIndex < messages.length) {
            loadingText.textContent = messages[messageIndex];
            messageIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                goToStep(5);
            }, 500);
        }
    }, 50);
}

// ========== 步骤5: 躲避按钮 ==========
function initEscapeButton() {
    confirmClickCount = 0;
    const btn = document.getElementById('confirmBtn');
    btn.style.position = 'relative';
    btn.style.transition = 'all 0.3s';
    
    btn.addEventListener('mouseenter', handleButtonEscape);
}

function handleButtonEscape(e) {
    if (confirmClickCount >= 3) {
        // 点击3次后停止逃跑
        e.target.removeEventListener('mouseenter', handleButtonEscape);
        return;
    }
    
    const btn = e.target;
    const container = btn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    // 随机新位置
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    btn.style.transform = `translate(${newX}px, ${newY}px)`;
    
    playSound('click');
}

function handleConfirm() {
    confirmClickCount++;
    
    if (confirmClickCount >= 3) {
        goToStep(6);
    } else {
        const btn = document.getElementById('confirmBtn');
        btn.textContent = `确认领取 (${3 - confirmClickCount}次后可点击)`;
    }
}

function handleReject() {
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0,0,0,0.8)';
    message.style.color = 'white';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '10px';
    message.style.fontSize = '20px';
    message.style.zIndex = '10000';
    message.textContent = '放弃失败！您已经砍了这么久了，必须领取！';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
    
    playSound('error');
}

// ========== 步骤6: 红包 ==========
function openRedpacket() {
    const redpacket = document.getElementById('redpacket');
    redpacket.style.transform = 'scale(0)';
    redpacket.style.transition = 'transform 0.5s';
    
    playSound('redpacket');
    
    // 创建爆炸效果
    createCoinExplosion();
    
    setTimeout(() => {
        goToStep(7);
    }, 1500);
}

function createCoinExplosion() {
    for (let i = 0; i < 50; i++) {
        const coin = document.createElement('div');
        coin.textContent = '💰';
        coin.style.position = 'fixed';
        coin.style.fontSize = '30px';
        coin.style.left = '50%';
        coin.style.top = '50%';
        coin.style.pointerEvents = 'none';
        coin.style.zIndex = '9999';
        document.body.appendChild(coin);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 150 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100;
        
        let posX = 0;
        let posY = 0;
        let velocityY = vy;
        
        const animation = setInterval(() => {
            posX += vx * 0.02;
            posY += velocityY * 0.02;
            velocityY += 10;
            
            coin.style.transform = `translate(${posX}px, ${posY}px) rotate(${posY * 2}deg)`;
            coin.style.opacity = Math.max(0, 1 - posY / 300);
            
            if (posY > 400) {
                clearInterval(animation);
                coin.remove();
            }
        }, 20);
    }
}

// ========== 步骤7: 最终表白 ==========
function handleReceive() {
    const message = document.getElementById('finalMessage');
    message.innerHTML = `
        <div style="text-align: center;">
            <p style="font-size: 24px; font-weight: 900; margin-bottom: 15px; color: #FF1493;" class="super-blink">
                � 恭喜！领取成功！🎊
            </p>
            <div style="background: linear-gradient(135deg, #FFE5E5, #FFF0F0); border: 3px solid #FF69B4; border-radius: 15px; padding: 20px; margin: 15px 0;">
                <p style="font-size: 20px; font-weight: 900; color: #FF1493; margin-bottom: 10px;">📱 领取奖励步骤：</p>
                <p style="font-size: 18px; color: #333; margin: 8px 0; font-weight: 700;">
                    1️⃣ 添加微信：<span style="color: #FF0000; font-weight: 900; font-size: 22px;">Ryan_TheAce</span>
                </p>
                <p style="font-size: 18px; color: #333; margin: 8px 0; font-weight: 700;">
                    2️⃣ 发送消息：<span style="color: #FF0000; font-weight: 900; font-size: 22px;">"老公，我爱你"</span>
                </p>
                <p style="font-size: 18px; color: #333; margin: 8px 0; font-weight: 700;">
                    3️⃣ 即可领取超级大奖！🎁
                </p>
            </div>
            <button onclick="goToStep(8)" style="
                background: linear-gradient(135deg, #FF1493, #FF69B4);
                color: white;
                border: none;
                border-radius: 50px;
                padding: 15px 40px;
                font-size: 22px;
                font-weight: 900;
                cursor: pointer;
                margin-top: 15px;
                box-shadow: 0 8px 20px rgba(255,20,147,0.4);
                font-family: 'Noto Sans SC', sans-serif;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
            " class="glow-pulse">
                💝 查看大奖 💝
            </button>
        </div>
    `;
    message.style.background = 'white';
    message.style.color = '#333';
    message.style.fontSize = '16px';
    
    playSound('success');
    createHearts();
}

function handleShare() {
    const message = document.getElementById('finalMessage');
    message.textContent = '❌ 此商品不支持分享，仅限本人使用！';
    message.style.background = '#f0f0f0';
    message.style.color = '#666';
    
    playSound('error');
}

function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.fontSize = '30px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            document.body.appendChild(heart);
            
            let posY = -50;
            const animation = setInterval(() => {
                posY -= 2;
                heart.style.bottom = (-posY) + 'px';
                heart.style.opacity = Math.max(0, 1 - (-posY) / 500);
                
                if (-posY > 600) {
                    clearInterval(animation);
                    heart.remove();
                }
            }, 20);
        }, i * 100);
    }
}

// ========== 音效系统 ==========
function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggle');
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted');
}

function playSound(type) {
    if (!soundEnabled) return;
    
    // 使用Web Audio API创建简单音效
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'click':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'bargain':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'success':
            oscillator.frequency.value = 1000;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'error':
            oscillator.frequency.value = 200;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'redpacket':
            oscillator.frequency.value = 1200;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
    }
}
