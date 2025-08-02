# LifeisaGame
This is an attempt to gamify my life in a basic sense. 

## Goals for v1

- ✅ A set of cookies that store quests completed, stats, objects, so on and so forth
- ✅ A way to dynamically generate quests - hopefully with an AI that can push us a bit with some of the weekly quests and keeping track of key chores to vary the daily quests to keep up with covering all the chores and slowly ramping the overall amount of work over the course of the months
- ✅ Basic UI
- ✅ Reward store for certain things that would make me happy 
- ✅ Stretch goals and plans that the quests would work towards

## Project Structure

```
LifeisaGame/
├── index.html          # Main HTML file with game interface
├── styles.css          # CSS styling with game-like aesthetics
├── script.js           # JavaScript game logic and state management
├── package.json        # Project dependencies and scripts
└── README.md          # This file
```

## Features Implemented

### Core Game Mechanics
- **Player Progression**: Level system with XP and coins
- **Quest System**: Daily, weekly, and stretch goal quests
- **Reward Store**: Purchasable rewards using earned coins
- **Inventory System**: Track purchased rewards
- **Data Persistence**: All progress saved in browser cookies

### Quest Types
- **Daily Quests**: Simple tasks that refresh daily (exercise, read, clean, etc.)
- **Weekly Quests**: More complex tasks that refresh weekly (deep cleaning, meal planning, etc.)
- **Stretch Goals**: Long-term objectives with progress tracking

### UI Features
- Responsive design that works on desktop and mobile
- Beautiful gradient backgrounds and smooth animations
- Modal dialog for adding custom quests
- Achievement notifications
- Progress tracking for stretch goals

## Getting Started

### Option 1: Simple Setup (Just open the HTML file)
1. Open `index.html` in your web browser
2. Start completing quests to earn XP and coins!

### Option 2: Development Server
1. Install Node.js if you haven't already
2. Run the following commands:
   ```bash
   npm install
   npm start
   ```
3. The game will open in your browser at `http://localhost:3000`

## How to Play

1. **Complete Quests**: Click on any quest to mark it as completed
2. **Earn Rewards**: Use XP to level up and coins to buy rewards
3. **Add Custom Quests**: Click "Add Custom Quest" to create your own tasks
4. **Track Progress**: Watch your level and inventory grow
5. **Stay Consistent**: Daily and weekly quests refresh automatically

## Customization

### Adding New Rewards
Edit the `setupDefaultRewards()` method in `script.js` to add your own reward ideas.

### Modifying Quest Templates
Update the quest templates in `generateDailyQuests()` and `generateWeeklyQuests()` methods.

### Styling Changes
All visual styling is in `styles.css` - customize colors, fonts, and layouts to your liking.

## Future Enhancements

- **AI Integration**: Connect to AI service for dynamic quest generation
- **Social Features**: Share progress with friends
- **Advanced Analytics**: Track completion rates and patterns
- **Mobile App**: Native mobile application
- **Cloud Sync**: Synchronize data across devices
- **Achievement System**: Unlock badges and special rewards
- **Habit Tracking**: Track consistency and build streaks

## Technical Details

- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data Storage**: Browser cookies (no server required)
- **Responsive**: Mobile-friendly design
- **Performance**: Optimized for smooth animations and quick loading

## License

MIT License - Feel free to modify and use this project as you see fit!