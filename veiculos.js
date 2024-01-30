let  currentPageUrl = 'https://swapi.dev/api/vehicles/'


window.onload = async () => {
    try {
      await loadCharacters(currentPageUrl);
    } catch (error) {
    console.log(error);
    alert('Erro ao carregar veículos');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // limpar os resultados anteriores 

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/vehicles/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/vehicles/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const model = document.createElement("span")
                model.className = "character-details"
                model.innerText = `Modelo: ${character.model}`

                const passengers = document.createElement("span")
                passengers.className = "character-details"
                passengers.innerText = `Passageiros: ${character.passengers}`

                const length = document.createElement("span")
                length.className = "character-details"
                length.innerText = `Comprimento: ${character.length}`

                const costincredits = document.createElement("span")
                costincredits.className = "character-details"
                costincredits.innerText = `Valor: ${convertcostincredits(character.cost_in_credits)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(passengers)
                modalContent.appendChild(length)
                modalContent.appendChild(costincredits)
            
            }

            mainContent.appendChild(card)
        });

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.disabled = !responseJson.next
    backButton.disabled = !responseJson.previous
    
    backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url 

    } catch (error) {
    alert('Erro ao carregar os veículos')
    console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
} 

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
} 

function convertcostincredits(costincredits) {
    if (costincredits === "unknown") {
        return "desconhecido"
    }

    return costincredits
}


  function animarMenu(){
    const btn = document.getElementById('btn-menu')
    btn.classList.toggle('ativar') 
    menuDiv.classList.toggle('abrir')
    btnAnimar.classList.toggle('ativo')
  }
  

  const menuDiv = document.getElementById('menu-mobile')
  const btnAnimar = document.getElementById('btn-menu')

  menuDiv.addEventListener('click', animarMenu)


  

 