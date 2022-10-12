const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'It was a somber night in :inserty:. :insertx: was lamenting the fact he :insertz:. He went to the doctor last week and found out he weighs 300 pounds. But frankly, :insertX: didnt care that much one way or another. He unquestionably a stupid man, and he knew it. He was tired... and it was a hot day.';
const insertX = ['Dave, your old roomate,', 'George Lopez', 'Daddy P', 'Long John Willy', 'Albert','your Dad']; //People
const insertY = ["Dick's Sporting Goods", "Aligator Dave's Petting Zoo", 'Boulder','Florida','the lion pit','Walmart'];//Locations
const insertZ = ['fell asleep on the job', 'threw up on at his 5-year-old birthday all over carpet', 'ate that sandwich', 'had failed to live up to his father\s expectations.'];//Actions

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
    newStory = newStory.replaceAll('Bob', name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300*0.0714286)} stone`;
    const temperature =  `${Math.round((94-32) * 5 / 9)} centigrade`;
    newStory = newStory.replaceAll('94 fahrenheit', temperature);
    newStory = newStory.replaceAll('300 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
