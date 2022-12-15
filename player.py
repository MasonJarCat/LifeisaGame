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
    def completeQuest(self, name):
        for quest in self.quest:
            if(quest.name == name):
                self.completedQuests.append(quest)
                questgenerator.Quest.setComplete(quest)
                self.quest.remove(quest)
                print("Quest completed!")
                break
            else:
                print("Quest not found!")