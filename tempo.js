// Importa módulos do app
var exibir = require("./print.js");

// Importa módulos do Node.js
var http = require("http");
var https = require("https");

function getForecast(local) {
  // URL da API forecast.io
  var url = "https://api.forecast.io/forecast/";
  // Chave pessoal da API
  var chave = "";
  // Gera a url completa
  url += chave + "/" +local.lat + "," + local.lng;

  // Usa a API
  var req = https.get(url, function(res) {
    var corpo = "";
    // Carrega as info
    res.on("data", function(chunck) {
      corpo += chunck;
    });
    // Lê as info
    res.on("end", function() {
      if (res.statusCode === 200) {
        try {
          // Cria um objeto
          var tempo = JSON.parse(corpo);

          var objTempo = {};
          objTempo.agora = tempo.currently.summary;
          objTempo.temp = tempo.currently.temperature;
          objTempo.humidade = tempo.currently.humidity;
          objTempo.vento = tempo.currently.windSpeed;
          objTempo.pressao = tempo.currently.pressure;
          objTempo.cidade = local.cidade;

          exibir.printTempo(objTempo);
        } catch (erro) {

        }
      }
    });
  });
}

// Pega as coordenadas do local
function getCoords(cidade) {
  // Remove espaços em branco da cidade
  cidade = cidade.replace(" ", "+");

  // Usa o local no Google Maps Geocoding API para obter as coordenadas
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var chave = "&key=";
  var req = https.get(url + cidade + chave, function(res) {
    var corpo = "";
    // Carrega as informações
    res.on("data", function(chunck) {
      corpo += chunck;
    });
    // Verifica por erros na requisição
    res.on("error", function(error) {
      exibir.printErro({ message: "Houve um erro ao ler a cidade: " + cidade + " (" + http.STATUS_CODES[res.statusCode] + ")" });
    });
    // Lida com as informações
    res.on("end", function() {
      try {
        // Cria um objeto
        var infoCidade = JSON.parse(corpo);

        var local = {}; // Guarda as info

        // Retorna a cidade, latitude e longitude
        local.cidade = infoCidade.results[0].address_components[0].short_name;
        local.lat = infoCidade.results[0].geometry["location"].lat;
        local.lng = infoCidade.results[0].geometry["location"].lng;

        // Chama o forecast do tempo
        getForecast(local);
      } catch (erro) {
        // Erro ao ler o local
        console.error("Houve um erro, por favor, verifique a cidade: " + cidade);
      }
    });
  });
} // Fim da função getCoords

module.exports.getCoords = getCoords;
