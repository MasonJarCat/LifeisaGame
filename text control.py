import player as p, questgenerator as q

mason = p.Player("mason", q.Quest("drink water", "drink half of your water"))
while(True): 
    action = input("What do you want to do? 1. add quest 2. complete quest 3. view quests 4. view completed quests 5. view player 6. exit")
    if(action == "1"):
        name = input("What is the name of the quest?")
        description = input("What is the description of the quest?")
        mason.addQuest(q.Quest.createQuest(name, description))
    elif(action == "2"):
        name = input("What is the name of the quest you want to complete?")
        mason.completeQuest(name)
    elif(action == "3"):
        mason.viewQuests()
    elif(action == "4"):
        mason.viewCompletedQuests()
    elif(action == "5"):
        print(mason)
    elif(action == "6"):
        break
    