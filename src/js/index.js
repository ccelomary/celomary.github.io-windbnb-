class Stay {
    constructor(title, photo, rating, type, beds, superHost)
    {
        this.title = title;
        this.photo = photo;
        this.rating = rating;
        this.type = type;
        this.beds = beds;
        this.isSuper = superHost;
    }
    render(){
        const element = document.createElement('div', {
            className: 'stay'
        });
        element.innerHTML = `                <div class="stay-image">
        <img src="${this.photo}">
    </div>
    <div class="info">
        <p class="rooms">${(this.isSuper) ? "<span class=\"super-host\">SUPER HOST</span>":""}${this.type}${(this.beds) ? ' . ' + this.beds + ' beds': ''}</p>
        <p class="rating"><span class="material-icons">star</span> <span class="rate">${this.rating}</span></p>
    </div>
    <p class="title">${this.title}</p>`;
        return element;
    }
}

let adultValue = 0;
let childrenValue = 0;
const maxWidth700 = window.matchMedia('(max-width:700px)');
let isOpen = false;

async function getAllData() {
    const res  = await fetch('../../data/stays.json');
    const data = await res.json();
    return (data);
}

const renderData = (data)=>{
    const stays = document.querySelector('.stays');
    stays.innerHTML = '';
    document.querySelector('.top-content > p').textContent = ((data.length > 12) ? '12+' : data.length) + ' stays';
    for (const element of data)
    {
        stays.appendChild((new Stay(element.title,
            element.photo,
            element.rating,
            element.type,
            element.beds,
            element.superHost)).render());
    }
}


const PlaceRender = (city, country)=>{
    const element = document.createElement('p');
    element.setAttribute('class', 'place-render');
    element.innerHTML = `<span class='material-icons'>room</span><span class='place-text'>${city}, ${country}</span>`;
    return (element);
}
const guestTemplate = (type, subText, value)=>{
    return `<div class='guest-sub'>
        <h2>${type}</h2>
        <p>${subText}</p>
        <div class='range'>
            <div class='square square-${type.toLowerCase()}-remove'>
               <span class='material-icons'>remove</span>
            </div>
            <span class="number number-${type.toLowerCase()}">${value}</span>
            <div class='square square-${type.toLowerCase()}-add'>
            <span class="material-icons">add</span>
        </div>
        </div>
    </div>`;
}
const GuestRender = ()=>{
    const element = document.createElement('div');
    element.innerHTML += `${guestTemplate('Adult', 'Age 13 or above', adultValue)}
    ${guestTemplate('Children','ages 2-12', childrenValue)}`;
    return (element);
}

const createDetailedApp = () => {
    const element = document.createElement('div');
    const leftElement = document.createElement('div');
    const rightElement = document.createElement('div');
    leftElement.setAttribute('class', 'left-element-search');
    rightElement.setAttribute('class', 'right-element-search');
    element.setAttribute('class', 'detail-search');
    element.appendChild(leftElement);
    element.appendChild(rightElement);
    return (element);
}

const openSearch = ()=> {
    const search = document.querySelector('.upper-search');
    if (!isOpen)
        search.appendChild(createDetailedApp());
    search.parentElement.classList.add('w-click');
    search.style.position = 'absolute';
    search.style.left = 0;
    search.style.top = 0;
    search.style.width = '100%';
    isOpen = true;
    if (maxWidth700.matches) {
        search.children[0].style.width = '100%';
        search.children[0].style.marginLeft = 'auto';
        search.children[0].style.marginRight = 'auto';
        search.children[0].style.flexDirection = 'column';
        search.style.minHeight = '600px';
        search.children[0].style.width = '85%';
    }
    else {
        search.children[0].style.width = '70%';
        search.children[0].style.marginLeft = 'auto';
        search.children[0].style.marginRight = 'auto'; 
        search.style.minHeight = '432px';
    }
    search.children[0].style.width = '70%';
    search.children[0].style.marginLeft = 'auto';
    search.children[0].style.marginRight = 'auto';
    search.style.zIndex = 5;
    search.children[0].style.marginTop = '93px';
    search.style.backgroundColor = '#fff';
    search.style.top = '5px';
    for (const child of search.children[0].children)
    {
        if (maxWidth700.matches)
        {
            child.style.width = '100%';
            child.children[0].style.display = 'block';
        }
        else
        {
            child.style.width = '42.5%';
            child.children[0].style.display = 'block';
        }
    }
    if (!maxWidth700.matches)
    {
        search.children[0].children[2].innerHTML = `<p><span class="material-icons">search</span><span class="search-word">search</span></p>`;
        search.children[0].children[2].style.marginLeft = 'auto';
        search.children[0].children[2].style.width = '15%';
        search.children[0].children[2].style.marginRight = 'auto';
        search.children[0].children[2].children[0].setAttribute('class', 'search-button-clicked');
    }
    else
    {
        search.children[0].children[2].style.display = 'none';
        const searchBar = document.createElement('p');
        searchBar.setAttribute('class', 'phone-search')
        searchBar.innerHTML = '<span class="material-icons">search</span><span class="search-word">search</span>';
        search.appendChild(searchBar);
        document.querySelector('.phone-search').addEventListener('click', ()=>{
            SearchButtonLogic();
        });
    }
}

