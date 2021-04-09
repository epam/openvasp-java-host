FROM mhart/alpine-node:12

ENV HOME /root
ENV WORKDIR $HOME/openvasp-frontend/

RUN mkdir $WORKDIR && npm install -s -g @angular/cli

WORKDIR $WORKDIR

ADD . $WORKDIR

RUN npm install -s && ng build --prod

EXPOSE 4200
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
