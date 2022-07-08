const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
const check2 = document.getElementById("check2");
const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btnDesc");
const richestPeople = [
    'Jeff Bezos',
    "Elon Musk",
    "Bernard Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
];

const listItems = [];

let dragStartIndex;

createList();
// does not work
function AscSortOrder(){
   // const personName = listItem.querySelector('.draggable').innerText.trim();

    richestPeople.sort(function(a, b){return a - b});


    document.getElementById("demo").innerHTML = richestPeople; 
    
}




function sortOrder() {
    // create empty array to append the each rich person's name
    const names = [];

    listItems.forEach(item => {
        // get name of each person
        let name = item.children[1].children[0].innerText;
        // then append it to the empty array
        names.push(name);
    });

    // sort the names
    const sortedNames = names.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        return 1;
    });

    // then change update the names to the sorted names
    listItems.forEach((item, index) => {
        item.children[1].children[0].innerText = sortedNames[index];
    });
}

function sortDescOrder() {
    // create empty array to append the each rich person's name
    const names = [];

    listItems.forEach(item => {
        // get name of each person
        let name = item.children[1].children[0].innerText;
        // then append it to the empty array
        names.push(name);
    });

    // sort the names
    const sortedNames = names.sort((a, b) => {
        if (a < b) {
            return 1;
        }
        return -1;
    });

    // then change update the names to the sorted names
    listItems.forEach((item, index) => {
        item.children[1].children[0].innerText = sortedNames[index];
    });
}


// works
function createList() {
    // sorts the list in different orders each time you refresh the page.
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {

            const listItem = document.createElement('li');



            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
         <div class="draggable" draggable= "true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>     
        `;


            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListener();
}


function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');

}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
//works
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}


function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}


btn.addEventListener("click", sortOrder);
btn2.addEventListener("click", sortDescOrder);
check.addEventListener("click", checkOrder);


// second one
document.getElementById("demo").innerHTML = richestPeople;    

//check2.addEventListener("click", sortReviews);
