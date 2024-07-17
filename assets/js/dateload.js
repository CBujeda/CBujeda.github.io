function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const [anio, mes, dia] = fechaNacimiento.split('-').map(Number);
    const fechaNac = new Date(anio, mes - 1, dia);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

window.onload = function() {
    const fechaNacimiento = '2003-06-30';
    const edad = calcularEdad(fechaNacimiento);
    document.getElementById('edad').textContent = edad;
};
