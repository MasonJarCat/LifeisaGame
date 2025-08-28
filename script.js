// Game State Management
class GameState {
    constructor() {
        this.player = {
            level: 1,
            xp: 0,
            coins: 0,
            inventory: []
        };
        this.quests = {
            daily: [],
            weekly: [],
            stretch: []
        };
        this.rewards = [];
        this.completedQuests = [];
        this.init();
    }

    init() {
        this.loadFromCookies();
        this.setupDefaultRewards();
        this.generateDailyQuests();
        this.generateWeeklyQuests();
        this.setupStretchGoals();
        this.updateUI();
    }

    // Cookie Management
    saveToCookies() {
        const gameData = {
            player: this.player,
            quests: this.quests,
            completedQuests: this.completedQuests,
            lastSave: Date.now()
        };
        document.cookie = `lifeGameData=${encodeURIComponent(JSON.stringify(gameData))}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
    }

    loadFromCookies() {
        const cookies = document.cookie.split(';');
        const gameDataCookie = cookies.find(cookie => cookie.trim().startsWith('lifeGameData='));
        
        if (gameDataCookie) {
            try {
                const gameData = JSON.parse(decodeURIComponent(gameDataCookie.split('=')[1]));
                this.player = { ...this.player, ...gameData.player };
                this.quests = { ...this.quests, ...gameData.quests };
                this.completedQuests = gameData.completedQuests || [];
                
                // Check if it's a new day/week and regenerate quests if needed
                this.checkForNewPeriod(gameData.lastSave);
            } catch (error) {
                console.log('Error loading game data, starting fresh');
            }
        }
    }

    checkForNewPeriod(lastSave) {
        const now = new Date();
        const lastSaveDate = new Date(lastSave);
        
        // Check if it's a new day
        if (now.toDateString() !== lastSaveDate.toDateString()) {
            this.generateDailyQuests();
        }
        
        // Check if it's a new week
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const lastWeekStart = new Date(lastSaveDate.setDate(lastSaveDate.getDate() - lastSaveDate.getDay()));
        
        if (weekStart.getTime() !== lastWeekStart.getTime()) {
            this.generateWeeklyQuests();
        }
    }

    // Quest Generation
    generateDailyQuests() {
        const dailyQuestTemplates = [
            { title: "Daily Check-In", description: "Mark your attendance for today!", xp: 5, coins: 1 },
            { title: "Make Your Bed", description: "Start the day organized", xp: 10, coins: 2 },
            { title: "Drink 8 Glasses of Water", description: "Stay hydrated throughout the day", xp: 15, coins: 3 },
            { title: "Exercise for 30 Minutes", description: "Get your body moving", xp: 25, coins: 5 },
            { title: "Read for 20 Minutes", description: "Feed your mind", xp: 20, coins: 4 },
            { title: "Clean One Room", description: "Tidy up your living space", xp: 15, coins: 3 },
            { title: "Cook a Healthy Meal", description: "Nourish your body", xp: 20, coins: 4 },
            { title: "Meditate for 10 Minutes", description: "Center your mind", xp: 15, coins: 3 },
            { title: "Take a Walk Outside", description: "Get some fresh air", xp: 15, coins: 3 },
            { title: "Practice a Skill", description: "Work on self-improvement", xp: 20, coins: 4 },
            { title: "Connect with a Friend", description: "Maintain relationships", xp: 15, coins: 3 }
        ];

        // Select 3-5 random daily quests, always include check-in
        const randomQuests = dailyQuestTemplates.slice(1).sort(() => 0.5 - Math.random()).slice(0, 3);
        this.quests.daily = [dailyQuestTemplates[0], ...randomQuests].map(quest => ({
            ...quest,
            id: this.generateQuestId(),
            completed: false,
            type: 'daily'
        }));
    }

    generateWeeklyQuests() {
        const weeklyQuestTemplates = [
            { title: "Deep Clean the House", description: "Thorough cleaning of all rooms", xp: 100, coins: 20 },
            { title: "Plan Next Week's Meals", description: "Organize your nutrition", xp: 50, coins: 10 },
            { title: "Review and Update Goals", description: "Reflect on progress", xp: 60, coins: 12 },
            { title: "Learn Something New", description: "Complete an online course or tutorial", xp: 80, coins: 16 },
            { title: "Organize Digital Files", description: "Clean up computer/phone storage", xp: 40, coins: 8 },
            { title: "Exercise 5 Times", description: "Stay consistent with fitness", xp: 120, coins: 25 },
            { title: "Read a Book", description: "Complete an entire book", xp: 100, coins: 20 },
            { title: "Try a New Recipe", description: "Expand your cooking skills", xp: 60, coins: 12 }
        ];

        // Select 2-3 weekly quests
        this.quests.weekly = this.getRandomQuests(weeklyQuestTemplates, 3);
    }

    setupStretchGoals() {
        if (this.quests.stretch.length === 0) {
            this.quests.stretch = [
                { 
                    title: "Learn a New Language", 
                    description: "Achieve conversational level in a foreign language", 
                    xp: 1000, 
                    coins: 200,
                    progress: 0,
                    maxProgress: 100
                },
                { 
                    title: "Read 12 Books This Year", 
                    description: "Expand your knowledge through reading", 
                    xp: 600, 
                    coins: 120,
                    progress: 0,
                    maxProgress: 12
                },
                { 
                    title: "Master a New Skill", 
                    description: "Become proficient in a hobby or professional skill", 
                    xp: 800, 
                    coins: 160,
                    progress: 0,
                    maxProgress: 50
                }
            ];
        }
    }

    getRandomQuests(questPool, count) {
        const shuffled = [...questPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).map(quest => ({
            ...quest,
            id: this.generateQuestId(),
            completed: false,
            type: questPool === this.quests.daily ? 'daily' : 'weekly'
        }));
    }

    generateQuestId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Reward System
    setupDefaultRewards() {
        if (this.rewards.length === 0) {
            this.rewards = [
                { id: 1, name: "Favorite Snack", description: "Treat yourself!", cost: 20, type: "consumable" },
                { id: 2, name: "Movie Night", description: "Watch a favorite film", cost: 50, type: "activity" },
                { id: 3, name: "New Book", description: "Purchase a book you've wanted", cost: 100, type: "item" },
                { id: 4, name: "Spa Day", description: "Relaxing self-care day", cost: 150, type: "activity" },
                { id: 5, name: "Video Game", description: "New game purchase", cost: 300, type: "item" },
                { id: 6, name: "Restaurant Meal", description: "Dine at a nice restaurant", cost: 200, type: "activity" },
                { id: 7, name: "Hobby Supplies", description: "Materials for your interests", cost: 120, type: "item" },
                { id: 8, name: "Weekend Getaway", description: "Short vacation or day trip", cost: 500, type: "activity" }
            ];
        }
    }

    // Quest Management
    completeQuest(questId) {
        let quest = null;
        let questType = null;

        // Find the quest
        for (const [type, quests] of Object.entries(this.quests)) {
            const foundQuest = quests.find(q => q.id === questId);
            if (foundQuest) {
                quest = foundQuest;
                questType = type;
                break;
            }
        }

        if (quest && !quest.completed) {
            quest.completed = true;
            this.player.xp += quest.xp;
            this.player.coins += quest.coins;
            this.completedQuests.push({
                ...quest,
                completedAt: new Date().toISOString()
            });

            this.checkLevelUp();
            this.showAchievement(`Quest Completed! +${quest.xp} XP, +${quest.coins} coins`);
            this.saveToCookies();
            this.updateUI();
        }
    }

    checkLevelUp() {
        const xpNeeded = this.getXPNeeded(this.player.level);
        if (this.player.xp >= xpNeeded) {
            this.player.level++;
            this.player.xp -= xpNeeded;
            this.showAchievement(`Level Up! You are now level ${this.player.level}!`);
        }
    }

    getXPNeeded(level) {
        return level * 100; // Simple progression: 100, 200, 300, etc.
    }

    // Reward Management
    purchaseReward(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (reward && this.player.coins >= reward.cost) {
            this.player.coins -= reward.cost;
            this.player.inventory.push({
                ...reward,
                purchasedAt: new Date().toISOString()
            });
            this.showAchievement(`Purchased: ${reward.name}!`);
            this.saveToCookies();
            this.updateUI();
        }
    }

    // Custom Quest Management
    addCustomQuest(questData) {
        const quest = {
            ...questData,
            id: this.generateQuestId(),
            completed: false,
            custom: true
        };
        
        this.quests[questData.type].push(quest);
        this.saveToCookies();
        this.updateUI();
    }

    // UI Updates
    updateUI() {
        this.updatePlayerStats();
        this.updateQuests();
        this.updateRewards();
        this.updateInventory();
    }

    updatePlayerStats() {
        document.getElementById('player-level').textContent = this.player.level;
        document.getElementById('player-xp').textContent = this.player.xp;
        document.getElementById('xp-needed').textContent = this.getXPNeeded(this.player.level);
        document.getElementById('player-coins').textContent = this.player.coins;
    }

    updateQuests() {
        // Daily
        const dailyContainer = document.getElementById('daily-quests');
        if (dailyContainer) {
            dailyContainer.innerHTML = '';
            this.quests.daily.filter(q => !q.completed).forEach(quest => {
                const questElement = this.createQuestElement(quest);
                dailyContainer.appendChild(questElement);
            });
            if (this.quests.daily.filter(q => !q.completed).length === 0) {
                dailyContainer.innerHTML = '<p style="text-align:center; color:#718096;">All daily quests completed!</p>';
            }
        }
        // Weekly
        const weeklyContainer = document.getElementById('weekly-quests');
        if (weeklyContainer) {
            weeklyContainer.innerHTML = '';
            this.quests.weekly.filter(q => !q.completed).forEach(quest => {
                const questElement = this.createQuestElement(quest);
                weeklyContainer.appendChild(questElement);
            });
            if (this.quests.weekly.filter(q => !q.completed).length === 0) {
                weeklyContainer.innerHTML = '<p style="text-align:center; color:#718096;">All weekly quests completed!</p>';
            }
        }
        // Stretch Goals
        const stretchContainer = document.getElementById('stretch-goals');
        if (stretchContainer) {
            stretchContainer.innerHTML = '';
            this.quests.stretch.forEach(goal => {
                const goalElement = this.createStretchGoalElement(goal);
                stretchContainer.appendChild(goalElement);
            });
            if (this.quests.stretch.length === 0) {
                stretchContainer.innerHTML = '<p style="text-align:center; color:#718096;">No stretch goals yet!</p>';
            }
        }
    }

    createQuestElement(quest) {
        const questDiv = document.createElement('div');
        questDiv.className = `quest-item ${quest.completed ? 'completed' : ''}`;
        questDiv.innerHTML = `
            <div class="quest-title">${quest.title}</div>
            <div class="quest-description">${quest.description}</div>
            <div class="quest-rewards">
                <span class="reward-badge">+${quest.xp} XP</span>
                <span class="reward-badge">+${quest.coins} coins</span>
            </div>
            ${quest.progress !== undefined ? `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(quest.progress / quest.maxProgress) * 100}%"></div>
                </div>
                <small>${quest.progress}/${quest.maxProgress}</small>
            ` : ''}
        `;

        if (!quest.completed) {
            questDiv.addEventListener('click', () => this.completeQuest(quest.id));
        }

        return questDiv;
    }

    createStretchGoalElement(goal) {
        const goalDiv = document.createElement('div');
        goalDiv.className = 'quest-item';
        goalDiv.innerHTML = `
            <div class="quest-title">${goal.title}</div>
            <div class="quest-description">${goal.description}</div>
            <div class="quest-rewards">
                <span class="reward-badge">+${goal.xp} XP</span>
                <span class="reward-badge">+${goal.coins} coins</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(goal.progress / goal.maxProgress) * 100}%"></div>
            </div>
            <small>Progress: ${goal.progress}/${goal.maxProgress}</small>
        `;
        // Optionally, add logic to increment progress
        return goalDiv;
    }

    updateRewards() {
        const container = document.getElementById('rewards-list');
        container.innerHTML = '';

        this.rewards.forEach(reward => {
            const rewardDiv = document.createElement('div');
            rewardDiv.className = `reward-item ${this.player.coins >= reward.cost ? 'affordable' : ''}`;
            rewardDiv.innerHTML = `
                <div class="reward-name">${reward.name}</div>
                <div class="reward-description">${reward.description}</div>
                <div class="reward-cost">${reward.cost} coins</div>
            `;

            if (this.player.coins >= reward.cost) {
                rewardDiv.addEventListener('click', () => this.purchaseReward(reward.id));
            }

            container.appendChild(rewardDiv);
        });
    }

    updateInventory() {
        const container = document.getElementById('inventory-items');
        container.innerHTML = '';

        this.player.inventory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="item-type">${item.type}</div>
            `;
            container.appendChild(itemDiv);
        });

        if (this.player.inventory.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #718096;">No items yet!</p>';
        }
    }

    showAchievement(message) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            document.cookie = 'lifeGameData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.reload();
        }
    }
}

