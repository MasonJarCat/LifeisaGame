#quest generator 
#by: @Mason 
#version: 0.1
#date: 11/21/2022
#description: this program will generate a quest for a player to complete
class Quest:
    questNames = ["drink water", "eat food" ]
    questDescriptions = ["drink half of your water", "eat food at urban"]
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __str__(self):
        return self.name + ": " + self.description 
    def createRandomQuest():
        name = random.choice(questNames)
        description = random.choice(questDescriptions)
        return quest(name, description)
    def createQuest(name, description):
        return quest(name, description)
    
