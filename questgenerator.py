#quest generator 
#by: @Mason 
#version: 0.1
#date: 11/21/2022
#description: this program will generate a quest for a player to complete
class Quest:
    questNames = ["drink water", "eat food","walk around" ]
    questDescriptions = ["drink half of your water", "eat food at urban", "walk around the hall"]
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.complete = False

    def __str__(self):
        return self.name + ": " + self.description 
    def createRandomQuest():
        num = random.randint(0, len(questNames))
        name = questNames[num]
        description = questDescriptions[num]
        return Quest(name, description)
    def createQuest(name, description):
        return Quest(name, description)
    def setComplete(self):
        self.complete = True
    