// Initialize the game
const game = new GameState();

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('quest-modal');
    const addQuestBtn = document.getElementById('add-quest-btn');
    const closeModal = document.querySelector('.close');
    const questForm = document.getElementById('quest-form');
    const resetBtn = document.getElementById('reset-data-btn');
    const clockDiv = document.getElementById('live-clock');
    const tabQuests = document.getElementById('tab-quests');
    const tabShop = document.getElementById('tab-shop');
    const tabInventory = document.getElementById('tab-inventory');
    const tabContentQuests = document.getElementById('tab-content-quests');
    const tabContentShop = document.getElementById('tab-content-shop');
    const tabContentInventory = document.getElementById('tab-content-inventory');
    const shopItemForm = document.getElementById('shop-item-form');
    const shopTrackerDiv = document.getElementById('shop-tracker');
    const exportBtn = document.getElementById('export-btn');
    const importFile = document.getElementById('import-file');

    addQuestBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    questForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const questData = {
            title: document.getElementById('quest-title').value,
            description: document.getElementById('quest-description').value,
            xp: parseInt(document.getElementById('quest-xp').value),
            coins: parseInt(document.getElementById('quest-coins').value),
            type: document.getElementById('quest-type').value
        };

        game.addCustomQuest(questData);
        modal.style.display = 'none';
        questForm.reset();
    });

    resetBtn.addEventListener('click', () => {
        game.resetProgress();
    });

    tabQuests.addEventListener('click', () => {
        tabQuests.classList.add('active');
        tabShop.classList.remove('active');
        tabInventory.classList.remove('active');
        tabContentQuests.style.display = '';
        tabContentShop.style.display = 'none';
        tabContentInventory.style.display = 'none';
    });
    tabShop.addEventListener('click', () => {
        tabShop.classList.add('active');
        tabQuests.classList.remove('active');
        tabInventory.classList.remove('active');
        tabContentShop.style.display = '';
        tabContentQuests.style.display = 'none';
        tabContentInventory.style.display = 'none';
    });
    tabInventory.addEventListener('click', () => {
        tabInventory.classList.add('active');
        tabQuests.classList.remove('active');
        tabShop.classList.remove('active');
        tabContentInventory.style.display = '';
        tabContentQuests.style.display = 'none';
        tabContentShop.style.display = 'none';
    });

    // Shop item addition
    if (shopItemForm) {
        shopItemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('shop-item-name').value;
            const description = document.getElementById('shop-item-description').value;
            const cost = parseInt(document.getElementById('shop-item-cost').value);
            const type = document.getElementById('shop-item-type').value || 'item';
            game.addShopItem({ name, description, cost, type });
            shopItemForm.reset();
        });
    }

    // Shop tracker logic
    if (shopTrackerDiv) {
        shopTrackerDiv.innerHTML = '<p>Select an item from the shop to track your progress towards it.</p>';
    }

    // Export and Import functionality
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const exportData = {
                player: game.player,
                quests: game.quests,
                rewards: game.rewards,
                completedQuests: game.completedQuests,
                trackedShopItemId: game.trackedShopItemId
            };
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lifeisagame-data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (importFile) {
        importFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const imported = JSON.parse(evt.target.result);
                    if (imported.player && imported.quests) {
                        game.player = imported.player;
                        game.quests = imported.quests;
                        game.rewards = imported.rewards || game.rewards;
                        game.completedQuests = imported.completedQuests || [];
                        game.trackedShopItemId = imported.trackedShopItemId || null;
                        game.saveToCookies();
                        game.updateUI();
                        alert('Data imported successfully!');
                    } else {
                        alert('Invalid data file.');
                    }
                } catch (err) {
                    alert('Error importing file.');
                }
            };
            reader.readAsText(file);
        });
    }

    // Auto-save every 30 seconds
    setInterval(() => {
        game.saveToCookies();
    }, 30000);

    // Live clock update
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockDiv.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
});

