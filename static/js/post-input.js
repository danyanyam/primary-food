const postbtn = document.getElementById('search-btn');
const input_field = document.getElementById('food-to-search');

const postData = () => {
    const text = document.getElementById("food-to-search").value;
    fetch('/post', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({text: text}),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then((response) => {
        if (response.status !== 200) {
            console.log('NOT FOUND FOOD');
            return;
        }
        response.json().then((data) => {            
            appendReceivedData(data);
        })
    })
};

function appendReceivedData(data) {
    var element = document.getElementById("column");
    var div = document.createElement('div');
    const keys = Object.keys(data);
    
    div.className = "search-box"

    for (let index = 0; index < keys.length; index++) {
        var div_ = document.createElement('div');
        if (keys[index] !== 'img') {
            div_.innerHTML += `${keys[index]}: `;
        }
        div_.innerHTML += data[keys[index]];
        div.appendChild(div_);   
    }
    element.appendChild(div);
}

input_field.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      postData();
    }
  });
postbtn.addEventListener('click', postData);