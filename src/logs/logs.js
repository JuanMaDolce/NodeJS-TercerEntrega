import winston from 'winston'

const logger = winston.createLogger({
    level: 'warn',
    transports:[
        new winston.transports.Console({level:'verbose'}),
        new winston.transports.File({filename:'./src/logs/error.log', level: 'error'}),
        new winston.transports.File({filename:'./src/logs/warn.log', level: 'warn'})
    ]
})

export default logger