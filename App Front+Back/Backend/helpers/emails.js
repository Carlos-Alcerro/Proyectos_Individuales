import nodemailer from 'nodemailer'

export const emailRegistro= async (datos)=>{
    
    const {email,nombre,token} = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "492a9f49d4d944",
          pass: "42fc7b21ef45f5"
        }
      });
      //Informacion del Email

      const info = await transport.sendMail({
        info:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject:"UpTask - Comprueba tu Cuenta",
        text:"Comprueba tu cuenta en UpTask",
        html:`
        <p>Hola ${nombre}, Comprueba tu cuenta en UpTask<p/>
        <P>Tu cuenta ya esta casi lista, Compruebala en el siguiente enlace: </P>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
      }) 
}

export const emailOlvidePassword= async (datos)=>{
    
    const {email,nombre,token} = datos

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "492a9f49d4d944",
          pass: "42fc7b21ef45f5"
        }
      });
      //Informacion del Email

      const info = await transport.sendMail({
        info:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject:"UpTask - Reestablece tus Password",
        text:"Reestablece tus Password",
        html:`
        <p>Hola ${nombre}, Has solicitado Reestablecer tus Password <p/>
        <P>Sigue el siguiente enlace para generar un Nuevo Password: </P>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contrasena</a>

        <p>Si tu no solicitaste, puedes ignorar este mensaje</p>
        
        `
      }) 
}