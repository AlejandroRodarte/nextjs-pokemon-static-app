FROM node:16-alpine as base

LABEL org.opencontainers.image.authors alejandrorodarte1@gmail.com
LABEL org.opencontainers.image.title "Base image for a Pokemon Static website built with Next.js"
LABEL org.opencontainers.image.url https://hub.docker.com/repository/docker/rodarte/nextjs-fr-pokemon-static-app-prod
LABEL org.opencontainers.image.source https://github.com/AlejandroRodarte/nextjs-pokemon-static-app/tree/master/pokemon-static-app
LABEL org.opencontainers.image.licenses MIT

LABEL com.rodarte.nextjs.fr.pokemon-static-app.nodeversion $NODE_VERSION
LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage base

ARG CREATED_DATE=not-set
ARG SOURCE_COMMIT=not-set

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

RUN apk add --no-cache tini curl

ENV PATH /node/node_modules/.bin:$PATH

WORKDIR /node

RUN chown -R node:node .

EXPOSE 3000

ENTRYPOINT [ "/sbin/tini", "--" ]


FROM base as dependencies

LABEL org.opencontainers.image.title "Dependencies image for a Pokemon Static website built with Next.js"

LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage dependencies

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --production=false \
    && yarn cache clean


FROM dependencies as dev

LABEL org.opencontainers.image.created $CREATED_DATE
LABEL org.opencontainers.image.revision $SOURCE_COMMIT
LABEL org.opencontainers.image.title "Development image for a Pokemon Static website built with Next.js"

LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage dev

ENV NODE_ENV development

WORKDIR /node/app

HEALTHCHECK --interval=10s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:${PORT}/api/hello || exit 1

USER node

CMD [ "next", "dev" ]


FROM dependencies as source

LABEL org.opencontainers.image.title "Source image for a Pokemon Static website built with Next.js"

LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage source

COPY --chown=node:node . .


FROM source as build

LABEL org.opencontainers.image.title "Build image for a Pokemon Static website built with Next.js"

LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage build

RUN NEXT_PUBLIC_STAGE=APP_NEXT_PUBLIC_STAGE_VAR \
    next build


FROM base as prod

LABEL org.opencontainers.image.created $CREATED_DATE
LABEL org.opencontainers.image.revision $SOURCE_COMMIT
LABEL org.opencontainers.image.title "Production image for a Pokemon Static website built with Next.js"

LABEL com.rodarte.nextjs.fr.pokemon-static-app.stage prod

COPY --chown=node:node --from=build /node/next.config.js ./next.config.js
COPY --chown=node:node --from=build /node/.next/standalone ./
COPY --chown=node:node --from=build /node/.next/static ./.next/static
COPY --chown=node:node --from=build /node/public ./public
COPY --chown=node:node --from=build /node/docker/entrypoint.sh /entrypoint.sh
COPY --chown=node:node --from=build /node/docker/process-file.sh /process-file.sh

HEALTHCHECK --interval=10s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:${PORT}/api/hello || exit 1

RUN chmod +x /entrypoint.sh \
    && chmod +x /process-file.sh

USER node

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "node", "/node/server.js" ]
