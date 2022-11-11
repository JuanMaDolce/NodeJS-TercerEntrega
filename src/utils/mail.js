import nodemailer from 'nodemailer'
import logger from '../logs/logs.js';

const TEST_MAIL = 'emily.auer83@ethereal.email'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'bSZAH9U1b9Rg7rwTxT'
    }
});

export const mailRegistro = async (usuario) =>{
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Nuevo Registro',
        html: `<h1 style="color: blue;">Nuevo Usuario</h1>
        <h2 style="color: green;">${usuario.username}</h2>
        <h2 style="color: green;">${usuario.name}</h2>`
        }
    try {
        const info = await transporter.sendMail(mailOptions)
        } catch (error) {
            logger.error(error)
        }
}

export const mailCompra = async (user,carrito) =>{
    const mailOptionsDos = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: `Nuevo pedido de ${user.name} - ${user.username} `,
        html: `<h1 style="color: blue;">Tu carrito de compra</h1>
        <h2 style="color: green;">${carrito.id}</h2>
        <h2 style="color: green;">${carrito.productos}</h2>`
        }
    try {
        const info = await transporter.sendMail(mailOptionsDos)
        } catch (error) {
            logger.error(error)
        }
}
