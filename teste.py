from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

chatbot = ChatBot('MeuBot')
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.portuguese")

while True:
    try:
        user_input = input("Você: ")
        response = chatbot.get_response(user_input)
        print("Bot:", response)
    except (KeyboardInterrupt, EOFError):
        break