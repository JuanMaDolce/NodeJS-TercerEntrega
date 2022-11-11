import app from './config.js'
import logger from './src/logs/logs.js'
import cluster from 'cluster'
import { cpus } from 'os'

const numCPUs = cpus().length

const PORT = process.env.PORT

const MODO = process.argv[2] || 'FORK' 

if(MODO === 'CLUSTER' && cluster.isPrimary){
    logger.info(`Primary ${process.pid} is running`)
    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) =>{
        logger.info(`${worker.processs.pid} died`)
    })
} else {
     app.listen(PORT, ()=>{
        logger.info(`Server is running on port ${PORT}`)
    }) 
    logger.info(`${process.pid} started`)
} 

