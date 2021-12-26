document.addEventListener("DOMContentLoaded", fio);

function fio() {
  let fio = decodeURI(window.location.hash);
  if (fio === "" || fio === "#") return;
  document.title = fio;
  fio = fioBR(fio);
  document.getElementById("fio").innerHTML = fio;
  document.removeEventListener("DOMContentLoaded", fio);
}

function fioBR(fio) {
  return fio.replace("#", "").replace(" ", "<br>");
}
