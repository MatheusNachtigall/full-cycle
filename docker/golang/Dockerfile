FROM golang AS builder
WORKDIR /usr/src/app
COPY main.go ./
RUN go build -ldflags "-w" -o ./executable

#####################################################################

FROM scratch 
WORKDIR /app 
COPY --from=builder /usr/src/app/executable .
CMD [ "/app/executable" ]

