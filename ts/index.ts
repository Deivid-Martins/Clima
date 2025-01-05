const form = document.querySelector('#div-form > form');
const localeInput: HTMLInputElement | null = document.querySelector('#input-locale');

const sectionTimeResponse = document.querySelector('#time-response');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (localeInput && sectionTimeResponse) {
    const locale = localeInput.value;

    if (locale.length < 3) {
      alert('Informe pelo menos 3 letras.');
      return;
    }

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=df2c4b3a86ca4d23bdf232647250401&q=${locale}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro na API: ${response.status} - ${errorData?.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const info = {
        localeName: data.location.name,
        temp: Math.round(data.current.temp_c),
        icon: data.current.condition.icon,
      }

      sectionTimeResponse.innerHTML = `
        <div class="time-data">
          <h2>${info.localeName}</h2>
          <span>${info.temp}°C</span>
        </div>
        <img src="${info.icon}" />
      `;
      
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      alert("Ocorreu um erro ao buscar os dados. Verifique o console para mais detalhes.");
    }
  }
});