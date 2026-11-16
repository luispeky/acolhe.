# Acolhe

Site independente de apoio e informação sobre saúde emocional. Criado para oferecer um
espaço acolhedor, com práticas simples, conteúdos educativos e caminhos para encontrar
apoio profissional e serviços públicos no Brasil.

> O Acolhe não realiza atendimento psicológico, não fornece diagnóstico e não substitui
> o acompanhamento de profissionais de saúde. Em uma emergência, procure uma UPA ou
> pronto-socorro; em uma urgência médica, ligue 192 (SAMU). O CVV atende pelo 188.

## O projeto

- **React e TypeScript** para as páginas e interações.
- **Tailwind CSS 4** e estilos responsivos para celular, tablet e desktop.
- **Vite** para desenvolvimento local e geração do site estático.
- **Lucide** para os ícones vetoriais.

Todo o conteúdo do projeto está nesta pasta. Não é necessário clonar nem instalar o
Ativaí para desenvolver ou publicar o Acolhe.

## Executar localmente

Requisitos: Node.js 22 ou superior e npm.

```bash
npm ci
npm run dev
```

O Vite mostra o endereço local no terminal. Para verificar a versão otimizada:

```bash
npm run build
npm run preview
```

## Publicação automática no GitHub Pages

O workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) compila e publica
o site sempre que uma alteração é enviada à branch `main`. Também pode ser iniciado
manualmente pela aba **Actions** do GitHub.

Na primeira configuração do repositório, habilite **Settings → Pages → Build and
deployment → Source → GitHub Actions**. O projeto ajusta automaticamente o caminho dos
arquivos estáticos para o nome deste repositório.

Endereço do site: <https://luispeky.github.io/acolhe./>

## Estrutura

```text
.
├── .github/workflows/deploy.yml  # compilação e publicação no Pages
├── public/                       # favicon e arquivos estáticos
├── src/
│   ├── App.tsx                   # páginas, conteúdo e interações
│   ├── main.tsx                  # inicialização do React
│   └── styles.css                # Tailwind CSS e estilos responsivos
├── index.html                    # documento e metadados
├── package.json
├── tsconfig.json
└── vite.config.ts
```
