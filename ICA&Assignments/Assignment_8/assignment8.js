const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was a somber night in :inserty:. :insertx: was lamenting the fact he :insertz:. He went to the doctor last week and found out he weighs 300 pounds. But frankly, :insertx: didn't care that much one way or another. He was unquestionably a stupid man, and he knew it, almost embracing it as a character trait. Utilizing his one and only skill, :insertx: made a hotdog. He was really quite good at making hotdogs. He always had been since he :insertz:. But that trauma fueled :insertx:. Not to become a better man mind you, but to commit to a life of mediocrity and hotdogs. In his mind, hotdogs kept him alive. They were one of the few concepts that fit into his oversized head. They had supported him far more than the government, his friends, or even his family ever had. :insertx: grinned happily at the browned beef sticks he cooked so well. Then the :inserty: erupted into flames and exploded horribly. :insertx: was cooking hotdogs on a 94 fahrenheit day, failing to check for a gas-leak. Poor, stupid :insertx:. He was killed instantly, teleported from one plane of existence to another in a split-second. Nobody came for a body, his existense was by all means futile and meaningless. But it had value, atleast to :insertx:. And now, to you too...";
const insertX = ['Dave, your old roomate,', 'George Lopez', 'Daddy P', 'Long John Willy', 'Albert','your Dad']; //People
const insertY = ["Dick's Sporting Goods", "Aligator Dave's Petting Zoo", 'Boulder','Florida','the lion pit','Walmart'];//Locations
const insertZ = ['fell asleep on the job', 'threw up at his 5-year-old birthday party', 'ate that gas-station sandwich', 'had failed to live up to his father\s expectations'];//Actions

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:',xItem);
  newStory = newStory.replaceAll(':inserty:',yItem);
  newStory = newStory.replaceAll(':insertz:',zItem);

  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('you', name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300*0.0714286)} stone`;
    const temperature =  `${Math.round((94-32) * 5 / 9)} centigrade`;
    newStory = newStory.replaceAll('300 pounds', weight);
    newStory = newStory.replaceAll('94 fahrenheit', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
