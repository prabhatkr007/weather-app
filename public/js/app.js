console.log('Client side javascript file is loaded!')

//http://localhost:3000/weather?address=boston

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='From  java script'
weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    fetch('/weather?address='+location ).then((response)=>
{
    
response.json().then((data)=>
{
    if (data.error)
    {
        messageOne.textContent=data.error
    }
    else{
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + location + "')";
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
   
    }
}
)
})
   
}) 