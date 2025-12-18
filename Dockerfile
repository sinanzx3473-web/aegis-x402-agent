FROM oven/bun:1

WORKDIR /app

# 1. Copy Files
COPY packages/project-starter ./packages/project-starter
COPY characters ./characters
COPY revenue-server ./revenue-server
COPY .env .env

# 2. Setup The Gate (Revenue Server)
WORKDIR /app/revenue-server
RUN bun install

# 3. Setup The Brain (With the "Teleport" Fix)
WORKDIR /app/packages/project-starter

# FORCE FIX: Switch from "Local Workspace" to "Public Internet" dependencies
RUN sed -i 's/"workspace:\*"/"latest"/g' package.json

# Now install will work
RUN bun install

# 4. Launch
EXPOSE 3000 3001
CMD ["/bin/bash", "-c", "cd /app/revenue-server && bun server.ts & cd /app/packages/project-starter && bun start -- --character=../../characters/aegis.character.json"]
