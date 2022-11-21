import quest 
class player:
    def __init__(self, name, level, health, maxHealth, gold, inventory, xp,questlist):
        self.name = name
        self.level = level
        self.health = health
        self.maxHealth = maxHealth
        self.gold = gold
        self.inventory = inventory
        self.xp = xp
        self.questlist = questlist
    def __str__(self):
        return self.name + " " + str(self.level) + " " + str(self.health) + " " + str(self.maxHealth) + " " + str(self.gold) + " " + str(self.inventory)
    def createPlayer(name, level, health, maxHealth, gold, inventory):
        return player(name, level, health, maxHealth, gold, inventory)
    def addxp(amount):
        self.xp += amount
    def removexp(amount):
        self.xp -= amount
    def addItem(item):
        self.inventory.append(item)
    def removeItem(item):
        self.inventory.remove(item)
    def addGold(amount):
        self.gold += amount
    def removeGold(amount):
        self.gold -= amount
    def addHealth(amount):
        self.health += amount
    def removeHealth(amount):
        self.health -= amount
    def addMaxHealth(amount):
        self.maxHealth += amount
    def removeMaxHealth(amount):
        self.maxHealth -= amount
    def addLevel(amount):
        self.level += amount
    def removeLevel(amount):
        self.level -= amount
    def add_questRewards(quest):
        self.gold += quest.reward
        self.xp += quest.xp
    def add_quest(quest):
        self.questlist.append(quest)