let dislike = document.querySelector('.imgd');
const URL = 'http://localhost:3000/'
let user = [];
let comment = 1;
let getData = async (URL) => {
    const res = await fetch(URL)
    const data = await res.json()
    return data
}

const fillList = (user) => {
    let list = document.querySelector('.container')
    list.insertAdjacentHTML(`beforeend`, `
    <div class="save"><span>Сохранить</span></div>
    <div class="post"></div>
    <div class="reactions">
        <div class="likes">
            <div class="imgl"></div>
            <span class="lspan">${user["likes"]}</span>
        </div>
        <div class="dislikes">
            <div class="imgd"></div>
            <span class="dspan">${user["dislikes"]}</span>
        </div>
    </div>
    <div class="comments">
        ${user["comments"]}
    </div>
   `)
}

let get = async () => {
    for (let i = 1; i <= 1; i++) {
        user.push(await getData(`${URL}user${i}`))
        fillList(user[i - 1])
    }
    setTimeout(() => {
        document.querySelector('.likes').addEventListener('click', ()=>{
            document.querySelector('.lspan').innerHTML = Number(document.querySelector('.lspan').innerHTML) + 1 
        });
        document.querySelector('.dislikes').addEventListener('click', ()=>{
            document.querySelector('.dspan').innerHTML = Number(document.querySelector('.dspan').innerHTML) + 1 
        });
        document.querySelector('.post').addEventListener('click', ()=>{
            document.querySelector('.comments').insertAdjacentHTML(`beforeend`, `<div class="comment" id="comment${comment}"><span contenteditable="true">${prompt('Введите комментарий')}</span></div>`)
        })
        document.querySelector('.save').addEventListener('click', async () => {
            await patchData(`${URL}user1`, { "likes": document.querySelector('.lspan').innerHTML})
            await patchData(`${URL}user1`, { "dislikes": document.querySelector('.dspan').innerHTML})
            await patchData(`${URL}user1`, { "comments": document.querySelector('.comments').innerHTML})
        })        
    }, 50);
}; 

get();

let patchData = async (url, obj) => {
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    return res.json();
}

// dislike.addEventListener('click', console.log('dislike'));