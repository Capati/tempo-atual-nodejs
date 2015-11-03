// Imprime mensagem do tempo
function printTempo(tempo) {
  // Traduz as strings
  tempo.agora = tempo.agora === "Clear" ? "Limpo" : tempo.agora;
  tempo.agora = tempo.agora === "Breezy" ? "Ventando" : tempo.agora;
  tempo.agora = tempo.agora === "Drizzle" ? "Garoando" : tempo.agora;
  tempo.agora = tempo.agora === "Rain" ? "Chuvendo" : tempo.agora;
  tempo.agora = tempo.agora === "Light Rain" ? "Chuva Fraca" : tempo.agora;
  tempo.agora = tempo.agora === "Heavy Rain" ? "Chuva Forte" : tempo.agora;
  tempo.agora = tempo.agora === "Partly Cloudy" ? "Parcialmente Nublado" : tempo.agora;
  tempo.agora = tempo.agora === "Mostly Cloudy" ? "Maior parte Nublado" : tempo.agora;
  tempo.agora = tempo.agora === "Windy and Partly Cloudy" ? "Ventania e Parcialmente Nublado" : tempo.agora;
  tempo.agora = tempo.agora === "Overcast" ? "Nublado" : tempo.agora;

  // Converte e arredonda para celsius
  tempo.temp = Math.round((tempo.temp - 32) * 5/9);

  // Gera a mensagem
  var msg = "\n " + tempo.cidade + ": \x1b[92m" + tempo.temp + "º \x1b[0m\n" +
            " Agora: " + tempo.agora + "\n" +
            " Humidade: " + tempo.humidade + "\n" +
            " Vento: " + tempo.vento + "\n" +
            " Pressão: " + tempo.pressao + "\n";

  // Imprime a mensagem
  console.log(msg);
}

// Imprime mensagens de erro
function printErro(erro) {
  console.error(erro.message);
}

module.exports.printTempo = printTempo;
module.exports.printErro = printErro;
