# Chatbot_rentflix

![image](https://user-images.githubusercontent.com/73299948/170813024-81bf541b-c43d-4159-bec0-1657ed9c0646.png)




It is a chatbot application which was developed under the minor project. This chatbot was developed for our Ott rental website called as 'Rentflix'. The website provides the platform as a service, and through this website one can rent the OTT platforms like netflix, amazon prime, hotstar etc, on custom plans and also one can give their OTT accounts on rent via our website. The Chatbot was developed for a better customer experience and customer support.

## About the chatbot in brief

This is a chatbot that uses deep learning . Any user may ask questions regarding the website  But there are many ways to frame the same question and it's impossible to hard-code each exact phrasing of the question into the code. To overcome this problem, we associate each answer with an intention. The 'Intention' is the meaning of the question. If the user phrases the same question in multiple ways, they will all be mapped to the same intention because they all have the same general meaning. Then the corresponding answer is returned.
eg. 'Hello' , 'Hi' , 'Nice to meet you' and 'Good morning' can all be mapped to the intention 'Greeting'. Then the answer for this intention is return, such as 'Nice to meet you too'. 

The model is currently trained on a small number of intents. It recognizes the intent of the user's query and gives the appropriate response. 
The chat bot is in python. Text is entered by the user as a command line argument. The python script uses a model which has been trained on many intents. Using this model, it predicts the intent of the user entered text. For each intent there is a single fixed response, which the chat bot gives.

