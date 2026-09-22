(() => {
    "use strict";

    const data = window.PROPOSTA;

    if (!data) {
        console.error(
            "PROPOSTA não encontrada. Verifique se js/conteudo.js foi carregado antes de js/script.js."
        );
        return;
    }

    const escapeHTML = (value = "") =>
        String(value).replace(/[&<>'"]/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        })[char]);

    const get = (path) =>
        path
            .split(".")
            .reduce((accumulator, key) => accumulator?.[key], data);


    /*
    =====================================================
    PERFIS SOCIAIS DO PROJETO
    =====================================================
    */

    const configuracao =
        data.configuracao || {};

    const instagramSarahUrl =
        configuracao.instagramSarah?.url ||
        configuracao.instagramUrlSarah ||
        (
            configuracao.instagramUrl
                ?.toLowerCase()
                .includes("sarahfmelo")
                ? configuracao.instagramUrl
                : ""
        ) ||
        "https://www.instagram.com/sarahfmelo/";

    const instagramSarahUsuario =
        configuracao.instagramSarah?.usuario ||
        "@sarahfmelo";

    const instagramGuiUrl =
        configuracao.instagramGui?.url ||
        configuracao.instagramUrlGui ||
        (
            configuracao.instagramUrl &&
            !configuracao.instagramUrl
                .toLowerCase()
                .includes("sarahfmelo")
                ? configuracao.instagramUrl
                : ""
        ) ||
        "https://www.instagram.com/guinishiyama/";

    const instagramGuiUsuario =
        configuracao.instagramGui?.usuario ||
        "@guinishiyama";

    const renderInstagramLinks = () => `
        <div class="instagram-links">
            <a
                href="${escapeHTML(
                    instagramSarahUrl
                )}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${escapeHTML(
                    instagramSarahUsuario
                )} ↗
            </a>

            <a
                href="${escapeHTML(
                    instagramGuiUrl
                )}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${escapeHTML(
                    instagramGuiUsuario
                )} ↗
            </a>
        </div>
    `;

    /*
    =====================================================
    CONFIGURAÇÕES DA PÁGINA
    =====================================================
    */

    document.title =
        data.configuracao?.tituloPagina ||
        document.title;

    document
        .querySelector('meta[name="description"]')
        ?.setAttribute(
            "content",
            data.configuracao?.descricaoPagina || ""
        );

    /*
    =====================================================
    CONTEÚDOS FIXOS DO INDEX.HTML
    =====================================================
    */

    document
        .querySelectorAll("[data-text]")
        .forEach((element) => {
            element.textContent =
                get(element.dataset.text) ?? "";
        });

    const heroImage =
        document.querySelector('[data-image="hero"]');

    if (heroImage) {
        heroImage.setAttribute(
            "src",
            data.hero?.foto ||
                "assets/images/capa.jpg"
        );
    }

    /*
    =====================================================
    CABEÇALHO PADRÃO DAS SEÇÕES
    =====================================================
    */

    const heading = (
        numero,
        etiqueta,
        titulo,
        invertido = false
    ) => `
        <div class="section-heading ${
            invertido
                ? "section-heading--invertido"
                : ""
        }">
            <p>
                <span>${escapeHTML(numero)}</span>
                ${escapeHTML(etiqueta)}
            </p>

            <h2>${escapeHTML(titulo)}</h2>
        </div>
    `;

    /*
    =====================================================
    01 — PROJETO
    =====================================================
    */

    const projeto = () => {
        if (!data.projeto) {
            return "";
        }

        const textos = Array.isArray(
            data.projeto.texto
        )
            ? data.projeto.texto
                  .map(
                      (paragraph) => `
                        <p>${escapeHTML(
                            paragraph
                        )}</p>
                    `
                  )
                  .join("")
            : "";

        const dados = Array.isArray(
            data.projeto.dados
        )
            ? data.projeto.dados
                  .map(
                      (item) => `
                        <div>
                            <dt>
                                ${escapeHTML(
                                    item.rotulo
                                )}
                            </dt>

                            <dd>
                                ${escapeHTML(
                                    item.valor
                                )}
                            </dd>
                        </div>
                    `
                  )
                  .join("")
            : "";

        return `
            <section
                class="section section--light"
                id="projeto"
            >
                ${heading(
                    "01",
                    "PROJETO",
                    data.projeto.titulo
                )}

                <div class="project-layout">
                    <div class="project-copy">
                        ${textos}
                    </div>

                    <dl class="facts-grid">
                        ${dados}
                    </dl>
                </div>
            </section>
        `;
    };

    /*
    =====================================================
    02 — SOBRE NÓS
    =====================================================
    */

    const sobre = () => {
        if (!data.sobre) {
            return "";
        }

        const metricas = Array.isArray(
            data.sobre.metricas
        )
            ? data.sobre.metricas
                  .map(
                      (item) => `
                        <article>
                            <strong>
                                ${escapeHTML(
                                    item.valor
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    item.rotulo
                                )}
                            </p>

                            ${
                                item.periodo
                                    ? `
                                        <span>
                                            ${escapeHTML(
                                                item.periodo
                                            )}
                                        </span>
                                    `
                                    : ""
                            }
                        </article>
                    `
                  )
                  .join("")
            : "";

        return `
            <section
                class="section section--stone"
                id="sobre"
            >
                ${heading(
                    "02",
                    data.sobre.etiqueta ||
                        "SOBRE NÓS",
                    data.sobre.titulo
                )}

                <div class="about-layout">
                    <img
                        class="about-photo"
                        src="${escapeHTML(
                            data.sobre.foto
                        )}"
                        alt="${escapeHTML(
                            data.sobre.titulo
                        )}"
                    >

                    <div class="about-copy">
                        <strong>
                            ${escapeHTML(
                                data.sobre.destaque
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                data.sobre.texto
                            )}
                        </p>

                        ${renderInstagramLinks()}
                    </div>
                </div>

                <div class="metrics-grid">
                    ${metricas}
                </div>

                ${
                    data.sobre.observacao
                        ? `
                            <p class="small-note">
                                ${escapeHTML(
                                    data.sobre
                                        .observacao
                                )}
                            </p>
                        `
                        : ""
                }
            </section>
        `;
    };

    /*
    =====================================================
    03 — MARCA PARCEIRA
    O LOGO APARECE SOMENTE NO TÍTULO PRINCIPAL
    =====================================================
    */

    const gatorade = () => {
        if (!data.gatorade) {
            return "";
        }

        const pilares = Array.isArray(
            data.gatorade.pilares
        )
            ? data.gatorade.pilares
                  .map((item, index) => {
                      const beneficio =
                          Array.isArray(
                              data.gatorade
                                  .beneficios
                          )
                              ? data.gatorade
                                    .beneficios[
                                    index
                                ]
                              : null;

                      return `
                        <article>
                            <span>
                                ${escapeHTML(
                                    item.numero
                                )}
                            </span>

                            <h3>
                                ${escapeHTML(
                                    item.titulo
                                )}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    item.texto
                                )}
                            </p>

                            ${
                                beneficio
                                    ? `
                                        <div class="pillar-outcome">
                                            <small>
                                                VALOR PARA A MARCA
                                            </small>

                                            <strong>
                                                ${escapeHTML(
                                                    beneficio.titulo
                                                )}
                                            </strong>

                                            <p>
                                                ${escapeHTML(
                                                    beneficio.texto
                                                )}
                                            </p>
                                        </div>
                                    `
                                    : ""
                            }
                        </article>
                    `;
                  })
                  .join("")
            : "";

        return `
            <section
                class="section section--blue section--panel brand-section brand-section--gatorade"
                id="gatorade"
            >
                <div class="brand-section-heading">
                    <p class="brand-section-heading__meta">
                        <span>03</span>
                        ${escapeHTML(
                            data.configuracao?.marca ||
                                "ELITE CORE BRASIL"
                        )}
                    </p>

                    <h2 class="brand-section-title">
                        <img
                            src="${escapeHTML(
                                data.configuracao
                                    ?.logoMarca ||
                                    "assets/logos/logo-elite-core.png"
                            )}"
                            alt="${escapeHTML(
                                data.configuracao?.marca ||
                                    "Elite Core Brasil"
                            )}"
                        >
                        <span>x Projeto</span>
                    </h2>
                </div>

                <p class="brand-intro">
                    ${escapeHTML(
                        data.gatorade.introducao
                    )}
                </p>

                <div class="brand-grid">
                    ${pilares}
                </div>
            </section>
        `;
    };

    /*
    =====================================================
    04 — PLANO DE CONTEÚDO
    =====================================================
    */

    const renderPlanCards = () => {
        const etapas = Array.isArray(
            data.plano?.planoDeConteudo
        )
            ? data.plano.planoDeConteudo
            : [];

        return `
            <div class="stage-grid">
                ${etapas
                    .map((etapa, index) => {
                        const entregas =
                            Array.isArray(
                                etapa.entregas
                            )
                                ? etapa.entregas
                                      .map(
                                          (
                                              entrega
                                          ) => {
                                              if (
                                                  typeof entrega ===
                                                  "string"
                                              ) {
                                                  const partes =
                                                      entrega.split(
                                                          "—"
                                                      );

                                                  const formato =
                                                      partes[0]
                                                          ?.trim() ||
                                                      "CONTEÚDO";

                                                  const titulo =
                                                      partes
                                                          .slice(
                                                              1
                                                          )
                                                          .join(
                                                              "—"
                                                          )
                                                          .trim() ||
                                                      entrega;

                                                  return `
                                                    <div class="stage-deliverable">
                                                        <span>
                                                            ${escapeHTML(
                                                                formato
                                                            )}
                                                        </span>

                                                        <div>
                                                            <strong>
                                                                ${escapeHTML(
                                                                    titulo
                                                                )}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                `;
                                              }

                                              return `
                                                <div class="stage-deliverable">
                                                    <span>
                                                        ${escapeHTML(
                                                            entrega.formato ||
                                                                entrega.tipo ||
                                                                "CONTEÚDO"
                                                        )}
                                                    </span>

                                                    <div>
                                                        <strong>
                                                            ${escapeHTML(
                                                                entrega.titulo ||
                                                                    ""
                                                            )}
                                                        </strong>

                                                        ${
                                                            entrega.texto
                                                                ? `
                                                                    <p>
                                                                        ${escapeHTML(
                                                                            entrega.texto
                                                                        )}
                                                                    </p>
                                                                `
                                                                : ""
                                                        }
                                                    </div>
                                                </div>
                                            `;
                                          }
                                      )
                                      .join("")
                                : "";

                        return `
                            <article class="stage-card">
                                <div class="stage-card__topline">
                                    <span>
                                        ${escapeHTML(
                                            etapa.numero ||
                                                String(
                                                    index +
                                                        1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )
                                        )}
                                    </span>

                                    <small>
                                        ${escapeHTML(
                                            etapa.etapa ||
                                                "ETAPA"
                                        )}
                                    </small>
                                </div>

                                <div class="stage-card__intro">
                                    <h3>
                                        ${escapeHTML(
                                            etapa.titulo ||
                                                ""
                                        )}
                                    </h3>

                                    <p>
                                        ${escapeHTML(
                                            etapa.texto ||
                                                ""
                                        )}
                                    </p>
                                </div>

                                <div class="stage-card__deliverables">
                                    <p class="stage-card__label">
                                        CONTEÚDOS DA ETAPA
                                    </p>

                                    <div class="stage-card__list">
                                        ${entregas}
                                    </div>
                                </div>

                                ${
                                    etapa.periodo
                                        ? `
                                            <div class="stage-card__period">
                                                ${escapeHTML(
                                                    etapa.periodo
                                                )}
                                            </div>
                                        `
                                        : ""
                                }
                            </article>
                        `;
                    })
                    .join("")}
            </div>
        `;
    };

    const plano = () => {
        if (!data.plano) {
            return "";
        }

        return `
            <section
                class="section section--light content-plan"
                id="plano"
            >
                <div class="content-plan__intro">
                    ${heading(
                        "04",
                        "PLANO DE CONTEÚDO",
                        data.plano.titulo
                    )}

                    <p>
                        ${escapeHTML(
                            data.plano
                                .introducao ||
                                "Conteúdo com função em cada etapa da jornada."
                        )}
                    </p>
                </div>

                ${renderPlanCards()}
            </section>
        `;
    };

    /*
    =====================================================
    05 — PARCERIA
    =====================================================
    */

    const parceria = () => {
        if (!data.parceria) {
            return "";
        }

        const resumo = Array.isArray(
            data.parceria.resumo
        )
            ? data.parceria.resumo
                  .map(
                      (item) => `
                        <article class="partnership-summary-item">
                            <strong>
                                ${escapeHTML(
                                    item.valor
                                )}
                            </strong>

                            <div>
                                <h3>
                                    ${escapeHTML(
                                        item.titulo
                                    )}
                                </h3>

                                <p>
                                    ${escapeHTML(
                                        item.texto
                                    )}
                                </p>
                            </div>
                        </article>
                    `
                  )
                  .join("")
            : "";

        return `
            <section
                class="section section--stone"
                id="parceria"
            >
                ${heading(
                    "05",
                    "PARCERIA",
                    data.parceria.titulo
                )}

                <div class="partnership-layout">
                    <div class="investment-main">
                        <p>
                            ${escapeHTML(
                                data.parceria.chamada
                            )}
                        </p>

                        <strong>
                            ${escapeHTML(
                                data.parceria.valor
                            )}
                        </strong>
                    </div>

                    <div class="partnership-summary">
                        <p class="partnership-summary-title">
                            ${escapeHTML(
                                data.parceria
                                    .resumoTitulo ||
                                    "ENTREGAS DO PROJETO"
                            )}
                        </p>

                        <div class="partnership-summary-list">
                            ${resumo}
                        </div>
                    </div>
                </div>

                ${
                    data.parceria.observacao
                        ? `
                            <p class="partnership-note">
                                ${escapeHTML(
                                    data.parceria
                                        .observacao
                                )}
                            </p>
                        `
                        : ""
                }
            </section>
        `;
    };

    /*
    =====================================================
    06 — VAMOS JUNTOS
    =====================================================
    */

    const encerramento = () => {
        if (!data.encerramento) {
            return "";
        }

        const email =
            data.configuracao?.email || "";

        const assunto = [
            "Projeto",
            data.hero?.evento ||
                "HYROX São Paulo",
            data.configuracao?.marca ||
                "Elite Core Brasil"
        ].join(" · ");

        const etiquetaCompleta =
            data.encerramento?.etiqueta ||
            "06 · VAMOS JUNTOS";

        const partesEtiqueta =
            etiquetaCompleta.split("·");

        const numeroEtiqueta =
            partesEtiqueta[0]?.trim() || "06";

        const textoEtiqueta =
            partesEtiqueta
                .slice(1)
                .join("·")
                .trim() || "VAMOS JUNTOS";

        return `
            <section
                class="closing section--panel"
                id="contato"
            >
                <div class="closing-meta">
                    <span>
                        ${escapeHTML(
                            numeroEtiqueta
                        )}
                    </span>

                    <p>
                        ${escapeHTML(
                            textoEtiqueta
                        )}
                    </p>
                </div>

                <h2>
                    ${escapeHTML(
                        data.encerramento
                            .tituloLinha1
                    )}

                    <em>
                        ${escapeHTML(
                            data.encerramento
                                .tituloDestaque
                        )}
                    </em>
                </h2>

                <div class="closing-bottom">
                    <p>
                        ${escapeHTML(
                            data.encerramento
                                .texto
                        )}
                    </p>

                    <div>
                        <a
                            class="button button--light"
                            href="mailto:${escapeHTML(
                                email
                            )}?subject=${encodeURIComponent(
                                assunto
                            )}"
                        >
                            ${escapeHTML(
                                data.encerramento
                                    .botaoEmail
                            )}
                        </a>

                        <a
                            class="button button--outline"
                            href="${escapeHTML(
                                instagramSarahUrl
                            )}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(
                                data.encerramento
                                    .botaoInstagramSarah ||
                                    instagramSarahUsuario
                            )} ↗
                        </a>

                        <a
                            class="button button--outline"
                            href="${escapeHTML(
                                instagramGuiUrl
                            )}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(
                                data.encerramento
                                    .botaoInstagramGui ||
                                    instagramGuiUsuario
                            )} ↗
                        </a>
                    </div>
                </div>
            </section>
        `;
    };

    /*
    =====================================================
    INSERÇÃO DAS SEÇÕES
    =====================================================
    */

    const dynamicSections =
        document.querySelector(
            "#secoes-dinamicas"
        );

    if (dynamicSections) {
        dynamicSections.innerHTML = [
            projeto(),
            sobre(),
            gatorade(),
            plano(),
            parceria(),
            encerramento()
        ].join("");
    }

    /*
    =====================================================
    ATUALIZAÇÃO DE LINKS ANTIGOS DA MARCA
    =====================================================
    */

    const nomeMarca =
        data.configuracao?.marca ||
        "Elite Core Brasil";

    document
        .querySelectorAll(
            'a[href="#asics"], a[href="#gatorade"]'
        )
        .forEach((link) => {
            link.setAttribute(
                "href",
                "#gatorade"
            );

            const textoAtual =
                link.textContent
                    .trim()
                    .toUpperCase();

            if (
                textoAtual === "ASICS" ||
                textoAtual === "GATORADE"
            ) {
                link.textContent =
                    nomeMarca;
            }
        });

    /*
    =====================================================
    RODAPÉ
    =====================================================
    */

    const footerCopy =
        document.querySelector(
            "#footer-copy"
        );

    if (footerCopy) {
        footerCopy.textContent =
            data.encerramento?.rodape || "";
    }

    /*
    =====================================================
    TRATAMENTO DE IMAGENS
    =====================================================
    */

    document
        .querySelectorAll("img")
        .forEach((image) => {
            image.addEventListener(
                "error",
                () => {
                    image.classList.add(
                        "image-missing"
                    );
                }
            );
        });

    /*
    =====================================================
    MENU MOBILE
    =====================================================
    */

    const menuButton =
        document.querySelector(
            ".menu-button"
        );

    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );

    if (menuButton && mobileMenu) {
        const closeMenu = () => {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "menu-open"
            );
        };

        menuButton.addEventListener(
            "click",
            () => {
                const isOpen =
                    menuButton.getAttribute(
                        "aria-expanded"
                    ) === "true";

                if (isOpen) {
                    closeMenu();
                    return;
                }

                menuButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Fechar menu"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add(
                    "menu-open"
                );
            }
        );

        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {
                link.addEventListener(
                    "click",
                    closeMenu
                );
            });

        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Escape"
                ) {
                    closeMenu();
                }
            }
        );
    }
})();
