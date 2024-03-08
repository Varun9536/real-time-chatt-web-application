
const socket = io("http://localhost:8000")

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messgaeContainer = document.querySelector(".container")

var audio = new Audio("misc/ring.mp3")


const append = (message , position)=>
{
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messageElement.classList.add("message")
    messageElement.classList.add(position)
    messgaeContainer.append(messageElement)
    

    if(position == "left")
    {
        audio.play()

    }

}

form.addEventListener("submit" , (e)=>
{
    e.preventDefault();
    const message = messageInput.value;
    append(` You : ${message}` , "right")
    socket.emit("send" , message);
    messageInput.value = ""
})



// when some one want to join the chatt  , user provide its name
const name = prompt("enter your name to join")
socket.emit("new-user-joined" , name)


// when someone joined the chatt  others get message
socket.on("user-joined" , name =>
{
    append(`<< ${name} joined the chatt >> ` , "left")
})

socket.on("receive" , data =>
{
    append(`${data.name} : ${data.message}` , "left")

})

socket.on("left" , name =>
{
    append(` [ ${name} left the chatt ] ` , "left")
})