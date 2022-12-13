import questgenerator

class Player: 
    def __init__(self, name, quest):
        self.name = name
        self.quest = [quest]
        self.completedQuests = []
    def __str__(self):
        return self.name + "\n" + self.quest.__str__()
    def addQuest(self, quest):
        self.quest.append(quest)
    def viewQuests(self):
        for quest in self.quest:
            print(quest)
    def viewCompletedQuests(self):
        for quest in self.completedQuests:
            print(quest)