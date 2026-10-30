
/* =========================================
   ORIENTE SUSHI DELIVERY
   Interatividade e animações
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. SELECIONAR OS CARDS
    const contactCards = document.querySelectorAll(".contact-card");

    // 2. VERIFICAR PREFERÊNCIA DE ANIMAÇÃO
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Sem animações para quem prefere movimento reduzido
    if (
        reduceMotion ||
        !("IntersectionObserver" in window)
    ) {
        contactCards.forEach(card => {
            card.style.opacity = "1";
            card.style.transform = "none";
        });

        return;
    }

    // 3. CONFIGURAR ANIMAÇÃO INICIAL
    contactCards.forEach(card => {

        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";

        card.style.transition =
            "opacity 650ms ease, transform 650ms ease";

    });

    // 4. OBSERVAR OS CARDS DURANTE A ROLAGEM
    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const card = entry.target;

                    const index = Array.from(contactCards)
                        .indexOf(card);

                    // Entrada sequencial dos elementos
                    card.style.transitionDelay =
                        `${Math.min(index * 100, 400)}ms`;

                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";

                    // Parar de observar após a animação
                    observer.unobserve(card);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    // 5. ATIVAR OBSERVAÇÃO
    contactCards.forEach(card => {
        observer.observe(card);
    });


    // 6. REGISTRAR CLIQUES NOS CONTATOS
    contactCards.forEach(card => {

        card.addEventListener("click", () => {

            const title = card.querySelector(
                ".card-content h3"
            );

            if (title) {
                console.log(
                    "Oriente Sushi | Ação selecionada:",
                    title.textContent.trim()
                );
            }

        });

    });


    // 7. ANO AUTOMÁTICO NO RODAPÉ
    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Oriente Sushi Delivery. Todos os direitos reservados.`;

    }

    console.log(
        "Oriente Sushi Delivery | Sistema carregado com sucesso."
    );

});