// Add shop tracker state to GameState
GameState.prototype.trackedShopItemId = null;

GameState.prototype.addShopItem = function(item) {
    const newId = this.rewards.length ? Math.max(...this.rewards.map(r => r.id)) + 1 : 1;
    this.rewards.push({ id: newId, ...item });
    this.saveToCookies();
    this.updateUI();
};

// Update rewards to allow tracking
GameState.prototype.updateRewards = function() {
    const container = document.getElementById('rewards-list');
    container.innerHTML = '';
    this.rewards.forEach(reward => {
        const rewardDiv = document.createElement('div');
        rewardDiv.className = `reward-item ${this.player.coins >= reward.cost ? 'affordable' : ''}`;
        rewardDiv.innerHTML = `
            <div class="reward-name">${reward.name}</div>
            <div class="reward-description">${reward.description}</div>
            <div class="reward-cost">${reward.cost} coins</div>
            <button class="btn btn-secondary" data-track-id="${reward.id}">Track</button>
        `;
        if (this.player.coins >= reward.cost) {
            rewardDiv.addEventListener('click', (e) => {
                if (e.target && e.target.matches('button[data-track-id]')) return;
                this.purchaseReward(reward.id);
            });
        }
        // Track button
        rewardDiv.querySelector('button[data-track-id]').addEventListener('click', (e) => {
            e.stopPropagation();
            this.trackedShopItemId = reward.id;
            this.updateShopTracker();
        });
        container.appendChild(rewardDiv);
    });
    this.updateShopTracker();
};

GameState.prototype.updateShopTracker = function() {
    const trackerDiv = document.getElementById('shop-tracker');
    if (!trackerDiv) return;
    if (!this.trackedShopItemId) {
        trackerDiv.innerHTML = '<p>Select an item from the shop to track your progress towards it.</p>';
        return;
    }
    const item = this.rewards.find(r => r.id === this.trackedShopItemId);
    if (!item) {
        trackerDiv.innerHTML = '<p>Tracked item not found.</p>';
        return;
    }
    const percent = Math.min(100, Math.round((this.player.coins / item.cost) * 100));
    trackerDiv.innerHTML = `
        <div><strong>${item.name}</strong></div>
        <div>${item.description}</div>
        <div>Cost: ${item.cost} coins</div>
        <div>Current coins: ${this.player.coins}</div>
        <div class="progress-bar" style="margin-top:10px;">
            <div class="progress-fill" style="width:${percent}%;"></div>
        </div>
        <div>${percent}% complete</div>
    `;
};

// Export for potential future modules
window.LifeGame = GameState;
