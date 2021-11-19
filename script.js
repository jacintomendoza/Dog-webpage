
const API_URL = 'https://api.thedogapi.com/v1/breeds'
// const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.TheDogAPI.com/images/search?breed_ids='

// f6467a1f-b94d-4c4f-94c0-f0a09b64fb47

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// DOGS /////////////////////////////////////////////////////////////
getDogs(API_URL)

async function getDogs(url) {
    const res = await fetch(url)
    const data = await res.json()

    // console.log(data)
    showDogs(data)
}

function showDogs(dogs) {
    main.innerHTML = ''

    dogs.forEach((dog) => {
        const {name, image, breed_group, life_span, weight, temperament, origin} = dog

        const dogEl = document.createElement('div')
        dogEl.classList.add('dog')

        dogEl.innerHTML = `
            <img src="${image.url}" alt="${name}">
            <div class="dog-info">
                <h3>${name}</h3>
            </div>
            <div class="overview">
                <b>Breed Group:  </b>${breed_group}<br>
                <b>Lifespan:  </b>${life_span}<br>
                <b>Weight:  </b>${weight.imperial} lbs<br>
                <b>Temperament:  </b>${temperament}<br>
                <b>Origin: </b>${origin}<br>
            </div>
        `
        // main.appendChild(dogEl);
    document.getElementById("animals").appendChild(dogEl);

    })

    // document.getElementById("animals").appendChild(dogEl);
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getDogs(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

// NOTES /////////////////////////////////////////////////////////////

const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {

    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.getElementById("notes").appendChild(note);
    // document.body.appendChild(note)

    // note[0].before(document.getElementsByClassName('dog'));
    // document.getElementById("notes").innerHTML += note.innerHTML;
    // document.getElementsByClassName('dog')[0].after(document.getElementsByClassName('note')[0])
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

// NAVIGATION /////////////////////////////////////////////////////////////

const toggle = document.getElementById('toggle')
const nav = document.getElementById('nav')
// const api = document.getElementById('api')

toggle.addEventListener('click', () => {
    nav.classList.toggle('active')
})

// api.addEventListener('click', () => {
//     window.location.href('https://www.thedogapi.com')
// })