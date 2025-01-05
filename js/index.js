"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#div-form > form');
const localeInput = document.querySelector('#input-locale');
const sectionTimeResponse = document.querySelector('#time-response');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    if (localeInput && sectionTimeResponse) {
        const locale = localeInput.value;
        if (locale.length < 3) {
            alert('Informe pelo menos 3 letras.');
            return;
        }
        try {
            const response = yield fetch(`https://api.weatherapi.com/v1/current.json?key=df2c4b3a86ca4d23bdf232647250401&q=${locale}`);
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(`Erro na API: ${response.status} - ${((_a = errorData === null || errorData === void 0 ? void 0 : errorData.error) === null || _a === void 0 ? void 0 : _a.message) || response.statusText}`);
            }
            const data = yield response.json();
            const info = {
                localeName: data.location.name,
                temp: Math.round(data.current.temp_c),
                icon: data.current.condition.icon,
            };
            sectionTimeResponse.innerHTML = `
        <div class="time-data">
          <h2>${info.localeName}</h2>
          <span>${info.temp}°C</span>
        </div>
        <img src="${info.icon}" />
      `;
        }
        catch (error) {
            console.error("Erro ao processar a requisição:", error);
            alert("Ocorreu um erro ao buscar os dados. Verifique o console para mais detalhes.");
        }
    }
}));