const closeSearch = () =>{
    const search = document.querySelector('.upper-search');
    const detailSearch = document.querySelector('.detail-search');
    detailSearch.innerHTML ='';
    detailSearch.remove();
    search.parentElement.classList.remove('w-click');
    search.style.position = 'initial';
    search.style.width = 'initial';
    search.style.minHeight = 'initial';
    isOpen = false;
    search.children[0].style.marginLeft = 'initial';
    search.children[0].style.marginRight = 'initial';
    if (maxWidth700.matches)
    {
        search.children[0].style.marginTop = '52px';
        search.children[0].style.width = '90%';
        search.children[0].style.marginLeft = 'auto';
        search.children[0].style.marginRight = 'auto';
        search.children[0].style.flexDirection = 'row';
    }
    else
    {
        search.children[0].style.marginTop = 'initial';
        search.children[0].style.width = 'initial';
        search.children[0].style.marginLeft = 'initial';
        search.children[0].style.marginRight = 'initial';
    }
    search.style.zIndex = 0;
    search.style.backgroundColor = 'transparent';
    search.style.top = 'initial';
    for (const child of search.children[0].children)
    {
        if (!maxWidth700.matches)
        {
            child.style.width = '150px';
            
        }
        else
        {
            child.style.width = '45%';
            //child.style.padding = '5px 10px';
        }
        child.style.border = 'none';
        child.style.borderRadius = '0';
    }
    search.children[0].children[0].children[0].style.display = 'none';
    search.children[0].children[0].style = 'border-right: 2px solid rgba(0, 0, 0, 0.1)';
    search.children[0].children[1].style = 'border-right: 2px solid rgba(0, 0, 0, 0.1)';
    search.children[0].children[1].children[0].style.display = 'none';
    search.children[0].children[2].innerHTML = `<span class="material-icons">search</span>`;
    if (maxWidth700.matches) {
        search.children[0].children[2].style.display = 'block';
    }
    if (maxWidth700.matches)
    {
        document.querySelector('.phone-search').remove();
    }
    search.children[0].children[2].style.marginLeft = 'initial';
    search.children[0].children[2].style.marginRight = 'initial';
    search.children[0].children[2].style.width = 'initial';
    search.children[0].children[2].children[0].classList.remove('search-button-clicked');
}

async function SearchButtonLogic() {
    const data = await getAllData();
    const d = document.querySelector('.location-input > input[type="text"]').value;
    const s = d.split(', ').join(',').split(',').join(' ').toLowerCase();
    console.log(s);
    const toRender = data.filter(element => {
        return (`${element.country.toLowerCase()} ${element.city.toLowerCase()}`.includes(s) || `${element.city.toLowerCase()} ${element.country.toLowerCase()}`.includes(s)) && ((element.beds &&  (element.beds >= childrenValue + adultValue)) || !s.length);
    });
    adultValue = 0;
    childrenValue = 0;
    renderData(toRender);
    closeSearch();
}

function addBorder(e){
    if (e.target.className === 'location-input' ||
        e.target.className === 'guest-input')
        return (e.target);
    if (e.target.parentNode.className === 'location-input' ||
    e.target.parentNode.className === 'guest-input')
        return (e.target.parentNode);
    return (null);
}

const main = async ()=> {
    const data = await getAllData();
    renderData(data);
    const locationInput = document.querySelector('.search');
    locationInput.addEventListener('click', (e)=>{
        e.preventDefault();
        const current = addBorder(e);
        if (current)
        {
            if (!isOpen)
                openSearch();
            document.querySelector('.right-element-search').innerHTML = '';
            document.querySelector('.left-element-search').innerHTML = '';
            for (const r of locationInput.children)
            {
                r.style.border = 'none';
                r.style.borderRadius = '0px';
            }
            if (current.className === 'location-input' && isOpen) {
                current.querySelector('input[type="text"]').addEventListener('keyup', (e)=>{
                    const content = document.querySelector('.left-element-search');
                    content.innerHTML = '';
                    let filtered = [];
                    for (const element of data) {
                        const s = e.target.value.toLowerCase().split(', ').join(',').split(',').join(' ');
                        const x = filtered.filter((target)=>{
                            return target[0] === element.city &&
                            element.country === target[1]});
                        if (!x.length &&
                            (`${element.country.toLowerCase() + ' ' + element.city.toLowerCase()}`.includes(s)||
                            `${element.city.toLowerCase() + ' ' + element.country.toLowerCase()}`.includes(s))) {
                            filtered.push([element.city, element.country]);
                        }
                }
                filtered = filtered.slice(0, 4);
                filtered.forEach(element=>{
                    const place = PlaceRender(element[0], element[1]);
                    place.querySelector('.place-text').addEventListener('click', (e)=> {
                        current.querySelector('input[type="text"]').value = e.target.textContent;
                    });
                    content.appendChild(place);
                });
                });
            }
            if (current.className === 'guest-input') {
                const rightSection = document.querySelector('.right-element-search');
                if (!rightSection.children[0])
                    rightSection.appendChild(GuestRender());
                document.querySelector('.square-adult-remove').addEventListener('click', e=>{
                    if (adultValue > 0)
                        adultValue--;
                    document.querySelector('.number-adult').innerHTML = adultValue;
                });
                document.querySelector('.square-adult-add').addEventListener('click', e=>{    
                    adultValue++;
                    document.querySelector('.number-adult').innerHTML = adultValue;
                });
                document.querySelector('.square-children-remove').addEventListener('click', e=>{
                    if (childrenValue > 0)
                        childrenValue--;
                    document.querySelector('.number-children').innerHTML = childrenValue;
                });
                document.querySelector('.square-children-add').addEventListener('click', e=>{
                        childrenValue++;
                        document.querySelector('.number-children').innerHTML = childrenValue;
                });
            }
            current.style.border = '1px solid #000';
            current.style.borderRadius = '16px';
        }
        else if (e.target.className === 'search-button-clicked'
        || e.target.parentNode.className === 'search-button-clicked') {
            SearchButtonLogic();
        }
    });
}

main(); 