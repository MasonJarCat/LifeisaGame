#quest generator 
#by: @Mason 
#version: 0.1
#date: 11/21/2022
#description: this program will generate a quest for a player to complete
class quest:
    questNames = ["drink water", "eat food" ]
    questDescriptions = ["drink half of your water", "eat food at urban"]
    questRewards = ["1000 gold", "500 gold"]
    difficulty = ["easy", "medium", "hard"]
    def __init__(self, name, description, reward, difficulty, xp):
        self.name = name
        self.description = description
        self.reward = getReward(difficulty)
        self.difficulty = difficulty
        self.xp = getXP(difficulty)

    def __str__(self):
        return self.name + " " + self.description + " " + self.reward + " " + self.difficulty
    def createRandomQuest():
        name = random.choice(questNames)
        description = random.choice(questDescriptions)
        reward = random.choice(questRewards)
        difficulty = random.choice(questDifficulties)
        return quest(name, description, reward, difficulty)
    def createQuest(name, description, reward, difficulty):
        return quest(name, description, reward, difficulty)
    def getReward(difficulty):
        if difficulty == "easy":
            return 1000
        elif difficulty == "medium":
            return 2000
        elif difficulty == "hard":
            return 3000
        else:
            return 0
    def getXP(difficulty):
        if difficulty == "easy":
            return 100
        elif difficulty == "medium":
            return 200
        elif difficulty == "hard":
            return 300
        else:
            return 0