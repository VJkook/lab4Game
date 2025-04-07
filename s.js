const levels = [
    { name: 'Бронза', min: 0, max: 5000, percent: 7 },
    { name: 'Серебро', min: 5001, max: 15000, percent: 10 },
    { name: 'Золото', min: 15001, max: 30000, percent: 13 },
    { name: 'Платина', min: 30001, max: Infinity, percent: 15 }
  ];
  
  function getCurrentLevel(amount) {
    return levels.find(level => amount >= level.min && amount <= level.max);
  }
  
  function loadData() {
    return {
      totalSpent: parseInt(localStorage.getItem('totalSpent')) || 0,
      balance: parseInt(localStorage.getItem('balance')) || 0
    };
  }
  
  function saveData(totalSpent, balance) {
    localStorage.setItem('totalSpent', totalSpent);
    localStorage.setItem('balance', balance);
  }
  
  function updateUI() {
    const { totalSpent, balance } = loadData();
    const level = getCurrentLevel(totalSpent);
  
    const levelEl = document.getElementById('level');
    const balanceEl = document.getElementById('balance');
    const progressEl = document.getElementById('progress');
  
    if (levelEl) levelEl.textContent = level.name;
    if (balanceEl) balanceEl.textContent = balance;
  
    if (progressEl) {
      let nextLevel = levels.find(l => l.min > level.min);
      let percent = 100;
  
      if (nextLevel) {
        let range = nextLevel.min - level.min;
        let current = totalSpent - level.min;
        percent = Math.min(100, Math.floor((current / range) * 100));
      }
  
      progressEl.style.width = percent + '%';
      progressEl.textContent = percent + '%';
    }
  }
  
  function handlePurchase(price) {
    let { totalSpent, balance } = loadData();
  
    totalSpent += price;
    const level = getCurrentLevel(totalSpent);
    const points = Math.floor(price * (level.percent / 100));
    balance += points;
  
    saveData(totalSpent, balance);
    updateUI();
  
    alert(`Вы заработали ${points} баллов!`);
  }
  
  // Навешиваем обработчики при загрузке страницы
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buyBtn').addEventListener('click', function () {
        const balanceElement = document.getElementById('balance');
        const productPrice = parseInt(document.getElementById('modalProductPrice').textContent);
        let currentBalance = parseInt(balanceElement.textContent);
    });
});

  




//   миссии


// main.js


function updateProfileUI() {
    const { totalSpent, balance } = loadData();
    const level = getCurrentLevel(totalSpent);
  
    const profileLevelEl = document.getElementById('profile-level');
    const profileBalanceEl = document.getElementById('profile-balance');
    const profileProgressEl = document.getElementById('profile-progress');
  
    if (profileLevelEl) profileLevelEl.textContent = level.name;
    if (profileBalanceEl) profileBalanceEl.textContent = balance;
  
    if (profileProgressEl) {
      let nextLevel = levels.find(l => l.min > level.min);
      let percent = 100;
  
      if (nextLevel) {
        let range = nextLevel.min - level.min;
        let current = totalSpent - level.min;
        percent = Math.min(100, Math.floor((current / range) * 100));
      }
  
      profileProgressEl.style.width = percent + '%';
      profileProgressEl.textContent = percent + '%';
    }
  }
  








