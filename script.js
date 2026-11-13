const alfabeto = "abcdefghijklmnopqrstuvwxyz";
const substituto = "qwertyuiopasdfghjklzxcvbnm";

const campoTexto = document.getElementById("texto");
const campoResultado = document.getElementById("resultado");
const aviso = document.getElementById("aviso");

function converter(texto, origem, destino) {
  return [...texto].map((caractere) => {
    const minusculo = caractere.toLowerCase();
    const posicao = origem.indexOf(minusculo);

    if (posicao === -1) {
      return caractere; // Mantém espaços, números e pontuação.
    }

    const convertido = destino[posicao];
    return caractere === minusculo ? convertido : convertido.toUpperCase();
  }).join("");
}

document.getElementById("criptografar").addEventListener("click", () => {
  campoResultado.value = converter(campoTexto.value, alfabeto, substituto);
  aviso.textContent = "Texto criptografado!";
});

document.getElementById("descriptografar").addEventListener("click", () => {
  campoResultado.value = converter(campoTexto.value, substituto, alfabeto);
  aviso.textContent = "Texto descriptografado!";
});

document.getElementById("limpar").addEventListener("click", () => {
  campoTexto.value = "";
  campoResultado.value = "";
  aviso.textContent = "";
  campoTexto.focus();
});

document.getElementById("copiar").addEventListener("click", async () => {
  if (!campoResultado.value) {
    aviso.textContent = "Não há resultado para copiar.";
    return;
  }

  try {
    await navigator.clipboard.writeText(campoResultado.value);
    aviso.textContent = "Resultado copiado!";
  } catch {
    campoResultado.select();
    document.execCommand("copy");
    aviso.textContent = "Resultado copiado!";
  }
});
