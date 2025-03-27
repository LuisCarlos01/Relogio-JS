class WeatherClock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.temperatureElement = document.getElementById('temperature');
        this.descriptionElement = document.getElementById('weather-description');
        this.locationElement = document.getElementById('location');
        
        // Substitua este valor pela sua chave API real
        this.apiKey = '6934321c-0b30-11f0-a3d7-0242ac130003-693432b2-0b30-11f0-a3d7-0242ac130003'; // <- Coloque sua chave API aqui
        
        // Novas propriedades
        this.format24h = true;
        this.showSeconds = true;
        this.clockSize = 4;
        
        // Configurações do painel
        this.settingsIcon = document.querySelector('.settings-icon');
        this.settingsPanel = document.getElementById('settings-panel');
        this.clockSizeSlider = document.getElementById('clock-size');
        this.format24hToggle = document.getElementById('format-24h');
        this.showSecondsToggle = document.getElementById('show-seconds');
        
        this.setupEventListeners();
        this.init();
    }

    setupEventListeners() {
        // Toggle do painel de configurações
        this.settingsIcon.addEventListener('click', () => {
            this.settingsPanel.classList.toggle('active');
        });

        // Controle de tamanho do relógio
        this.clockSizeSlider.addEventListener('input', (e) => {
            this.clockSize = e.target.value;
            this.timeElement.style.fontSize = `${this.clockSize}rem`;
        });

        // Formato 24h
        this.format24hToggle.addEventListener('change', (e) => {
            this.format24h = e.target.checked;
            this.updateClock();
        });

        // Mostrar segundos
        this.showSecondsToggle.addEventListener('change', (e) => {
            this.showSeconds = e.target.checked;
            this.updateClock();
        });

        // Temas de cores
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                this.changeTheme(color);
            });
        });

        // Clique duplo no relógio para alternar formato
        this.timeElement.addEventListener('dblclick', () => {
            this.format24h = !this.format24h;
            this.format24hToggle.checked = this.format24h;
            this.updateClock();
        });

        // Adicionar evento para fechar configurações
        const closeButton = document.querySelector('.close-settings');
        closeButton.addEventListener('click', () => {
            this.settingsPanel.classList.remove('active');
        });

        // Fechar configurações ao clicar fora do painel
        document.addEventListener('click', (e) => {
            if (!this.settingsPanel.contains(e.target) && 
                !this.settingsIcon.contains(e.target) && 
                this.settingsPanel.classList.contains('active')) {
                this.settingsPanel.classList.remove('active');
            }
        });
    }

    changeTheme(color) {
        document.body.className = ''; // Remove temas anteriores
        if (color !== 'default') {
            document.body.classList.add(`theme-${color}`);
        }
    }

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        this.getWeather();
        // Atualiza o clima a cada 30 minutos
        setInterval(() => this.getWeather(), 1800000);
        this.createParticles();
        this.addInteractiveEffects();
    }

    updateClock() {
        const now = new Date();
        
        // Formatação da hora
        let timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !this.format24h
        };
        
        if (this.showSeconds) {
            timeOptions.second = '2-digit';
        }
        
        const time = now.toLocaleTimeString('pt-BR', timeOptions);
        this.timeElement.textContent = time;
        
        // Atualiza data
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const date = now.toLocaleDateString('pt-BR', options);
        this.dateElement.textContent = date;
    }

    async getWeather() {
        try {
            // Versão temporária sem API
            this.temperatureElement.textContent = `--°C`;
            this.descriptionElement.textContent = 'API Key necessária';
            this.locationElement.textContent = 'Configure sua chave API';
            
            // Atualiza o ícone
            const weatherIcon = document.querySelector('.weather-icon i');
            this.updateWeatherIcon(weatherIcon, 'Clouds');
            
        } catch (error) {
            console.error('Erro:', error);
            this.descriptionElement.textContent = 'Erro ao carregar dados';
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    updateWeatherIcon(iconElement, weatherCondition) {
        const iconMap = {
            Clear: 'fa-sun',
            Clouds: 'fa-cloud',
            Rain: 'fa-cloud-rain',
            Snow: 'fa-snowflake',
            Thunderstorm: 'fa-bolt',
            Drizzle: 'fa-cloud-rain',
            Mist: 'fa-smog',
            Smoke: 'fa-smog',
            Haze: 'fa-smog',
            Dust: 'fa-smog',
            Fog: 'fa-smog',
            Sand: 'fa-smog',
            Ash: 'fa-smog',
            Squall: 'fa-wind',
            Tornado: 'fa-tornado'
        };

        iconElement.className = `fas ${iconMap[weatherCondition] || 'fa-cloud'}`;
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Propriedades aleatórias para cada partícula
            const size = Math.random() * 5 + 2;
            const startPositionLeft = Math.random() * window.innerWidth;
            const startPositionTop = Math.random() * window.innerHeight;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startPositionLeft}px`;
            particle.style.top = `${startPositionTop}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }
    }

    addInteractiveEffects() {
        // Efeito de som ao clicar nos botões
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const audio = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
                audio.play();
            });
        });

        // Efeito de vibração ao mudar configurações
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            });
        });

        // Efeito de parallax no container
        const container = document.querySelector('.container');
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            container.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
        });

        // Restaurar posição quando o mouse sai
        document.addEventListener('mouseleave', () => {
            container.style.transform = 'translate(0, 0) scale(1)';
        });
    }
}

// Inicializa o relógio quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new WeatherClock();
}); 