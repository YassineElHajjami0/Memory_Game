setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
}, 5000)

document.querySelector(".favorite").onfocus = (e) => {
    document.querySelector(".favorite").value = "i don't care";
}

document.querySelector(".btn-start").onclick = () => 
{
    if(document.querySelector(".favorite").value !== "i don't care" && document.querySelector(".favorite").value !== "") {
        document.querySelector(".idonotcare").style.top = "0%";
        setTimeout(() => {
            window.location.reload();
        },1000)
    }
    let name = document.querySelector(".start-input").value;
    if (name == null || name == "") {
        document.querySelector(".player-name").innerHTML = "Unknown";
    }
    else {
        document.querySelector(".player-name").innerHTML = name;
    }
    document.querySelector(".instart").style.display = "none";
}

let duration = 500;

let blocks = document.querySelector(".blocks-container");
let blocksArr = Array.from(blocks.children);
let orderRange = [...Array(blocksArr.length).keys()];

console.log(orderRange);
shuffling(orderRange);
console.log(orderRange);

blocksArr.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', () => { flipblock(block) })
})

//shuffling
function shuffling(array) {
    let current = array.length,
    temp ,
    random ;
    while(current > 0)
    {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
console.log("blocks => ",blocksArr);
//flip block 
function flipblock(block)  {
    block.classList.add('is-flipped');
    let flippedblocks = blocksArr.filter(flipped => flipped.classList.contains('is-flipped'));
    
    if (flippedblocks.length == 2) {
        console.log("flipped",flippedblocks);
        stopClicking();
        if (flippedblocks[0].dataset.coffee === flippedblocks[1].dataset.coffee) {
            console.log("congratulation");
            flippedblocks[0].classList.add('has-match');
            flippedblocks[1].classList.add('has-match');
        }
        else {
            let num = parseInt(document.querySelector(".triesCounter").innerHTML) + 1
            document.querySelector(".triesCounter").innerHTML = num.toString();
        }
        setTimeout(()=> {
            flippedblocks.map((e) => e.classList.remove('is-flipped'));
        }, duration);
    }
    checkfinish();
}

function stopClicking() {
    console.log("running");
    blocks.classList.add('no-clicking');
    setTimeout(()=> {
        blocks.classList.remove('no-clicking');
    }, duration)
}

function checkfinish() {
    let matched = blocksArr.filter(e => e.classList.contains('has-match'));
    console.log("--------->", matched.length);
    if(matched.length === blocksArr.length) {
        console.log("blocksarr len => ",blocksArr.length); 
        console.log("matched => ", matched.length);
        document.querySelector(".wrongTries").innerHTML = document.querySelector(".triesCounter").innerHTML;
        document.querySelector(".congratulation").style.top = "0";
        setTimeout(() => {
            let collection = document.querySelector(".stars").children;
            console.log("collection => ", collection);
            if(parseInt(document.querySelector(".triesCounter").innerHTML) === 10) {
                collection[0].classList.add("icon-star-full");
                collection[1].classList.add("icon-star-full");
                collection[2].classList.add("icon-star-full");
                collection[3].classList.add("icon-star-full");
                collection[4].classList.add("icon-star-full");
            } else if (parseInt(document.querySelector(".triesCounter").innerHTML) < 15) {
                collection[0].classList.add("icon-star-full");
                collection[1].classList.add("icon-star-full");
                collection[2].classList.add("icon-star-full");
                collection[3].classList.add("icon-star-full");
            } else if (parseInt(document.querySelector(".triesCounter").innerHTML) < 25) {
                collection[0].classList.add("icon-star-full");
                collection[1].classList.add("icon-star-full");
                collection[2].classList.add("icon-star-full");
            } else if (parseInt(document.querySelector(".triesCounter").innerHTML) < 35) {
                collection[0].classList.add("icon-star-full");
                collection[1].classList.add("icon-star-full");
            } else {
                collection[0].classList.add("icon-star-full");
            }
        }, 1000)
    }
}

document.querySelector(".restart").onclick = () => {
    window.location.reload();
}
/*     document.querySelector(".congratulation").style.top = "-100%";
    blocksArr.map(e => e.classList.remove("has-match"));
    document.querySelector(".triesCounter").innerHTML = 0;
    shuffling(orderRange); */