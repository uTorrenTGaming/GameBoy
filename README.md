🎮 Poké-OS: Simulador de Batalha Retrô

Um simulador de batalhas Pokémon imersivo que roda dentro de um "Sistema Operacional" fictício de console. O projeto combina nostalgia, design responsivo e tecnologias web modernas para criar uma experiência única que funciona tanto no desktop quanto como um aplicativo instalado (PWA) no celular.

🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna focada em performance e experiência do usuário:

React (v18): Biblioteca JavaScript para construção da interface de usuário reativa e baseada em componentes.

TypeScript: Superset do JavaScript que adiciona tipagem estática, garantindo um código mais robusto e seguro.

Vite: Ferramenta de build de próxima geração, proporcionando um ambiente de desenvolvimento extremamente rápido.

Tailwind CSS: Framework CSS utility-first utilizado para toda a estilização, garantindo responsividade total e design customizável.

PokéAPI: API RESTful gratuita utilizada para buscar dados reais dos Pokémon (sprites, stats, movimentos e tipos) em tempo real.

Lucide React: Biblioteca de ícones leves e consistentes para a interface do sistema (bateria, wi-fi, configurações).

Web Audio API: Uma engine de áudio personalizada escrita do zero para sintetizar efeitos sonoros 8-bit e música de fundo dinamicamente, sem a necessidade de arquivos de áudio pesados externos.

PWA (Progressive Web App): Configuração de manifest.json e Service Workers que permite que o jogo seja instalado como um aplicativo nativo no Android, iOS e Desktop.

✨ Funcionalidades

Sistema Operacional Fictício: Interface de boot, login e terminal que simula um console de videogame real.

Batalha em Tempo Real: Lógica de turnos, cálculo de dano baseado em stats reais e fraquezas/vantagens de tipo.

Design Adaptativo (Híbrido):

Desktop: Modo console flutuante centralizado.

Mobile: Interface tela cheia otimizada para toque.

Gráficos Dinâmicos: Alterne entre o modo CLASSIC (Pixel Art com scanlines CRT) e HD (Artes oficiais em alta resolução e cenários realistas baseados no bioma).

Áudio Sintetizado: Músicas e efeitos sonoros gerados via código (osciladores) para uma experiência autêntica.

Internacionalização (i18n): Suporte completo para Português (BR), Inglês (US) e Espanhol (ES).

Easter Egg: Um terminal de sistema escondido para "hackers" curiosos.

📦 Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado em sua máquina:

Node.js (Versão 16 ou superior recomendada).

npm (Gerenciador de pacotes padrão do Node) ou yarn.

🛠️ Como Executar o Projeto

Siga os passos abaixo para clonar e rodar o simulador no seu ambiente local:

Clone o repositório:

git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)


Entre na pasta do projeto:

cd pokemon-battle-simulator


Instale as dependências:

npm install


Inicie o servidor de desenvolvimento:

npm run dev


Acesse no navegador:
O terminal mostrará um link local, geralmente:
http://localhost:5173

📱 Para testar no Celular (Mesma Rede Wi-Fi)

Certifique-se de que seu computador e celular estão no mesmo Wi-Fi.

Rode o comando npm run dev (o projeto já está configurado com a flag --host).

No terminal, procure pela linha Network (ex: http://192.168.0.15:5173).

Digite esse endereço no navegador do seu celular.

📂 Estrutura de Pastas

/
├── public/              # Assets estáticos (ícones, manifest, sw.js)
├── src/
│   ├── App.tsx          # Componente Principal (Lógica do Jogo, Áudio e UI)
│   ├── main.tsx         # Ponto de entrada do React
│   └── index.css        # Estilos globais e diretivas do Tailwind
├── index.html           # HTML raiz
├── tailwind.config.js   # Configuração do Tailwind
├── tsconfig.json        # Configuração do TypeScript
├── vite.config.js       # Configuração do Vite
└── package.json         # Dependências e scripts


🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests com melhorias, correções de bugs ou novas funcionalidades.

Faça um Fork do projeto.

Crie uma Branch para sua Feature (git checkout -b feature/NovaFeature).

Faça o Commit (git commit -m 'Adicionando nova feature').

Faça o Push (git push origin feature/NovaFeature).

Abra um Pull Request.
