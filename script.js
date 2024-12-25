document.addEventListener("DOMContentLoaded", function() {
    let cuenta = 5;
    const contadorElemento = document.getElementById('cuenta');
    const contador = document.getElementById('contador');
    const barraProgreso = document.getElementById('barra-progreso');
    const progreso = document.getElementById('progreso');
    const botonImagen = document.getElementById('boton-imagen');
    const boton = document.getElementById('boton');
    const gifsAdicionales = document.getElementById('gifs-adicionales');
    const mensaje = document.getElementById('mensaje'); 
    const confetti = new JSConfetti();
    const hoverSound = new Audio('Sounds/sonido sobre.mp3');
    const clickSound = new Audio('Sounds/boton.mp3');
    const confSound = new Audio('Sounds/explosion.mp3');
    const gifs = document.querySelectorAll('.gif-adicional');
    const imagenesContainer = document.getElementById('imagenes-container');
    const imagenes = document.querySelectorAll('.imagen');
    const fondoImagen = document.querySelector('.fondo-imagen');
    const sonidoCarta = new Audio('Sounds/sonidoCarta.mp3');
    clickSound.load();

    document.addEventListener("DOMContentLoaded", function() {
        const sonidoInicio = document.getElementById('sonido-inicio');
        sonidoInicio.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
        });
    });
    

    function playSound() {
        clickSound.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
        });
    }

    function actualizarContador() {
        const horas = Math.floor(cuenta / 3600);
        const minutos = Math.floor((cuenta % 3600) / 60);
        const segundos = cuenta % 60;

        const formatoHoras = horas.toString().padStart(2, '0');
        const formatoMinutos = minutos.toString().padStart(2, '0');
        const formatoSegundos = segundos.toString().padStart(2, '0');

        contadorElemento.textContent = `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`;
    }

    gifs.forEach((gif, index) => {
        gif.addEventListener('mouseover', function() {
            const soundClone = hoverSound.cloneNode(); 
            soundClone.play().catch(error => {
                console.error('Error al reproducir el sonido de hover:', error);
            });
        });

        gif.addEventListener('click', function() {
            confetti.addConfetti({
                particleCount: 500,
                spread: 160,
                startVelocity: 30,
                gravity: 1.5,
                colors: ["#FF69B4", "#FF1493"],
                emojis: ["✨"],
            });
            const sonidoCartaG = sonidoCarta.cloneNode();
            sonidoCartaG.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
            fondoImagen.style.display = 'block'; 
            imagenesContainer.style.display = 'flex'; 

            imagenes.forEach(imagen => {
                imagen.style.display = 'none'; 
            });
            imagenes[index].style.display = 'block'; 
        });
    });

    const intervalo = setInterval(function() {
        cuenta--;
        actualizarContador();
        
        if (cuenta === 0) {
            clearInterval(intervalo);
            contador.classList.add('temblar');
            setTimeout(() => {
                contador.classList.remove('temblar');
                contador.classList.add('temblar-extend');
                setTimeout(() => {
                    contador.classList.remove('temblar-extend');
                    contador.classList.add('explosion');
                    setTimeout(() => {
                        contador.style.display = 'none';
                        barraProgreso.classList.remove('hidden');
                        botonImagen.classList.remove('hidden');
                        let clicks = 0;

                        boton.addEventListener('click', function() {
                            if (clicks < 5) {
                                clicks++;
                                progreso.style.width = (clicks * 20) + '%';
                                playSound();
                                if (clicks === 5) {
                                    barraProgreso.classList.add('hidden');
                                    botonImagen.classList.add('hidden');
                                    confSound.play();
                                    setTimeout(() => {
                                        gifsAdicionales.classList.remove('hidden');
                                        mensaje.classList.remove('hidden'); 
                                        mensaje.style.opacity = 1;
                                        gifsAdicionales.style.opacity = 1;
                                        
                                        gifsAdicionales.style.transform = 'translate(-50%, -50%) scale(1)';
                                        const flechaContainer = document.getElementById('flecha-container');
                                        flechaContainer.classList.remove('hidden');
                                        flechaContainer.style.opacity = 1;
                                        flechaContainer.style.transform = 'translate(-50%, -50%) scale(1)';  
                                        confetti.addConfetti({
                                            particleCount: 500,
                                            spread: 160,
                                            startVelocity: 30,
                                            gravity: 1.5,
                                            colors: ["#FF69B4", "#FF1493"],
                                            emojis: ["❤️", "💖", "💕", "💗"],
                                        });
                                    }, 5);
                                }
                            }
                        });
                    }, 1000);
                }, 3000);
            }, 1000);
        }
    }, 1000);

    document.querySelectorAll('.cerrar').forEach(botonCerrar => {
        botonCerrar.addEventListener('click', function() {
            this.parentElement.style.display = 'none'; 
            imagenesContainer.style.display = 'none'; 
            fondoImagen.style.display = 'none'; 
        });
    });

    actualizarContador();
});
