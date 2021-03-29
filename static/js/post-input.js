const input_field = document.getElementById('food-to-search');


// const postData = () => {
//     const text = document.getElementById("food-to-search").value;
//     fetch('/post', {
//         method: "POST",
//         credentials: "include",
//         body: JSON.stringify({text: text}),
//         cache: "no-cache",
//         headers: new Headers({
//             "content-type": "application/json"
//         })
//     }).then((response) => {
//         if (response.status !== 200) {
//             console.log('NOT FOUND FOOD');
//             return;
//         }
//         response.json().then((data) => {            
//             appendReceivedData(data);
//         })
//     })
// };

// function appendReceivedData(data) {
//     var element = document.getElementById("column");
//     var div = document.createElement('div');
//     const keys = Object.keys(data);
    
//     div.className = "search-box"

//     for (let index = 0; index < keys.length; index++) {
//         var div_ = document.createElement('div');
//         if (keys[index] !== 'img') {
//             div_.innerHTML += `${keys[index]}: `;
//         }
//         div_.innerHTML += data[keys[index]];
//         div.appendChild(div_);   
//     }
//     element.appendChild(div);
// }

// input_field.addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//       postData();
//     }
//   });

const inputHandler = function(e) {
    to_search = e.target.value;
    fetch('/get_known_food', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({text: to_search}),
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
            console.log(data['result']);
            if (data['result'] !== FOUND) {   
                prev_search = document.querySelector('[removable]');
                while (prev_search) {
                    prev_search.remove()
                    prev_search = document.querySelector('[removable]');
                }            
                handleResponse(data['result']);
                FOUND = data['result'];
            }
        })
    })
    
};

var FOUND = false;

function handleResponse(response) {
    var element_ = document.getElementById("column");

    if (response) {
        var i = 2;
        response.forEach(element => {
            var div = document.createElement('div');
            div.className = 'found';
            div.setAttribute('removable', 'true');
            div.setAttribute('tabindex', i);
            div.innerHTML += element;
            element_.appendChild(div);
            i ++;
        });
    }
}

input_field.addEventListener('input', inputHandler);
input_field.addEventListener('propertychange', inputHandler);