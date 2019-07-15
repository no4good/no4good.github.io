let arr = [];
let count = 10;
const url = 'https://api.myjson.com/bins/152f9j';
fetch(url)
    .then(res => res.json())
    .then(data => {
        const rawData = data.data; //res.json.data

        return rawData.map((post, i) => {

            let createdAt = post.createdAt;
            description = post.description;
            img = post.image;
            tags = post.tags;
            title = post.title;
            arr.push({
                createdAt,
                description,
                img,
                tags,
                title
            });
            if (i < 10) {
                let div = document.body.appendChild(document.createElement("div"));
                div.innerHTML = `<img src=${img}> <br> ${title} <br>  ${description} <br>  Tags: ${tags} <br>  <span>${createdAt}</span> <br>
                <button onclick="removeButton(this)">Delete post</button>`;
            }
        })
    })
    .then(() => {
        let btnfirstTen = document.createElement("button");
        document.body.appendChild(btnfirstTen);
        btnfirstTen.setAttribute('class', 'btnfirstTen');
        btnfirstTen.innerHTML = 'Go to the first 10 post';
        btnfirstTen.onclick = FirstTen;
    })
    .catch((error) => {
        console.log(JSON.stringify(error));
    });

function NextTen() {
    if (document.getElementsByTagName('div').length !== arr.length) {
        for (let i = 0; i < 10; i++) {
            if (count == arr.length) {
                return 0;
            }
            let div = document.body.appendChild(document.createElement("div"));
            div.innerHTML = `<img src=${arr[count]["img"]}> <br> ${arr[count]["title"]} <br> 
   ${arr[count]["description"]} <br> Tags: ${arr[count]["tags"]} <br>  <span>${arr[count]["createdAt"]}</span> <br>
    <button  onclick="removeButton(this)">Delete post</button>`;
            count += 1;

        }

    }
}


window.onscroll = function () {
    let elpos = document.getElementsByTagName("div").length - 1;
    let ellast = document.getElementsByTagName("div")[elpos];

    if (document.documentElement.scrollTop + window.innerHeight > ellast.offsetTop &&
        document.documentElement.scrollTop - ellast.offsetTop < ellast.clientHeight) {
        NextTen();

        if (document.getElementsByTagName("div").length > 10) {
            document.getElementsByClassName('btnfirstTen')[0].style.visibility = "visible";
        }
    }

}

function FirstTen() {
    scroll(0, 0);
    for (let i = document.getElementsByTagName("div").length - 1; i > 9; i--) {
        document.getElementsByTagName("div")[i].remove();
    }
    document.getElementsByClassName('btnfirstTen')[0].style.visibility = "hidden";
    count = 10;
}

function removeButton(btn) {
    ((btn.parentNode).parentNode).removeChild(btn.parentNode);
    if (document.getElementsByTagName('div').length + 1 !== arr.length) {
        console.log("sds");
        let div = document.body.appendChild(document.createElement("div"));
        div.innerHTML = `<img src=${arr[count]["img"]}> <br> ${arr[count]["title"]} <br> 
   ${arr[count]["description"]} <br>  Tags:${arr[count]["tags"]} <br>  <span>${arr[count]["createdAt"]}</span> 
    <br> <button  onclick="removeButton(this)">Delete post</button>`;
    }
    arr = arr.filter(post => post.createdAt !== btn.parentNode.getElementsByTagName('span')[0].innerHTML);
}

function sortAsc() {
    let len = document.getElementsByTagName("div").length;
    arr.sort(function (a, b) {
        return a.createdAt.split('-')[0] - b.createdAt.split('-')[0];
    });
    for (let i = 0; i < len; i++) {
        document.getElementsByTagName("div")[0].remove();
    }
    for (let i = 0; i < len; i++) {
        let div = document.body.appendChild(document.createElement("div"));
        div.innerHTML = `<img src=${arr[i]["img"]}> <br> ${arr[i]["title"]} <br> 
       ${arr[i]["description"]} <br>  Tags:${arr[i]["tags"]} <br>  <span>${arr[i]["createdAt"]}</span> 
        <br> <button  onclick="removeButton(this)">Delete post</button>`;
    }
}

function sortDesc() {
    let len = document.getElementsByTagName("div").length;
    arr.sort(function (a, b) {
        return b.createdAt.split('-')[0] - a.createdAt.split('-')[0];
    });
    for (let i = 0; i < len; i++) {
        document.getElementsByTagName("div")[0].remove();
    }
    for (let i = 0; i < len; i++) {
        let div = document.body.appendChild(document.createElement("div"));
        div.innerHTML = `<img src=${arr[i]["img"]}> <br> ${arr[i]["title"]} <br> 
       ${arr[i]["description"]} <br> Tags:${arr[i]["tags"]} <br>  <span>${arr[i]["createdAt"]}</span> <br>
         <button  onclick="removeButton(this)">Delete post</button>`;
    }
}