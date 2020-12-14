const thermostat = document.querySelector(".thermostat");

document.querySelector("a.temp-up").addEventListener("click", function (e) {
    e.preventDefault();
    
    const formData = {
        configKey: "DESIRED_TEMPERATURE",
        device: "JORDAN_ROOM",
        configValue: ++thermostatSetting
    }

    fetch("/config/save", { 
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
    })
        .then(response => response.json())
        .then(json => onSuccess(json))
        .catch(error => console.error(error));
});

document.querySelector("a.temp-down").addEventListener("click", function (e) {
    e.preventDefault();

    const formData = {
        configKey: "DESIRED_TEMPERATURE",
        device: "JORDAN_ROOM",
        configValue: --thermostatSetting
    }

    fetch("/config/save", { 
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
    })
        .then(response => response.json())
        .then(json => onSuccess(json))
        .catch(error => console.error(error));
});

const onSuccess = (json) => {
    console.log("response: "+ json);
    thermostat.innerHTML = json.configValue + "˚ ";
};