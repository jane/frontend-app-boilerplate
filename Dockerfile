FROM janedev/base-dev
RUN mkdir -p /app
WORKDIR /app
ADD . .
ENV NODE_ENV=production
ENV PORT=8081
EXPOSE 8081
CMD ["node", "."]
