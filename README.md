# Brainhackaaa
HI This project is related to health so be take it seriously sometimes , lives matters.
Hi first you will need to download the 4-5 codes files that i am going to be sharing . install them in vs code.
Its made of ts ; transcript and js files . just open them in the vs code , open terminal and get into the root folder and then write bun run index.js . 
our server is now live and connected to the firebase , which is a database , our Gemini API is running . so now you will need a way to checkl if the api is working as intended or not ,install postman and paste : http://localhost:3000/api/suggest . choose POST instead of get and in body select json .

now in the drop down write your condition like : {
  "condition": "heart"
  
}
 and send . you will get the outcome by AI telling you doctors available for your condition . as well as the api will also tell the queue line there is .



 if you are wondering how API gets data of the doctors , I made an Google Form for doctors " https://docs.google.com/forms/d/e/1FAIpQLSdDgd0PGOnIF2WvwW569aOGNZFm2D8BfqloxbjKc1B7kAE7UA/viewform?usp=header " in which they can fill in the info and then that data is connected to the spreadsheet which is then linked to the firebase database and only only after than OUr GEmini API is able to fetch doctor data so easily .

 if you guys wanna see the lst end product lemme share one prototype: https://doc-gemini-match.lovable.app   
 just be sure to enter some texts like heart , ear and scroll down to see doctors .
