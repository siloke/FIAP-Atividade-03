let form = document.querySelector("form");

form.addEventListener('submit', (e) => {

    e.preventDefault()

    let cidade = form.querySelector("#cidade").value;
    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: cidade
    }

    fetch("../submitForm", config)
    .then(res => res.json())
    .then(data => {
        if(data.cod == '200') {

            let cont = document.querySelector(".container")
            let iconCode = data.weather[0].icon;
            form.style.display = 'none'
            cont.innerHTML = 
            `
            <div class="w-50">
                <div class="w-50">
                    <h1 class="display-6">${data.name}</h1>
                    <div class="d-flex">
                        <strong><p class="display-4">${data.main.temp}°C</p></strong>
                        <div>
                            <img src="https://openweathermap.org/img/wn/${iconCode}.png"/>
                        </div>
                    </div>
                    <p>${data.weather[0].description.toUpperCase()}</p>
                    <a href="/index.html" class="btn bg-warning w-100">Voltar</a>
                </div>
            </div>
            <div class="w-50">
                <div class="w-100 h-100">
                    <img class="w-100 h-100"src="/assets/weatherimg/Weather-bro.svg"/>
                </div>
            </div>
            ` 
        } else if (data.cod == '404') {
            window.location.replace("notfound.html")
        } else if (data.cod == '400') {
            window.location.replace("badrequest.html")
        }
    })

    form.innerHTML =
    `
    <h1 class="display-6">Loading...<h1/>
    <img src="/assets/weatherimg/Eclipse-1s-200px.svg"/>
    `
})