document.addEventListener('DOMContentLoaded', () => {
    const progressKey = 'mission_progress';
    const rewardKey = 'user_rewards';

    let missionProgress = JSON.parse(localStorage.getItem(progressKey)) || {
        firstOrder: false,
        cakeConstructor: false,
        tenOrders: 0
    };

    let userRewards = parseInt(localStorage.getItem(rewardKey)) || 0;

    function saveProgress() {
        localStorage.setItem(progressKey, JSON.stringify(missionProgress));
        localStorage.setItem(rewardKey, userRewards.toString());
    }

    // ✅ Обновление карточек миссий на странице mission.html
    function updateMissionPageUI() {
        const missionCards = document.querySelectorAll('.mission-card');
        if (!missionCards.length) return;
    
        if (missionProgress.firstOrder) missionCards[0].classList.add('completed');
        if (missionProgress.cakeConstructor) missionCards[1].classList.add('completed');
    
        const percent = Math.min(100, (missionProgress.tenOrders / 10) * 100);
        missionCards[2].querySelector('.progress').style.width = `${percent}%`;
        missionCards[2].querySelector('.mission-progress').textContent = `Выполнено ${missionProgress.tenOrders} из 10`;
    
        if (missionProgress.tenOrders >= 10) missionCards[2].classList.add('completed');
    }
    

    // ✅ Обновление миссий в личном кабинете (progress и "X из 3")
    function updateProfileMissionsUI() {
        const missionsCard = document.querySelector('.missions-card');
        if (!missionsCard) return;

        const completedCount =
            (missionProgress.firstOrder ? 1 : 0) +
            (missionProgress.cakeConstructor ? 1 : 0) +
            (missionProgress.tenOrders >= 10 ? 1 : 0);

        const progress = missionsCard.querySelector('.progress');
        const text = missionsCard.querySelector('p');

        if (progress) {
            const percent = (completedCount / 3) * 100;
            progress.style.width = `${percent}%`;
        }

        if (text) {
            text.textContent = `Выполнено ${completedCount} из 3 миссий`;
        }
    }

    // ✅ Покупка на любой странице
  // Обновляем прогресс миссий
function handleBuyButtonClick(price) {
    const priceValue = parseInt(price);

    // Обновляем прогресс миссий и начисляем баллы
    if (!missionProgress.firstOrder) {
        missionProgress.firstOrder = true;
        userRewards += 50;
        alert('Миссия "Первый заказ" выполнена! +50 баллов');
    }

    if (priceValue >= 1000) {
        missionProgress.tenOrders += 1;
        if (missionProgress.tenOrders === 10) {
            userRewards += 150;
            alert('Вы выполнили миссию: Сделать 10 заказов! +150 баллов');
        }
    }

    saveProgress(); // Сохранить прогресс
    updateUI(); // Обновить интерфейс (или конкретные функции UI)
}

    

const buyButtons = document.querySelectorAll('.buy-button');
if (buyButtons.length > 0) {
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const price = btn.dataset.price;
            handleBuyButtonClick(price);
        });
    });
} else {
    console.log('No buy buttons found!');
}







    console.log("Mission Progress:", missionProgress);
    console.log("Total Spent:", totalSpent);
    console.log("Balance:", balance);
    



    // ✅ Если мы на странице mission.html — позволяем вручную завершить миссии (для примера)
    const missionCards = document.querySelectorAll('.mission-card');
    if (missionCards.length) {
        missionCards[0].addEventListener('click', () => {
            if (!missionProgress.firstOrder) {
                missionProgress.firstOrder = true;
                userRewards += 50;
                alert('Миссия "Первый заказ" выполнена! +50 баллов');
                saveProgress();
                updateMissionPageUI();
                updateProfileMissionsUI();
            }
        });

        missionCards[1].addEventListener('click', () => {
            if (!missionProgress.cakeConstructor) {
                missionProgress.cakeConstructor = true;
                userRewards += 100;
                alert('Миссия "Собери торт" выполнена! +100 баллов');
                saveProgress();
                updateMissionPageUI();
                updateProfileMissionsUI();
            }
        });
    }

    // ⏫ При загрузке сразу обновляем все UI
    updateMissionPageUI();
    updateProfileMissionsUI();
});









function showProductModal(name, image, price, weight, description) {
    const modalName = document.getElementById('modalProductName');
    const modalImage = document.getElementById('modalProductImage');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalWeight = document.getElementById('modalProductWeight');
    const modalDesc = document.getElementById('modalProductDescription');
    
    if (modalName && modalImage && modalPrice && modalWeight && modalDesc) {
        modalName.textContent = name;
        modalImage.src = image;
        modalPrice.textContent = price;
        modalWeight.textContent = weight;
        modalDesc.textContent = description;
        
        document.getElementById('productModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Не найдены элементы модального окна');
    }
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}

document.getElementById('buyBtn').addEventListener('click', function () {
    const balanceElement = document.getElementById('balance');
    const productPrice = parseInt(document.getElementById('modalProductPrice').textContent);
    let currentBalance = parseInt(balanceElement.textContent);

    if (currentBalance >= productPrice) {
        currentBalance -= productPrice;
        balanceElement.textContent = currentBalance;

        alert('Поздравляем! Товар успешно куплен 🎉');
        closeModal();
    } else {
        alert('Недостаточно баллов для покупки 😢');
    }
});








const resetBtn = document.getElementById('reset-missions');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('mission_progress');
        localStorage.removeItem('user_rewards');
        alert('Прогресс миссий сброшен!');
        location.reload();
    });
}


const resetLevelsBtn = document.getElementById('reset-levels');
if (resetLevelsBtn) {
    resetLevelsBtn.addEventListener('click', () => {
        localStorage.removeItem('totalSpent');
        localStorage.removeItem('balance');
        alert('Уровень и баллы сброшены!');
        updateUI(); // обновить отображение
    });
}
