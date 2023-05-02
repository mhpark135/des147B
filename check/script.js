
async function getData(){
    const myMoods = await fetch ('data/mood.json');
    const data = await myMoods.json();
    globalData = data;
    // console.log(data);
    // document.querySelector('#moods').innerHTML = outputHTML(data);
    document.querySelector('nav ul').innerHTML = createButtons(data);

    createEvents();
}

function outputHTML(data){
    const feeling = ['God Bless the Child', 'That’s Life',  'One Step Ahead', '(I Love You) For Sentimental Reasons', 'Put Your Head On My Shoulder', 'Take Five','But Not For Me - Vocal Version','Fly Me To The Moon (In Other Words)'];
    let html = document.querySelector(".artist");
    html += `At ${data.point2.time} I was listening to ${feeling[data.point2.mood]} because of ${data.point2.reason}`;
    html += document.querySelector('.artist');
    return html;
}

function createButtons(data){
    let html = ''
    // convert the main object keys into an array
    const dataPoints = Object.keys(data);
    console.log(dataPoints);
    dataPoints.forEach(function(eachPoint){
        html +=  `<li><button id="${eachPoint}">${eachPoint}</button></li>`;    
    })
    return html;
}

function createEvents(){
    const buttons = document.querySelectorAll('button');
    //console.log(buttons) 

    for (const button of buttons){
        button.addEventListener('click', function(event){
            const id = event.target.id; 
            // console.log(id)
            updateInterface(id, globalData);
        })
    }
}

function updateInterface(value, jsonData){
    console.log(value);
    const feeling = ['God Bless the Child', 'That’s Life',  'One Step Ahead', '(I Love You) For Sentimental Reasons', 'Put Your Head On My Shoulder', 'Take Five','But Not For Me - Vocal Version','Fly Me To The Moon (In Other Words)'];
    let text = '<p>';
    let imgs = '';
    text += `At ${jsonData[value].time} I was listening to ${feeling[jsonData[value].mood]}, sung by ${jsonData[value].reason}`;
    text += '</p>';
    if (jsonData[value].hasOwnProperty('images')){
        for (let i=0; i<jsonData[value].images.length; i++ ){
            console.log(jsonData[value].images[i]);
                imgs += `<img src="${jsonData[value].images[i]}"  alt="image">`
        }
    } else {
        imgs = '';
    }
    document.querySelector('#result').innerHTML = text;
    document.querySelector('#images').innerHTML = imgs;
    
}
getData();