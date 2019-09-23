function toolCalculateSubmit() {
    getInput = document.getElementById("tool-calculate-input");
    getToFixed = document.getElementsByClassName("tool-calculate-tofixed")[0];
    getResult = document.getElementsByClassName("tool-calculate-result")[0].getElementsByTagName("span")[0];
    if (getToFixed.value >= 0 && getToFixed.value <= 16) {
        getResult.innerText = eval(getInput.value).toFixed(getToFixed.value);
    } else {
        getResult.innerText = "错误";
    }
}

function toolCalculateClear() {
    getInput = document.getElementById("tool-calculate-input");
    getInput.value = '';
    getResult.innerText = '';
}
